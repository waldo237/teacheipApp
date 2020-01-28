import axios from "axios";
import { auth } from "firebase/app";
import session from "./session";
const state = {
  validation: {},
  validated: session.validateToken(),
  id: "",
  code: ""
};
const getters = {
  validation: state => state.validation,
  validated: state => state.validated,
  id: state => state.id,
  code: state => state.code
};
const actions = {
  async checkValidation({ commit }) {
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbyYKGbaXtynvrY4FwWp-QkMkNQc4YGGu7uWf9yddLULn6971Wg/exec?email=${
          auth().currentUser.email
        }&&id=${state.id}&&code=${state.code}`
      );
      commit("setValidation", response.data);
    } catch (error) {
      new Error("Could not connect because of internet is off");
    }
  },
  async requestToken() {
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbzZRPNSCt67iBKssKuprFkLlpjG53zasweXZ1g4WZBR4B4NCIA/exec?email=${
          auth().currentUser.email
        }&&id=${state.id}&&code=${state.code}`
      );
      const d = new Date();
      // set token for 30 days
      d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `sessionToken=${response.data.token};${expires};path=/`;
      document.cookie = `sessionRole=${response.data.role};${expires};path=/`;
    } catch (error) {
      // unlogged
    }
  },
  // validate token and set validated global
  async validateToken({ commit }) {
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbzozLeg_FPF61v-MyvmbdBgPkcUcREzQB4PFJSGX7mDkYVzOw9E/exec?email=${auth().currentUser.email}&&token=${actions.getToken("sessionToken")}&&role=${actions.getToken("sessionRole")}`
      );
      commit("setValidated", response.data);
    } catch (error) {
      // unlogged
    }
  },
  // get token from local cookies
  getToken(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
};
const mutations = {
  setValidation: (state, value) => (state.validation = value),
  setValidated: (state, value) => (state.validated = value),
  setId: (state, value) => (state.id = value),
  setCode: (state, value) => (state.code = value)
};

export default {
  state,
  getters,
  actions,
  mutations
};

import axios from "axios";
import { auth } from "firebase/app";
import session from "./session";
const state = {
  validation: {},
  
  validated: session.validateToken(),
  id: "",
  code: "",
  contactInfo:{},
  superId: false,
};
const getters = {
  validation: state => state.validation,
  validated: state => state.validated,
  id: state => state.id,
  code: state => state.code,
  contactInfo: state => state.contactInfo,
  superId: state => state.superId
};
const actions = {

  /**
      * The following code makes a call to the main server to login and receives a token.
      */
async newValidation({ commit }){
        let res = await axios.post("http://localhost:3000/auth/register",  {
          'name': auth().currentUser.displayName,
          'password': auth().currentUser.uid,
          'cu_id':  auth().currentUser.uid,
          'email': auth().currentUser.email,
      });
     
    return await localStorage.setItem('serverToken', res.data.token);
  },

async verifyContact(){
  const response =  await axios.get(`http://localhost:3000/contact/${auth().currentUser.uid}`, {headers: {
        Authorization: 'JWT ' + localStorage.getItem('serverToken')
      }});
      localStorage.setItem('sessionRole', response.data);
},
/**
 * 
 * @param {*} param0 
 */
async completeContactInfo(){
  console.log(state.contactInfo)
 const response =  await axios.post(`http://localhost:3000/contacts`,state.contactInfo,  {headers: {
        Authorization: 'JWT ' + localStorage.getItem('serverToken')
      }});
      localStorage.setItem('sessionRole', response.data);
}, 
// supervisor authentication starts

    async fetchSuperId({ commit }) {
      try {
        const response = await axios.get(
          `https://script.google.com/macros/s/AKfycbyNLUiUUjM3M69pAtwSen1p2Zey2iFEPkHGWH4XLOzEHZYu0Qk/exec?email=${auth().currentUser.email}&cedula=${state.id}`
        );
        commit("setSuperId", response.data);
      } catch (error) {
        new Error("Could not connect because of internet is off");
      }
    },

    async authenticateSuper({ commit }) {
      try {
        const response = await axios.get(
          `https://script.google.com/macros/s/AKfycbyNLUiUUjM3M69pAtwSen1p2Zey2iFEPkHGWH4XLOzEHZYu0Qk/exec?email=${auth().currentUser.email}&password=${state.code}`
        );
        commit("setSuperId", response.data);
        localStorage.setItem('sessionToken', response.data.token);
        localStorage.setItem('sessionRole',response.data.role);
      } catch (error) {
        new Error("Could not connect because of internet is off");
      }
    },

// supervisor authentication ends

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

      localStorage.setItem('sessionToken', response.data.token);
      localStorage.setItem('sessionRole',response.data.role);
    } catch (error) {
      console.log(error)
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
    return localStorage.getItem(cname);

  }
};
const mutations = {
  setValidation: (state, value) => (state.validation = value),
  setValidated: (state, value) => (state.validated = value),
  setId: (state, value) => (state.id = value),
  setCode: (state, value) => (state.code = value),
  setContactInfo: (state, value) => (state.contactInfo = value),
  setSuperId: (state, value) => (state.superId = value)
};

export default {
  state,
  getters,
  actions,
  mutations
};

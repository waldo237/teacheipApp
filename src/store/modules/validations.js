import axios from "axios";
import { auth } from "firebase/app";
import session from "./session";
const state = {
  validation: {},

  validated: session.validateToken(),
  id: "",
  code: "",
  contactInfo: {},
  superId: false,
  superCenters: [],
};
const getters = {
  validation: state => state.validation,
  validated: state => state.validated,
  id: state => state.id,
  code: state => state.code,
  contactInfo: state => state.contactInfo,
  superId: state => state.superId,
  superCenters: state => state.superCenters,
};
const actions = {
  // teachers authentication starts


  /**
  * @function registerUser() sends a post request an object to the server to loginwith
  * if successful, receives a token and saves it locally.
  */
  async registerUser() {
    let res = await axios.post("https://eip-server.herokuapp.com/auth/register", {
      'name': auth().currentUser.displayName,
      'password': auth().currentUser.uid,
      'cu_id': auth().currentUser.uid,
      'email': auth().currentUser.email,
    });

    return await localStorage.setItem('serverToken', res.data.token);
  },


  /**
  * @function checkTeacherRegistered(void) sends a get request to the server with the "currentUser.uid"
  * it expects a response 'granted' or 'denied'.
  */
  async checkTeacherRegistered() {
    const response = await axios.get(`https://eip-server.herokuapp.com/contact/${auth().currentUser.uid}`, {
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('serverToken')
      }
    });
    localStorage.setItem('permission', response.data);
  },


  /**
  * @function fillTeacherInfo sends a post request to the server with the 'state.contactInfo'
  * from $store. If registration is successful, it receives a sessionRole that it saves in localStorage
  * to  be used to make role decisions.
  */
  async fillTeacherInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(`http://localhost:30001/contacts`, state.contactInfo, {
          headers: {
            Authorization: 'JWT ' + localStorage.getItem('serverToken')
          }
        });
        localStorage.setItem('sessionRole', response.data);
        resolve(response.data)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
  // teachers authentication ends

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
      localStorage.setItem('sessionRole', response.data.role);
      localStorage.setItem('superUid', response.data.uid);
    } catch (error) {
      console.log(error)
    }
  },
  async fetchCenters({ commit }) {
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbw9Iy9czwYRQuz2HZbTDKnYqzRo94iPwY3Cif6HmwA4lNkILpiS/exec?supervisoruid=${localStorage.getItem('superUid')}`
      );
      commit("setSuperCenters", response.data);
    } catch (error) {
      new Error("Could not connect because of internet is off");
    }
  },
  // supervisor authentication ends

  /**
   * @function saveEditedProfile() calls 'registerUser()' because it needs a token
   * if this user was has another authentication system different from the main server
   * it send a post request with serverToken to save or edit the new changes.
   */
  saveEditedProfile() {
    return new Promise(async (resolve, reject) => {
      try {
        await actions.registerUser();        // TODO condition the next line if the server token does not exist
        const response = await axios.post(`https://eip-server.herokuapp.com/contacts`, state.contactInfo, {
          headers: {
            Authorization: 'JWT ' + localStorage.getItem('serverToken')
          }
        });
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    });
  },

  /**
   * @function getProfileInfo(void) sends a get request to the server with the "currentUser.uid"
   * it expects an object with the info for the profile.
   */
  async getProfileInfo() {
    try {
      const response = await axios.get(`https://eip-server.herokuapp.com/profile/${auth().currentUser.uid}`, {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('serverToken')
        }
      });
      state.contactInfo = await response.data[0];

    } catch (error) {
      // console.log(error)
    }
  },

  /**
   * @function getMembers(void) returns a list of members
   */
  async getMembers() {
    try {
      await actions.getProfileInfo();
      const response = await axios.get(`https://eip-server.herokuapp.com/contacts/${auth().currentUser.uid}`, {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('serverToken')
        }
      });
      return await response.data;
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * @function getMember(_id) returns a member
   * @param _id the id of the member
   */
  async getMember({commit},id) {
    try {
      // https://eip-server.herokuapp.com
      const response = await axios.get(`https://eip-server.herokuapp.com/member/${id}`, {
        headers: {
          Authorization: 'JWT ' + localStorage.getItem('serverToken')
        }
      });
      return await response.data;
    } catch (error) {
      console.log(error)
    }
  },



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
      localStorage.setItem('sessionRole', response.data.role);
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
  },
/**
 * @function getCentersList returns an array with the list of all the centers
 * @returns Array: [{recintos:string}] 
 * 
 */
 async getCentersList(){
    try {
      let res = {};
      res = await axios.get(
        "https://script.google.com/macros/s/AKfycbynGQjs4wN2_i_2TTFevcGNUoNElCHLI1PX7gY6UeWGyxbZOrL_/exec"
      );
      return res.data.centers;
    } catch (error) {}
  }

};
const mutations = {
  setValidation: (state, value) => (state.validation = value),
  setValidated: (state, value) => (state.validated = value),
  setId: (state, value) => (state.id = value),
  setCode: (state, value) => (state.code = value),
  setContactInfo: (state, value) => (state.contactInfo = value),
  setSuperId: (state, value) => (state.superId = value),
  setSuperCenters: (state, value) => (state.superCenters = value)
};

export default {
  state,
  getters,
  actions,
  mutations
};


try {
  
} catch (error) {
  
}
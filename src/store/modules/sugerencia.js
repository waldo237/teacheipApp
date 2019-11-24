import axios from "axios";
import { async } from "q";
const state = {
  sugerencia: {},
};
const getters = {
  sugerencia: state => state.sugerencia,
};
const actions = {
  async postSugerencia(){
    return   new Promise(async(resolve, reject)=>{
      try {
          const response = await
         axios.get(  `https://script.google.com/macros/s/AKfycbybPjd1ZNNRvJmKU0XgOJ929s6j6QBqZTtKw-FT0PDyc8kEKAA7/exec?email=${
          state.sugerencia.email
          }&&user=${state.sugerencia.user}&&photo=${state.sugerencia.photo} &&date=${state.sugerencia.date} &&message=${state.sugerencia.message}`);
          resolve(response.data) 
      } catch (error) {
        reject(console.log(`Could not connect because of internet is off ${error}`));      
      }
    })
  },
  async postSolicitud(){
    return   new Promise(async(resolve, reject)=>{
      try {
          resolve("done") 
      } catch (error) {
        reject(console.log(`Could not connect because of internet is off ${error}`));      
      }
    })
  }
};
const mutations = {
  setSugerencia: (state, value) => (state.sugerencia = value),
};

export default {
  state,
  getters,
  actions,
  mutations
};

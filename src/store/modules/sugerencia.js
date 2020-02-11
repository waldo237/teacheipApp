import axios from "axios";
import { async } from "q";
const state = {
  sugerencia: {},
  notificacionMessage: {},
};
const getters = {
  sugerencia: state => state.sugerencia,
  notificacionMessage: state => state.notificacionMessage,
};
const actions = {

  // ***************notification actions start *******************
  async postNotificacion(){
    return   new Promise(async(resolve, reject)=>{
      try {
        const response = await
        axios.get(  `https://script.google.com/macros/s/AKfycbyTFdjfRbsMfIDOVMKYNHVbOKYgU3WblMu51DjNIF_vKrvo2iE/exec?
        email=${state.notificacionMessage.email}
        &name=${state.notificacionMessage.name}
         &email=${state.notificacionMessage.email} 
         &avatar=${state.notificacionMessage.avatar} 
         &title=${state.notificacionMessage.title} 
         &body=${state.notificacionMessage.body} 
         &publishedDate=${state.notificacionMessage.publishedDate} 
         &link=${state.notificacionMessage.link}`);
         resolve(response.data) 
         
        } catch (error) {
          reject(console.log(`Could not connect because of internet is off ${error}`));      
        }
    })
  },
  // ***************notification actions end *******************
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
  setNotificacionMessage: (state, value) => (state.notificacionMessage = value),
};

export default {
  state,
  getters,
  actions,
  mutations
};

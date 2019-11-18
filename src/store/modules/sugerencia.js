import axios from "axios";
const state = {
  sugerencia: {},
};
const getters = {
  sugerencia: state => state.sugerencia,
};
const actions = {
  async postSugerencia(){
      try {
          const response = await
         axios.get(  `https://script.google.com/macros/s/AKfycbybPjd1ZNNRvJmKU0XgOJ929s6j6QBqZTtKw-FT0PDyc8kEKAA7/exec?email=${
          state.sugerencia.email
          }&&user=${state.sugerencia.user}&&photo=${state.sugerencia.photo} &&date=${state.sugerencia.date} &&message=${state.sugerencia.message}`);
          return response.data
      } catch (error) {
          console.log('Could not connect because of internet is off');        
      }
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

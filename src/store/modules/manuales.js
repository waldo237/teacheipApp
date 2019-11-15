import axios from 'axios'
const state = {
    manuales: []
};
const getters = {
    getManuales: (state) => state.manuales,
};
const actions = {
    async fetchManuales({ commit }) {
        try {
            const response = await
               axios.get("https://script.google.com/macros/s/AKfycbzCwMZuCx2LAt_i_u0PQjuh9FdD5zC5G6uEmc19FoWjlNuHKkVv/exec"
               );

            commit('setManuales', response.data);
            
        } catch (error) {
            console.log('Could not connect because of internet is off');
        }
    }
};
const mutations = {
    setManuales: (state, value) => (state.manuales = value),
};

export default {
    state,
    getters,
    actions,
    mutations
}
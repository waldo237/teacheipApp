import axios from 'axios'
const state = {
    dossier: []
};
const getters = {
    getDossier: (state) => state.dossier,
};
const actions = {
    async fetchDossier({ commit }) {
        try {
            const response = await
               axios.get("https://script.google.com/macros/s/AKfycbxrfVBeyrelJh1Gah-b8vJsewwV61Mfdeq1KQOZ5uvfSdFRUgps/exec"
               );

            commit('setDossier', response.data);
            
        } catch (error) {
            console.log('Could not connect because of internet is off');
        }
    }
};
const mutations = {
    setDossier: (state, value) => (state.dossier = value),
};

export default {
    state,
    getters,
    actions,
    mutations
}
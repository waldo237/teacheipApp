import axios from "axios";
const state = {
    dossier: []
};
const getters = {
    getDossier: state => state.dossier
};
const actions = {
    async fetchDossier({ commit }) {
        try {
            const response = await axios.get(
                "https://script.google.com/macros/s/AKfycbxrfVBeyrelJh1Gah-b8vJsewwV61Mfdeq1KQOZ5uvfSdFRUgps/exec"
            );

            commit("setDossier", response.data);
        } catch (error) {
            console.log("Could not connect because of internet is off");
        }
    },
    /**
     * @function fetchAssessments fetch the data for assessment guides
     * @param {*} param0
     */
    async fetchAssessments({ commit }) {
        try {
            const response = await axios.get(
                "https://script.google.com/macros/s/AKfycbz5KVXj9kHfm0EQQ_jpJvND_Xus5p1C50bNtPZyLYU3M9LNv9I/exec"
            );

            return response.data;
        } catch (error) {
            console.log("Could not connect because of internet is off");
        }
    },
    /**
     * @function fetchCalendars fetch the data for assessment guides
     * @param {*} param0
     */
    async fetchCalendars({ commit }) {
        try {
            const response = await axios.get(
                "https://script.google.com/macros/s/AKfycby_qhGkyr3PcAWA9JD3CPlzxRjlB6sYqOaYkPgd1cGiQ5xkalOM/exec"
            );

            return response.data;
        } catch (error) {
            console.log("Could not connect because of internet is off");
        }
    }
};
const mutations = {
    setDossier: (state, value) => (state.dossier = value)
};

export default {
    state,
    getters,
    actions,
    mutations
};


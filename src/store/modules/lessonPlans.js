import axios from 'axios'
const state = {
    lessonPlans: []
};
const getters = {
    getLessonPlans: (state) => state.lessonPlans,
};
const actions = {
    async fetchLessonPlans({ commit }) {
        try {
            const response = await axios.get(process.env.LESSONPLANS);
            commit('setLessonPlans', response.data);
            
        } catch (error) {
            console.log('Could not connect because of internet is off');
        }
    }
};
const mutations = {
    setLessonPlans: (state, value) => (state.lessonPlans = value),
};

export default {
    state,
    getters,
    actions,
    mutations
}
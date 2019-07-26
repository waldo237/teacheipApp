const state = {
    lessonPlans: []
};
const getters = {
    getLessonPlans: (state) => state.lessonPlans,
};
const actions = {
    async fetchLessonPlans({ commit }) {
        const response = await
            axios.get("https://script.google.com/macros/s/AKfycbxCKtyJP8X3vpOXTDCaENAesVXa8gWwzw4BSAnk6iIGWz8FFMqi/exec"
            );
        commit('setLessonPlans', response.data);
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
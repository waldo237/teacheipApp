
const state = {
    currentUser: {},
};
const getters = {
    getCurrentUser: (state) => state.currentUser,    
};
const actions = {

};
const mutations = {
    setCurrentUser:  (state, value) => (state.currentUser = value),
};

export default {
    state,
    getters,
    actions,
    mutations
}
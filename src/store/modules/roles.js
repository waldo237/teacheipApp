import session from './session'
const state = {
    currentRole: session.fetchRole(),

};
const getters = {
    getCurrentRole: (state) =>state.currentRole,
   
   
};
const actions = {
   
};
const mutations = {
    setCurrentRole: (state, value) =>(state.currentRole = value),
   
};

export default{
    state,
    getters,
    actions,
    mutations
}
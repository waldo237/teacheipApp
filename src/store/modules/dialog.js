
const state = {
    isLoggedIn: false,
    SUDialog: false,
    SIDialog: false,
    editProfile: true,
    alert: false,
    alertType: {},
    alertMessage: '',
};
const getters = {
    
    checkIsLoggedIn: (state) => state.isLoggedIn,
    getSUDialog: (state) => state.SUDialog,
    getSIDialog: (state) => state.SIDialog,
    getAlertMessage: (state) =>state.alertMessage,
    getAlertType: (state) =>state.alertType,
    isAlert: (state) =>state.alert
};
const actions = {
    async runAlert({commit}, message){
       await commit('setAlertMessage', message);
        state.alert = !state.alert;
    },
  
    setAlertMessage ({commit}, message){
        commit('setAlertMessage', message);
    },
    setAlert ({commit}){
        state.alert = !state.alert;
    },
    toggleIsLoggedIn ({commit}){
        commit('setLoggedIn', !state.isLoggedIn);
    },
    toggleSU ({commit}){

        commit('setSUDialog', !state.SUDialog);
    },
    toggleSI ({commit}){

        commit('setSIDialog', !state.SIDialog);
    }
};
const mutations = {
    setLoggedIn: (state, value) =>(state.isLoggedIn = value),
    setSUDialog: (state, value) =>(state.SUDialog = value),
    setSIDialog: (state, value) =>(state.SIDialog = value),
    setAlertMessage: (state, value) =>(state.alertMessage = value),
    setAlertType: (state, value) =>(state.alertType = value),
    setAlert: (state, value) =>(state.alert = value),
    setEditProfile:  (state, value) =>(state.editProfile = value),
};

export default{
    state,
    getters,
    actions,
    mutations
}
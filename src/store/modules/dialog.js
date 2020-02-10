
const state = {
    isLoggedIn: false,
    SUDialog: false,
    SIDialog: false,
    editProfile: true,
    alert: false,
    alertType: {},
    alertMessage: '',
    interact: false,
    yes: false,
    landing: true,
    loadingFull: false,
    notifeeds:false,
    closeableForm: false,
};
const getters = {
    
    checkIsLoggedIn: (state) => state.isLoggedIn,
    getSUDialog: (state) => state.SUDialog,
    getSIDialog: (state) => state.SIDialog,
    getAlertMessage: (state) =>state.alertMessage,
    getAlertType: (state) =>state.alertType,
    getInteract: (state) =>state.interact,
    getLanding: (state) =>state.landing,
    isAlert: (state) =>state.alert,
    getYes:(state) => state.yes,
    loadingFull:(state) => state.loadingFull,
    notiFeeds:(state) => state.notifeeds,
    closeableForm:(state) => state.closeableForm,
};
const actions = {
    async runAlert({commit}, message){
       await commit('setAlertMessage', message);
        state.alert = !state.alert;
    },
  
    setAlertMessage ({commit}, message){
        commit('setAlertMessage', message);
    },
    toggleAlert ({commit}){
        state.alert = !state.alert;
    },
   
    toggleSU ({commit}){

        commit('setSUDialog', !state.SUDialog);
    },
    toggleSI ({commit}){

        commit('setSIDialog', !state.SIDialog);
    }
};
const mutations = {
    setLanding: (state, value) =>(state.landing = value),
    setLoggedIn: (state, value) =>(state.isLoggedIn = value),
    setSUDialog: (state, value) =>(state.SUDialog = value),
    setSIDialog: (state, value) =>(state.SIDialog = value),
    setAlertMessage: (state, value) =>(state.alertMessage = value),
    setAlertType: (state, value) =>(state.alertType = value),
    setAlert: (state, value) =>(state.alert = value),
    setEditProfile:  (state, value) =>(state.editProfile = value),
    setInteract:  (state, value) =>(state.interact = value),
    setYes:  (state, value) =>(state.interact = value),
    setLoadingFull:  (state, value) =>(state.loadingFull = value),
    setNotiFeeds:  (state, value) =>(state.notifeeds = value),
    setCloseableForm:  (state, value) =>(state.closeableForm = value),
};

export default{
    state,
    getters,
    actions,
    mutations
}
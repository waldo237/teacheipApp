
const state = {
    isLoggedIn: false,
    SUDialog: false,
    SIDialog: false,
    alert: false,
    alertType: {},
    alertMessage: '',
    employees: []
};
const getters = {
    
    checkIsLoggedIn: (state) => state.isLoggedIn,
    getSUDialog: (state) => state.SUDialog,
    getSIDialog: (state) => state.SIDialog,
    getEmployees: (state) =>state.employees,
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
    },
    async fetchEmployees({commit}){
        const response = await 
        axios.get('https://script.google.com/macros/s/AKfycbxFPRq-4fY_oUSdkIkzf-4grcdcHSbbiZUNpsjzDVKhFvyFn0c/exec');
            commit('setEmployees', response.data);  
    }
};
const mutations = {
    setLoggedIn: (state, value) =>(state.isLoggedIn = value),
    setSUDialog: (state, value) =>(state.SUDialog = value),
    setSIDialog: (state, value) =>(state.SIDialog = value),
    setEmployees: (state, value) =>(state.employees = value),
    setAlertMessage: (state, value) =>(state.alertMessage = value),
    setAlertType: (state, value) =>(state.alertType = value),
    setAlert: (state, value) =>(state.alert = value),
};

export default{
    state,
    getters,
    actions,
    mutations
}

const state = {
    
    SUDialog: false,
    SIDialog: false,
    employees: []
};
const getters = {
    getSUDialog: (state) => state.SUDialog,
    getSIDialog: (state) => state.SIDialog,
    getEmployees: (state) =>state.employees
};
const actions = {
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
    setSUDialog: (state, value) =>(state.SUDialog = value),
    setSIDialog: (state, value) =>(state.SIDialog = value),
    setEmployees: (state, value) =>(state.employees = value),

};

export default{
    state,
    getters,
    actions,
    mutations
}
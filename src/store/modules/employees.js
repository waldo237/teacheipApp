
const state = {
    employees: []
};
const getters = {
    getEmployees: (state) =>state.employees,
   
};
const actions = {
   
    async fetchEmployees({commit}){
        const response = await 
        axios.get('https://script.google.com/macros/s/AKfycbxFPRq-4fY_oUSdkIkzf-4grcdcHSbbiZUNpsjzDVKhFvyFn0c/exec');
            commit('setEmployees', response.data);  
    }
};
const mutations = {
    
    setEmployees: (state, value) =>(state.employees = value),
   
};

export default{
    state,
    getters,
    actions,
    mutations
}
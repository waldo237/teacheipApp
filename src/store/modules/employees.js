import axios from 'axios'
const state = {
    employees: []
};
const getters = {
    getEmployees: (state) =>state.employees,
   
};
const actions = {
   
    async fetchEmployees({commit}){
        try {
            // const response = await
            // axios.get(process.env.EMPLOYEES);
            const response = await
           axios.get('https://script.google.com/macros/s/AKfycbxFPRq-4fY_oUSdkIkzf-4grcdcHSbbiZUNpsjzDVKhFvyFn0c/exec');
                commit('setEmployees', response.data);  
            
        } catch (error) {
            console.log('Could not connect because of internet is off');        
        }
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
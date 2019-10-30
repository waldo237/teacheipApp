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
            const response = await
           axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=OXXh1ShRrGyE76JiyIgLbqlI5m3kfivsnDPj-ry92rhGT24kBVop7XLDuzKd7aW67P8lodFZRXRLQ9fyyjGA--tFpKfh3tyCm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMJBdRuTXt_eF8Z8CSfII6Eo1GcnLun2hLZt9kgw9fp-pyvfSULG2EUK87qmHke5DEqhI51p3q1_&lib=M3hYLD8Lx0EkB7dVn36u1jEQygANJgze1');
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
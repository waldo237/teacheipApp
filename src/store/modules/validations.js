import axios from 'axios'
import { auth } from 'firebase/app';
const state = {
    validation: {},
    id:"",
    code: "",
};
const getters = {
    validation: (state) =>state.validation,
    id: (state) =>state.id,
    code: (state) =>state.code,
   
};
const actions = {
   
    async checkValidation({commit}){
        try {
            // const response = await
            // axios.get(process.env.EMPLOYEES);
            const response = await
           axios.get(`https://script.google.com/macros/s/AKfycbyYKGbaXtynvrY4FwWp-QkMkNQc4YGGu7uWf9yddLULn6971Wg/exec?email=${auth().currentUser.email}&&id=${state.id}&&code=${state.code}`);
                commit('setValidation', response.data);  
        } catch (error) {
            new Error('Could not connect because of internet is off');        
        }
    }
};
const mutations = {
    setValidation: (state, value) =>(state.validation = value),
    setId: (state, value) =>(state.id = value),
    setCode: (state, value) =>(state.code = value),
};

export default{
    state,
    getters,
    actions,
    mutations
}
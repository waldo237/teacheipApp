import axios from 'axios'
const state = {
    Encargados: []
};
const getters = {
    getEncargados: (state) =>state.Encargados,
   
};
const actions = {
   
    async fetchEncargados({commit}){
        try {
            const response = await
           axios.get('https://script.google.com/macros/s/AKfycbzMAon90E4PCk7MHWU9xtPYIfZHFqqVaUS7UNUk9b-gwHgOUMS8/exec');
                commit('setEncargados', response.data);  
            
        } catch (error) {
            console.log('Could not connect because of internet is off');        
        }
    }
};
const mutations = {
    
    setEncargados: (state, value) =>(state.Encargados = value),
   
};

export default{
    state,
    getters,
    actions,
    mutations
}
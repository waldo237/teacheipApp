
import axios from 'axios'
const state = {
    students: [
          
    ],
};
const getters = {
    students: (state) => state.students,
};
const actions = {
    async fetchStudents({ commit }) {
        try {
            const response = await
               axios.get("https://script.google.com/macros/s/AKfycbyJTSiQiyXW2LSoqgi3iBekJEw_hi8MdKxHVaEjEx8vHxqVOeo/exec"
               );

            commit('setStudents', response.data);
            
        } catch (error) {
            console.log('Could not connect because of internet is off');
        }
    }
};
const mutations = {
    setStudents: (state, value) => (state.students = value),
};

export default {
    state,
    getters,
    actions,
    mutations
}

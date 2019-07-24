import db from '../../components/firebaseInit';

const state = {
    users: [],
    params:{}
};
const getters = {
    getUsers: (state) => state.users,
    getParams: (state) => state.params
};
const actions = {
    async fetchUsers({ commit }) {
        console.log(state.params)

        db.collection('Employees')
            .where('id', '==', state.params).get().then((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    const response = await doc.data();
                    commit('setUsers', response);
                })
            })
    },
};
const mutations = {
    setUsers: (state, value) => (state.users.push(value)),
    setParams: (state, value) => (state.params =value),

};

export default {
    state,
    getters,
    actions,
    mutations
}
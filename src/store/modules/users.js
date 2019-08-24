import db from '../../components/firebaseInit';


const state = {
    users: [],
    currentUser: {},
    userDB: {},
    params: {},
};
const getters = {
    getUsers: (state) => state.users,
    getParams: (state) => state.params,
    getCurrentUser: (state) => state.currentUser,
    getUserDB: (state) => state.userDB,
    
};
const actions = {
    async fetchUsers({ commit }) {
        db.collection('Employees')
            .where('id', '==', state.params).get().then((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    const response = await doc.data();
                    commit('setUsers', response);
                })
            })
    },
    async fetchAllUsers({ commit }) {
        db.collection('Employees').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.id,
                    'name': doc.data().name,
                    'email': doc.data().email,
                    'position': doc.data().position,
                    'level': doc.data().level,
                
                }
                commit('setUsers', data);
            })
        })
    },
    /**
     * universal function that logs out the user from the auth system
     * 
     * */
   

};
const mutations = {
setUsers: (state, value) =>{state.users.push(value); },
setUserDB: async (state, value) =>{state.userDB = await value;  await db.collection('Employees').doc().set(value)},
    setParams: (state, value) => (state.params = value),
    setCurrentUser:  (state, value) => (state.currentUser = value),
};

export default {
    state,
    getters,
    actions,
    mutations
}
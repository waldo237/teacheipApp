import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const state = {
    auth: firebase.auth,
    firebase: firebase,
    storage: firebase.storage,
    GoogleAuthProvider: new firebase.auth.GoogleAuthProvider(),
    FacebookAuthProvider: new firebase.auth.FacebookAuthProvider(),
    providerMicrosoft: new firebase.auth.OAuthProvider("microsoft.com"),
    
};
const getters = {
    auth: (state) => state.auth,
    firebase: (state) => state.firebase,
    storage: (state) => state.storage,
    GoogleAuthProvider: (state) => state.GoogleAuthProvider,
    FacebookAuthProvider: (state) => state.FacebookAuthProvider,
    providerMicrosoft: (state) => state.providerMicrosoft,

};
const actions = {
 
  
};
const mutations = {
    auth: (state, value) => (state.auth = value),
    firebase: (state, value) => (state.firebase = value),
    storage: (state, value) => (state.storage = value),
    GoogleAuthProvider: (state, value) => (state.GoogleAuthProvider = value),
    FacebookAuthProvider: (state, value) => (state.FacebookAuthProvider = value),
   
};

export default {
    state,
    getters,
    actions,
    mutations
}
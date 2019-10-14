import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const state = {
    auth: firebase.auth,
    firebase: firebase,
    firestore: firebase.firestore,
    GoogleAuthProvider: new firebase.auth.GoogleAuthProvider(),
    FacebookAuthProvider: new firebase.auth.FacebookAuthProvider(),
    providerMicrosoft: new firebase.auth.OAuthProvider("microsoft.com"),
};
const getters = {
    auth: (state) => state.auth,
    firebase: (state) => state.firebase,
    firestore: (state) => state.firestore,
    GoogleAuthProvider: (state) => state.GoogleAuthProvider,
    FacebookAuthProvider: (state) => state.FacebookAuthProvider,
    providerMicrosoft: (state) => state.providerMicrosoft,
};
const actions = {
};
const mutations = {
    auth: (state, value) => (state.auth = value),
    firebase: (state, value) => (state.firebase = value),
    firestore: (state, value) => (state.firestore = value),
    GoogleAuthProvider: (state, value) => (state.GoogleAuthProvider = value),
    FacebookAuthProvider: (state, value) => (state.FacebookAuthProvider = value),
};

export default {
    state,
    getters,
    actions,
    mutations
}
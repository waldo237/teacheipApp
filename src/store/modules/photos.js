import {storage}  from 'firebase/app';
const state = {
    tesPhotos: [],
    photoURl:{}
};
const getters = {
    tesPhotos: (state) => state.tesPhotos,
    photoURl: (state) => state.providerMicrosoft,
};
const actions = {
    async FetchPhoto(){
        return await storage().ref(state.photoURl.photo).getDownloadURL()
    }
};
const mutations = {
    setTesPhotos: (state, value) => (state.tesPhotos = value),
    setPhotoURl:(state,value)=>(state.photoURl = value),
};

export default {
    state,
    getters,
    actions,
    mutations
}
import axios from 'axios'
// import * as firebase from 'firebase/app';
// const storage = firebase.storage();
// var starsRef = storage.ref('testimony1.jpg');

// // Get the download URL
// starsRef.getDownloadURL().then(function(url) {
//   console.log(url);
// }).catch(function(error){});

const state = {
    photos: {},
}
const getters = {
    response: (state) =>state.photos,
};
const actions = {
   
    async fetchPhotos({commit}){
        try {

            const response = await
           axios.get('https://script.google.com/macros/s/AKfycbwEXo9SpHW39uvEp1ixLxEfXibNzWnGdn5_cgvSWbdXtd49f4s/exec');
              await  commit('setPhotos', response.data);  
            return response.data
        } catch (error) {
            console.log('Could not connect because of internet is off');        
        }
    }
};
const mutations = {
    
    setPhotos: (state, value) =>(state.photos = value),
   
};

export default{
    state,
    getters,
    actions,
    mutations
}
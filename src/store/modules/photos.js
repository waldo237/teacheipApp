// import { storage } from "firebase/app";

const state = {
  photoURl: {},
  arrayObjsWPhotos: []
};
const getters = {
  photoURl: state => state.photoURl, 
  arrayObjsWPhotos:  state => state.arrayObjsWPhotos
};
const actions = {

  async fetchPhoto() {
    return await storage()
      .ref(state.photoURl.photo)
      .getDownloadURL();
  },

  /**
   * @function initializeFetch(objsArray) Fetches an array of photos to plug into a component.
   * it uses the data state.arrayObjsWPhotos and actions.fetchPhoto  as dependencies.
   * @return a promise with a new array of objects with property {photo: ref, url: photourl}
   */
  async initializeFetch() {
    const newArrayObjs = [

    ];

    // state.arrayObjsWPhotos.forEach(async item => {
    //   let tempObject = {};
    //   tempObject = item;
    //   state.photoURl = tempObject;
    //   tempObject.url = await actions.fetchPhoto(item.photo);
    //   newArrayObjs.push(tempObject);
    // });
    return newArrayObjs;
  }

};
const mutations = {
  setPhotoURl: (state, value) => (state.photoURl = value),
  setArrayObjsWPhotos: (state, value) => (state.arrayObjsWPhotos = value)
};

export default {
  state,
  getters,
  actions,
  mutations
};

import axios from "axios";

const state = {
    feeds: [],
    CUEmail: {},
    haveNotRead: {},
};

const getters = {
    feeds: state => state.feeds,
    haveNotRead: state => state.haveNotRead,
};

const actions = {
    async fetchFeeds({ commit,state }) {
        const getFeedsURL = `https://script.google.com/macros/s/AKfycbyTFdjfRbsMfIDOVMKYNHVbOKYgU3WblMu51DjNIF_vKrvo2iE/exec?email=${state.CUEmail}`;
        try {
            const response = await axios.get(getFeedsURL);
            commit("setFeeds", response.data);
            let res = {}
            res.read = response.data.sort((a, b) =>new Date(b.date) - new Date(a.date));
            res.num = await response.data.filter((item)=>{if (!item.haveNotRead) return item;});
            commit('setHaveNotRead', res);
    } catch (error) {
      console.log("Could not connect because of internet is off");
    }
},
async markAsRead() {
    const markFeedURL =`https://script.google.com/macros/s/AKfycby-Sd1HGKF0YVeWqGm6Dd8D9YnhyV2Uf1KJzjgwu9_RZ0Z1YQE/exec?email=${state.CUEmail}`;
    try {
      await axios.get(markFeedURL);
    } catch (error) {
      console.log("Could not connect because of internet is off");
    }
  }

};
const mutations = {
  setFeeds: (state, value) => (state.feeds = value),
  setCUEmail: (state, value) => (state.CUEmail = value),
  setHaveNotRead: (state, value) => (state.haveNotRead = value),
};

export default {
  state,
  getters,
  actions,
  mutations
};

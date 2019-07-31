const state= {
    navigation:{
    // public routes that guest are able to access
    publicNav: [
        {
          icon: "home",
          title: "HOME",
          link: "/",
          class: "home"
        },
        {
          icon: "people_outline",
          title: "ABOUT",
          link: "/about",
          class: "about"
        },
      ],
      // private access routes
      privateNav: [
        {
          icon: "folder",
          title: "LESSON PLANS",
          link: "/lesson plans",
          class: "lesson-plan"
        },
        {
          icon: "person",
          title: "EMPLOYEES",
          link: "/register",
          class: "employees"
        },

        {
          icon: "dashboard",
          title: "DASHBOARD",
          link: `/dashboard/`,
          class: "sign-in"
        }
      ],
    }
};
const getters = {
getNavigation: (state) => state.navigation
};
const actions ={

};
const mutations ={
setNavigation:(state, value) =>(state.navigation = value)

};

export default{
    state,
    getters,
    actions,
    mutations
};

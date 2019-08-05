const state = {
  navigation: {
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
      }
    ],
    // administrative access routes
    administrative: [
      {
        icon: "alarm",
        title: "UPCOMING EVENTS",
        link: `/upcoming events/`,
        class: "sign-in"
      },
      {
        icon: "healing",
        title: "CENTERS STATUS",
        link: `/centers status/`,
        class: "sign-in",
        // sub-folders inside center status
        subfolders: [
          {
            title: "PAYROLL AND OCURRENCIES",
            link: `/payroll/`
          },
          
          {
            title: "LOGISTICS REPORT",
            link: `/logistics report/`
          },
          {
            title: "ADMISIONS REPORT",
            link: `/admisions report/`
          },

        ]
      },
      {
        icon: "person",
        title: "EMPLOYEES",
        link: "/register",
        class: "employees",
      },

      {
        icon: "collections_bookmark",
        title: "DOSSIER",
        link: `/dossier/`,
        class: "sign-in"
      },
      {
        icon: "assignment",
        title: "INVENTORY",
        link: `/inventory/`,
        class: "sign-in"
      },

    ],
    // academic access routes
    academic: [
      {
        icon: "folder",
        title: "LESSON PLANS",
        link: "/lesson plans",
        class: "sign-in",

      },

      // mockups start
      {
        icon: "feedback",
        title: "FRESH IDEAS",
        link: `/fresh ideas/`,
        class: "sign-in",

      },
      {
        icon: "security",
        title: "STANDARDS",
        link: `/standards/`,
        class: "sign-in",

      },
      {
        icon: "calendar_today",
        title: "CALENDARS",
        link: `/calendars/`,
        class: "sign-in",

      },
      {
        icon: "work",
        title: "PROJECTS",
        link: `/projects/`,
        class: "sign-in",

      },
      {
        icon: "grade",
        title: "GRADES AND ATTENDANCE",
        link: `/grades and attendance/`,
        class: "sign-in",

      },
      {
        icon: "fitness_center",
        title: "TRAINING MATERIALS",
        link: `/grades and attendance/`,
        class: "sign-in",
      },
      {
        icon: "show_chart",
        title: "ASSESSMENTS",
        link: `/assessments/`,
        class: "sign-in",
      }
    ]
  }
};
const getters = {
  getNavigation: state => state.navigation
};
const actions = {};
const mutations = {
  setNavigation: (state, value) => (state.navigation = value)
};

export default {
  state,
  getters,
  actions,
  mutations
};

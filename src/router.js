import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { auth } from "firebase/app";
import session from "./store/modules/session";
import { async } from "q";
Vue.use(Router);

let router = new Router({
  mode: "history",
  base: "",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/lesson plans",
      name: "lesson plans",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/services/LessonPlanIterator.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    },
    {
      path: "/dossier",
      name: "dossier",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/services/dossier.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    },
    {
      path: "/manuales",
      name: "manuales",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/services/manuales.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    },
    {
      path: "/employees",
      name: "employees",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/services/EmployeeChart.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    },
    {
      path: "/encargados",
      name: "encargados",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/services/encargados.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    },
    {
      path: "/formative",
      name: "formative",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/services/formative.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    },
    {
      path: "/solicitarCopias",
      name: "solicitarCopias",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/services/solicitarCopias.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    },
    {
      path: "/solicitarPermiso",
      name: "solicitarPermiso",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/services/solicitarPermiso.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    },
    { 
      path: "/calendario",
      name: "calendario",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/services/calendario.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    },
    {
      path: "/landing/",
      name: "landing",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/session/Landing.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/loggedOut",
      name: "/loggedOut/",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/session/205.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/signin",
      name: "signin",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/session/LogInView.vue"),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/session/RegisterView.vue"
        ),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/updateProfile",
      name: "updateProfile",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/session/ProfileEditorView.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    },
    {
      path: "/supervisorDashboard/",
      name: "supervisorDashboard",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/dashboards/SupervisorDashboard.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true,
        isSupervisor: true,
      }
    },
    {
      path: "/coordinatorDashboard",
      name: "coordinatorDashboard",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "./views/dashboards/CoordinatorDashboard.vue"
        ),
      meta: {
        requiresAuth: true,
        resquiresValidation: true,
        isCoordinator: true,
      }
    },
    {
      path: "/useterms",
      name: "useterms",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/components/Useterms.vue")
    },
    {
      path: "/403",
      name: "403",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/session/403.vue")
    },
    {
      path: "*",
      name: "404",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/session/404.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth().currentUser) {
      next({
        path: "/403",
        params: { nextUrl: to.fullPath }
      });
    } else {
      // validate if session is valid starts
          let user = session.getToken("sessionRole");
          if (to.matched.some(record => record.meta.resquiresValidation)) {
            if (user) {
              next();
            } else {
              next({ name: "landing" });
            }
          } else {
            next();
          }
      // validate if session is valid ends

      // validate if is a Supervisor starts
        if (to.matched.some(record => record.meta.isSupervisor)) {
          if (atob(user) == 'supervisor') {
            next();
          } else {
            next({ name: "403" });
          }
        } else {
          next();
        }
      // validate if is a Supervisor ends

      // validate if is a Coordinator starts
        if (to.matched.some(record => record.meta.isCoordinator)) {
          if (atob(user) == 'coordinator') {
            next();
          } else {
            next({ name: "403" });
          }
        } else {
          next();
        }
      // validate if is a Coordinator ends

    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (session.getToken("sessionRole") == "") {
      next();
    } else {
      next({ name: "dashboard" });
    }
  } else {
    next();
  }
});

export default router;

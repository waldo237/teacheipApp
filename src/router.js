import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { auth } from 'firebase/app';
import validateToken from './store/modules/validateToken'
import { async } from 'q';
console.log(atob(validateToken.getToken('sessionRole')))
Vue.use(Router)


let router = new Router({
  mode: "history",
  base: '',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,

    },
    {
      path: '/about',
      name: 'about',
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),

    }, {
      path: '/lesson plans',
      name: 'lesson plans',
      component: () => import(/* webpackChunkName: "about" */ './views/services/LessonPlanIterator.vue'),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    }, {
      path: '/employees',
      name: 'employees',
      component: () => import(/* webpackChunkName: "about" */ './views/services/EmployeeChart.vue'),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }

    }
    , {
      path: '/dashboard/',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/dashboards/SupervisorDashboard.vue'),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    }
    , {
      path: '/landing/',
      name: 'landing',
      component: () => import(/* webpackChunkName: "about" */ './views/session/Landing.vue'),
      meta: {
        requiresAuth: true
      }
    }
    , {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "about" */ './views/session/LogInView.vue'),
      meta: {
        requiresGuest: true
      }
    }
    , {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "about" */ './views/session/RegisterView.vue'),
      meta: {
        requiresGuest: true
      }
    }
    , {
      path: '/updateProfile',
      name: 'updateProfile',
      component: () => import(/* webpackChunkName: "about" */ './views/session/ProfileEditorView.vue'),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    }
    , {
      path: '/coordinatorDashboard',
      name: 'coordinatorDashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/dashboards/CoordinatorDashboard.vue'),
      meta: {
        requiresAuth: true,
        resquiresValidation: true
      }
    }
    , {
      path: '/useterms',
      name: 'useterms',
      component: () => import(/* webpackChunkName: "about" */ '@/components/Useterms.vue'),

    }
    , {
      path: '/403',
      name: '403',
      component: () => import(/* webpackChunkName: "about" */ './views/session/403.vue'),
    }
    , {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "about" */ './views/session/404.vue'),
    }
  ]
})

//Nav Guards
// router.beforeEach(async(to, from, next) => {
//   // Check for requiresAuth guard
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // Check if NO logged user
//     if (!auth().currentUser) {

//       // Go to login
//       next({
//         path: '/',
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     }  else {
//       // Proceed to route
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.resquiresValidation)) {
//     // Check if NO logged user
//      if (!auth().currentUser || !user) {
//       // Proceed to route
//       next({
//         path: '/landing',
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       // Proceed to route
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.requiresGuest)) {
//     // Check if NO logged user
//     if (auth().currentUser) {
//       // Go to login
//       next({
//         path: '/404',
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     } else {
//       // Proceed to route
//       next();
//     }
//   } else {
//     // Proceed to route
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (!auth().currentUser) {
          next({
              path: '/403',
              params: { nextUrl: to.fullPath }
          })
      } else {
        let user = validateToken.getToken('sessionRole');
          if(to.matched.some(record => record.meta.resquiresValidation)) {
              if(user){
                  next()
              }
              else{
                  next({ name: 'landing'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
      if(validateToken.getToken('sessionRole') == ""){
          next()
      }
      else{
          next({ name: 'dashboard'})
      }
  }else {
      next() 
  }
})

export default router;
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import  {auth} from 'firebase';
Vue.use(Router)
let router = new Router({
  mode: "history",
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

    },{
      path: '/lesson plans',
      name: 'lesson plans',
      component: () => import(/* webpackChunkName: "about" */ './views/LessonPlans.vue'),
      meta:{
        requiresAuth: true
      }
    },{
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/EmployeeChart.vue'),
      meta:{
        requiresAuth: true
      }
      
    }
    ,{
      path: '/dashboard/',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue'),
      meta:{
        requiresAuth: true
      }
    }
    ,{
      path: '/landing/',
      name: 'landing',
      component: () => import(/* webpackChunkName: "about" */ './views/Landing.vue'),
      meta:{
        requiresAuth: true
      }
    }
    ,{
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "about" */ './views/LogInView.vue'),
      meta:{
        requiresGuest: true
      }
    }
,{
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "about" */ './views/RegisterView.vue'),
      meta:{
        requiresGuest: true
      }
    }
,{
      path: '/updateProfile',
      name: 'updateProfile',
      component: () => import(/* webpackChunkName: "about" */ './views/ProfileEditorView.vue'),
      meta:{
        requiresAuth: true
      }
    }
,{
      path: '/coordinatorDashboard',
      name: 'coordinatorDashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/dashboards/CoordinatorDashboard.vue'),
      meta:{
        requiresAuth: true
      }
    }
,{
      path: '/useterms',
      name: 'useterms',
      component: () => import(/* webpackChunkName: "about" */ './views/Useterms.vue'),
  
    }
,{
      path: '/pendingVerification',
      name: 'pendingVerification',
      component: () => import(/* webpackChunkName: "about" */ './views/PendingVerificationView.vue'),

    }
   
 
  ]
})

//Nav Guards
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!auth().currentUser) {
      
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.hash
        }
      });
    } else if(!auth().currentUser.emailVerified) {
      // Proceed to route
      next({
        path: '/pendingVerification',
        query: {
          redirect: to.hash
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } 
  
  else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (auth().currentUser) {
      // Go to login
      next({
        path: '/dashboard',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
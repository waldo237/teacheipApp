import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import {auth} from 'firebase/app';
import './store/modules/firebaseInit'; 
// import VueSocketIO from 'vue-socket.io'
// import socketio from 'socket.io-client'
// export const SocketInstance = socketio('http://localhost:3001');

// Vue.use(VueSocketIO, SocketInstance);

Vue.config.productionTip = false;

let app;
auth().onAuthStateChanged((user)=>{
  if(!app){
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
Vue.use(Vuetify, {
  iconfont: 'sm'
}) 


router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Dirección de Lenguas extranjeras | MESCyT';
  next();
});
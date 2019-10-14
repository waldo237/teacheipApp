import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import {auth} from 'firebase/app';
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



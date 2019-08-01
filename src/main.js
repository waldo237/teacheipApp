import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate';
import auth from 'firebase'; 
import './components/firebaseInit'; 
 
let app;
auth.auth().onAuthStateChanged((user)=>{
  if(!app){
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
Vue.use(VeeValidate);
Vue.use(Vuetify, {
  iconfont: 'sm'
}) 
Vue.config.productionTip = false
// Vue.use(BootstrapVue) 




import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate';
 
Vue.use(VeeValidate);
Vue.use(Vuetify, {
  iconfont: 'sm'
}) 

Vue.config.productionTip = false
Vue.use(BootstrapVue) 


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

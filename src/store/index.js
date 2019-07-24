import dialog from './modules/dialog'
import employee from './modules/employee'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        dialog,
        employee
    }
})
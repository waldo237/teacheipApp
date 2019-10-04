import dialog from './modules/dialog'
import users from './modules/users'
import  employees from './modules/employees'
import  lessonPlans from './modules/lessonPlans'
import  navigation from './modules/navigation'
import  roles from './modules/roles'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        dialog,
        users,
        employees,
        lessonPlans,
        navigation,
        roles
    }
})
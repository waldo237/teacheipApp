import dialog from './modules/dialog'
import  employees from './modules/employees'
import  encargados from './modules/encargados'
import  photos from './modules/photos'
import  lessonPlans from './modules/lessonPlans'
import  navigation from './modules/navigation'
import  firebaseVars from './modules/firebaseVars'
import  validations from './modules/validations'
import  roles from './modules/roles'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        dialog,
        employees,
        photos,
        lessonPlans,
        navigation,
        roles,
        firebaseVars,
        validations,
        encargados
    }
})
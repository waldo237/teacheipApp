import dialog from './modules/dialog'
import  employees from './modules/employees'
import  encargados from './modules/encargados'
import  lessonPlans from './modules/lessonPlans'
import  dossier from './modules/dossier'
import  manuales from './modules/manuales'
import  photos from './modules/photos'
import  navigation from './modules/navigation'
import  firebaseVars from './modules/firebaseVars'
import  validations from './modules/validations'
import  sugerencia from './modules/sugerencia'
import  roles from './modules/roles'
import  feeds from './modules/feed'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        dialog,
        employees,
        sugerencia,
        lessonPlans,
        navigation,
        roles,
        firebaseVars,
        validations,
        encargados,
        dossier,
        manuales,
        photos,
        feeds,
    }
})
const state = {
    currentRole: "Coordinator",
    teacherSideMenu:true,
    coordinatorSideMenu:true,
    supervisorSideMenu:true,
    managerSideMenu:true,
};
const getters = {
    getCurrentRole: (state) =>state.currentRole,
    getTeacherSideMenu: (state) =>state.teacherSideMenu,
    getCoordinatorSideMenu: (state) =>state.coordinatorSideMenu,
    getSupervisorSideMenu: (state) =>state.supervisorSideMenu,
    getManagerSideMenu: (state) =>state.managerSideMenu,
   
};
const actions = {
};
const mutations = {
    setCurrentRole: (state, value) =>(state.currentRole = value),
    setTeacherSideMenu: (state, value) =>(state.teacherSideMenu = value),
    setCoordinatorSideMenu: (state, value) =>(state.coordinatorSideMenu = value),
    setSupervisorSideMenu: (state, value) =>(state.supervisorSideMenu = value),
    setManagerSideMenu: (state, value) =>(state.managerSideMenu = value),
};

export default{
    state,
    getters,
    actions,
    mutations
}
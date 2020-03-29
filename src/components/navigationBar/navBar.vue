<template>
  <div>
    <!-- side menu starts -->
    <div v-on-clickaway="away" v-if="drawer">
      
        <supervisorsideMenu :isSupervisor="isSupervisor" />
        <coordinatorsideMenu :isCoordinator="isCoordinator"/>
        <teachersideMenu :isTeacher="isTeacher"/>

    </div>
    <!-- side menu ends -->
    <!-- complete navigation starts -->
    <v-toolbar app style="background-color:white" class="pa-0" dense sticky>
      <!--  sandwich menu for side bar/menu-->

      <v-btn
        @click.stop="drawer = !drawer"
        v-if="checkIsLoggedIn"
        fab
        flat
        class="ma-0 pa-0 leftIcon"
      >
        <v-icon medium slot>menu</v-icon>
      </v-btn>

      <!-- sandwich menu -->

      <!-- logo starts -->
      <div class="logo-text px-0 my-0 mx-0" :class="(checkIsLoggedIn)? 'leftIcon': ''">
        <router-link to="/" flat round class="px-0 my-0 mx-0 font-weight-bold">
          <span class="teach font-weight-regular">Teach</span>
          <span class="acronym">EIP | version 1.2</span>
        </router-link>
        <span class="full-title mt-0"> with The English Immersion Program</span>
      </div>
      <!-- logo ends -->

      <v-spacer />

      <!-- expanded navigation bar  starts-->
      <navBtnMax @hideMenu="hideMenu" @toggleProfile="profileModel = true" @rolePath="rolePath" />
      <!-- expanded navigation bar ends-->
      <!--  minimized menu starts-->
      <v-btn @click="sandwich = true" fab flat class="hidden-md-and-up rightIcon">
        <v-icon medium slot>menu</v-icon>
      </v-btn>
      <navBtnMin
        :sandwich="sandwich"
        @hideMenu="hideMenu"
        @toggleProfile="profileModel = true"
        @rolePath="rolePath"
      />
      <!--  minimized menu ends-->
      <!-- PRFILE STARTS -->
      <profile
        v-if="profileModel"
        class="profile"
        v-on-clickaway="closeProfile"
        @closeProfile="closeProfile"
      />
      <!-- PRFILE ENDS -->
    </v-toolbar>
    <!-- complete navigation ends -->
    <!-- communication dialogs -->
    <popupRegister />
    <alerting />
    <!-- communication dialogs -->
  </div>
</template>

<script>
import session from "@/store/modules/session.js";
import { directive as onClickaway } from "vue-clickaway";
import popupRegister from "@/views/session/RegisterView.vue";
import alerting from "@/components/alerts.vue";
import profile from "@/components/profile.vue";
import navBtnMin from "@/components/navigationBar/navBtnMin.vue";
import navBtnMax from "@/components/navigationBar/navBtnMax.vue";
import { mapActions, mapGetters } from "vuex";
import supervisorsideMenu from "@/components/sideMenus/SupervisorSidemenu.vue";
import coordinatorsideMenu from "@/components/sideMenus/CoordinatorSidemenu.vue";
import teachersideMenu from "@/components/sideMenus/TeacherSidemenu.vue";
export default {
  name: "Menu1",
  components: {
    popupRegister,
    navBtnMin,
    navBtnMax,
    alerting,
    profile,
    supervisorsideMenu,
    coordinatorsideMenu,
    teachersideMenu
  },
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      sandwich: false,
      profileModel: false,
      signIn: false,
      drawer: false,
      tip: false,
      isSupervisor: false,
      isCoordinator: false,
      isTeacher: false
    };
  },
  methods: {
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    closeProfile() {
      if (this.profileModel) this.profileModel = false;
    },
    away() {
      if (this.drawer) this.drawer = !this.drawer;
    },
    hideMenu() {
      if (this.sandwich) this.sandwich = false;
    },
    onResize() {
      window.addEventListener("resize", () => {
        this.sandwich = false;
      });
    },

    rolePath() {
      if (this.getCurrentRole == "") {
        this.auth()
          .signOut()
          .then(async () => {
            await this.$store.commit("setLoggedIn", false);
            await this.$store.commit("setValidated", {});
            await this.$store.commit("setAlert", false);
            localStorage.removeItem("superUid");
            localStorage.removeItem("sessionRole");
            localStorage.removeItem("sessionToken");
            localStorage.removeItem("serverToken");
            this.$emit("drawerRefresh");
          })
          .catch(error => {
            console.log(`there was an issue logging out:${error}`);
          });
      } else {
        if (this.$route.path != `/${session.fetchRole()}Dashboard`)
          this.$router.push(`/${session.fetchRole()}Dashboard`);
      }
    },
    refreshDrawer() {
      if (this.auth().currentUser) {
        this.$store.commit("setLoggedIn", true);
        this.isSupervisor = session.fetchRole() == "supervisor" ? true : false;
        this.isCoordinator = session.fetchRole() == "coordinator" ? true : false;
        this.isTeacher = session.fetchRole() == "teacher" ? true : false;
        this.$root.$emit("loggedIn");
      }
    },
    ...mapActions(["toggleSU", "runAlert"])
  },
  computed: {
    initialize() {
      return this.auth()
        .currentUser.displayName.split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
    },
    ...mapGetters([
      "checkIsLoggedIn",
      "getNavigation",
      "getCurrentRole",
      "auth"
    ])
  },
  created() {
    this.onResize();
    this.$on("drawerRefresh", this.refreshDrawer());
  }
};
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

.minimized {
  width: 250px;
  z-index: 1;
  position: fixed;
  top: 48px;
  right: 1px;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: slideInDown;
  animation-timing-function: ease-in-out;
  display: block;
}
.profile {
  width: 250px;
  z-index: 1;
  position: fixed;
  top: 48px;
  right: 1px;
  text-align: center;
  display: block;
  animation-duration: 0.1s;
  animation-name: slideInDown;
  animation-timing-function: ease-in-out;
}

.black-blue {
  background: linear-gradient(0deg, rgb(0, 0, 0) 45%, #032950);
}
.sign-in {
  color: white !important;
  background-color: #135393 !important;
}
.sign-up {
  color: white !important;
  background-color: #c6192a !important;
}
.nav-link:hover {
  background-color: rgb(19, 83, 147);
  color: white;
  font-size: 80%;
}

.full-title {
  display: none;
}

.acronym {
  color: #c6192a;
  font-family: inherit;
  font-weight: bolder;
}
.teach {
  color: #135393;
}
.logo-text {
  font-size: 110%;
}
.logo-text:hover .acronym {
  display: none;
}
.logo-text:hover .full-title {
  display: inline;
  color: #135393;
  font-family: "Bebas Neue", serif !important;
  font-weight: 400;
  animation-duration: 0.5s;
  animation-name: zoomInUp;
  animation-timing-function: ease-in-out;
}
.logo-text:hover .teach {
  font-weight: bolder;
  font-family: "Oswald", sans-serif;
  color: #c6192a;
  animation-duration: 0.5s;
  animation-name: zoomInUp;
  animation-timing-function: ease-in-out;
}
.leftIcon {
  position: relative;
  left: -20px;
  margin-right: 1px !important;
}
.rightIcon {
  position: relative;
  right: -20px;
  margin-right: 1px !important;
}

@media screen and (max-width: 960px) {
  .logo-text:hover .full-title {
    font-size: 70%;
  }
  .logo-text:hover .teach {
    font-size: 70%;
  }
}
</style>

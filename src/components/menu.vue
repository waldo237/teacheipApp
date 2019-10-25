 
<template>
  <div>
      <!-- side menu starts -->
    
    <v-navigation-drawer
      app
      v-if="checkIsLoggedIn"
     v-on-clickaway="away"
    > 
       <supervisorsideMenu  v-if="getSupervisorSideMenu"     v-model="suDrawer"
/>
    </v-navigation-drawer>

    <v-navigation-drawer
      app
      v-model="coDrawer"
      v-if="checkIsLoggedIn &&getCoordinatorSideMenu"
      v-on-clickaway="away"
    > 
      <coordinatorsideMenu />
    </v-navigation-drawer>
 
    <!-- side menu ends -->
    <!-- complete navigation starts -->
    <v-toolbar
      app
      style="background-color:white"
      dense
      >
      <!--  sandwich menu for side bar/menu-->
      <v-toolbar-side-icon
      large
      class="px-4 py-2"
        @click.stop="turnOnSideMenu"
        v-if="checkIsLoggedIn"
      />
      <!-- sandwich menu -->

      <!-- logo starts -->
      <div class="logo-text">
        <span class="teach ">Teach</span>
        <span class="acronym">EIP</span>
        <span class="full-title mt-1">
          <img
            src="../../src/assets/mescyt-1024x878.png"
            alt="mescyt"
          >with The English Immersion Program
        </span>
      </div>
      <!-- logo ends -->

      <v-spacer />

      <!-- expanded navigation bar  starts-->
      <v-toolbar-items class="hidden-sm-and-down mx-auto">
        <v-btn
          class="black-blue white--text round"
          v-if="checkIsLoggedIn"
          :to=rolePath>
          <v-icon
            color="white"
            class="mr-0"
          >
            dashboard
          </v-icon><span class="ml-1">DASHBOARD</span>
        </v-btn>
        <v-toolbar-items class="hidden-sm-and-down">
          <router-link
            tag="v-btn"
            style="background-color:white"
            v-for="item in getNavigation.publicNav"
            :key="item.icon"
            :to="item.link"
            :class="item.class"
            class="round"
          >
            {{ item.title }}
          </router-link>
        </v-toolbar-items>
        <v-btn
          @click="toggleSU"
          class="sign-up"
          v-if="!checkIsLoggedIn "
        >
          REGISTER
        </v-btn>
        <v-btn
          @click="toggleSI"
          class="sign-in"
           v-if="!checkIsLoggedIn "
        >
          SIGN IN
        </v-btn>

        <!-- profile avatar starts -->
        <v-btn
          depressed
          fab
          color="white"
          class="avatar-button"
          @click="profileModel = true"
        v-if="checkIsLoggedIn"
        >
          <v-avatar v-if="getCurrentUser.photoURL">
            <img
              :src="getCurrentUser.photoURL"
              :alt="getCurrentUser.displayName"
            >
          </v-avatar>    
          <v-avatar
            :color="colorize"
            v-else
          >
            <span class="white--text headline">{{ initialize }}</span>
          </v-avatar>   
        </v-btn>
        <!-- profile avatar ends -->
      </v-toolbar-items>
      <!-- expanded navigation bar ends-->
      <!--  minimized menu starts-->
      <v-toolbar-side-icon
        large
        class="hidden-md-and-up px-4 py-2"
        slot
        @click="sandwich = true"
      />
      <v-list
        class="minimized elevation-24 round"
        v-if="sandwich"
        v-on-clickaway="hideMenu"
      >
        <v-list-tile
          @click="profileModel = true"
        v-if="checkIsLoggedIn"
          class="pb-1 white"
        >
          <v-btn
            depressed
            fab
            class="avatar-button mx-auto my-0 pt-0"
          >
            <v-avatar v-if="getCurrentUser.photoURL">
              <img
                :src="getCurrentUser.photoURL"
                :alt="getCurrentUser.displayName"
              >
            </v-avatar>    
            <v-avatar
              :color="colorize"
              v-else
            >
              <span class="white--text headline">{{ initialize }}</span>
            </v-avatar>
          </v-btn>
        </v-list-tile>
        <v-list-tile
          class="black-blue white--text"
          tag="v-btn"
        v-if="checkIsLoggedIn"
          :to="rolePath"
        >
          <v-icon
            color="white"
            class="mr-0"
          >
            dashboard
          </v-icon> <span class="mx-auto">DASHBOARD</span>
        </v-list-tile>
        <v-list-tile
          tag="v-btn"
          style="background-color:white"
          v-for="item in getNavigation.publicNav"
          :key="item.icon"
          :to="item.link"
          class="elevation-12 round"
        >
          <span class="mx-auto">

            {{ item.title }}
          </span>
        </v-list-tile>
        <v-list-tile
          @click="toggleSU"
          class="sign-up round"
          v-if="!checkIsLoggedIn "
        >
          <span class="mx-auto">REGISTER</span>
        </v-list-tile>
        <v-list-tile
          @click="toggleSI"
          class="sign-in round"
          v-if="!checkIsLoggedIn "

        >
          <span class="mx-auto my-2">SIGN IN</span>
        </v-list-tile>
      </v-list>
      <!--  minimized menu ends-->
      <v-list-tile>
        <profile
          class="profile"
          v-if="profileModel"
          v-on-clickaway="closeProfile"
        />
      </v-list-tile>
      <!-- profile insertion ends-->
    </v-toolbar>
    <!-- complete navigation ends -->
    <!-- communication dialogs -->
    <popupRegister />
    <signInForm />
    <alerting />
    <!-- communication dialogs -->
  
  </div>
</template>


<script>
import session from '@/store/modules/session.js'
import { directive as onClickaway } from "vue-clickaway";
import popupRegister from "@/views/session/RegisterView.vue";
import signInForm from "@/views/session/LogInView.vue";
import alerting from "@/components/alerts.vue";
import profile from "@/components/profile.vue";
import colors from "@/assets/colors/colors.js";
import { mapActions, mapGetters } from "vuex";
import supervisorsideMenu from '@/components/RoleComponents/supervisorComponents/SupervisorSidemenu.vue'
import coordinatorsideMenu from '@/components/RoleComponents/coordinatorComponents/CoordinatorSidemenu.vue'

export default {
  name: "Menu1",
  components: { popupRegister, signInForm, alerting, profile,supervisorsideMenu,coordinatorsideMenu },
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      currentUser: false,
      suDrawer: false,
      coDrawer: false,
      sandwich: false,
      profileModel: false,
      signIn: false,
      toggled:false,
    };
  },
  methods: {
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    closeProfile() {
      if (this.profileModel) {
        this.profileModel = false;
      }
    },
    away() {
      if (this.drawer && checkIsLoggedIn) {
        this.drawer = !this.drawer;
      }
    },
    hideMenu() {
      if (this.sandwich) {
        this.sandwich = false;
      }
    },
    onResize() {
      window.addEventListener("resize", () => {
        this.sandwich = false;
      });
    },
    async turnOnSideMenu(){
       this.toggled = await !this.toggled;
      switch (this.getCurrentRole) {
        // change hand coded
        case "teacher":
            this.$store.commit('setTeacherSideMenu',  !this.getTeacherSideMenu);
          break;
        case "coordinator":
            this.$store.commit('setCoordinatorSideMenu',  !this.getCoordinatorSideMenu);
          break;
        case "supervisor":
            this.$store.commit('setSupervisorSideMenu',  !this.getSupervisorSideMenu);
          break;
        case "manager":
            this.$store.commit('setManagerSideMenu',  !this.getManagerSideMenu);
          break;
      }
    },
    ...mapActions(["toggleSI", "toggleSU", "runAlert", "validateToken"])
  },
  computed: {
    rolePath(){
      return `${this.getCurrentRole}Dashboard`
    },
    initialize() {
     return this.getCurrentUser.displayName.split(" ").map((n)=>n[0]).join("").toUpperCase()
    },
    colorize() {
      return colors[Math.floor(Math.random() * 280)];
    },
    ...mapGetters([
    "checkIsLoggedIn",
    "getUsers",
    "getCurrentUser",
    "getNavigation",
    "getCurrentRole",
    "getTeacherSideMenu",
    "getCoordinatorSideMenu",
    "getSupervisorSideMenu",
    "getManagerSideMenu",
    "auth",
  ])},
  async created() {
     if (this.auth().currentUser) {
       this.$store.commit('setLoggedIn', true); 
       this.$store.commit("setCurrentUser", this.auth().currentUser);
    }
    this.onResize();
  }
};
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

.minimized {
 width:  250px;
  z-index: 1;
  position: fixed;
  top: 100%;
  right: 10px;
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
  top: 100%;
  right: 2%;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: slideInDown;
  animation-timing-function: ease-in-out;
  display: block;
}

.black-blue{
  background: linear-gradient(
    0deg,
    rgb(0, 0, 0) 45%,
    rgb(13, 71, 136)
  ); 
}
.sign-in {
  color: white !important;
  background-color: rgb(19, 83, 147) !important;
}
.sign-up {
  color: white !important;
  background-color: rgb(209, 60, 52) !important;
}
.nav-link:hover {
  background-color: rgb(19, 83, 147);
  color: white;
  font-size: 80%;
}

.full-title {
  display: none;
}
.full-title img {
  width: 55px;
}
.acronym {
  color: #c6192a;
  font-family: inherit;
  font-weight: bolder;
}
.teach {
  color: #135393;
}
.logo-text{
  font-size:140%;
}
.logo-text:hover .acronym {
  display: none;
  
}
.logo-text:hover .full-title {
  display: inline;
  color: #135393;
  font-family:'Oswald', sans-serif;
  font-weight: 400;
  animation-duration: 0.5s;
  animation-name: zoomInUp;
  animation-timing-function: ease-in-out;
}
.logo-text:hover .teach {
  font-weight: bolder;
  font-family:'Oswald', sans-serif;
  color: #c6192a;
  animation-duration: 0.5s;
  animation-name: zoomInUp;
  animation-timing-function: ease-in-out;
}

@media screen and (max-width: 960px) {
  .logo-text:hover .full-title {
    font-size: 70%;
  }
  .logo-text:hover .teach {
    font-size: 70%;
  }
  .logo-text:hover img {
    height: 50px;
    width: 50px;
  }
}
</style>

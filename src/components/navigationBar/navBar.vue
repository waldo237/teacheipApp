<template>
  <div>
    <!-- side menu starts -->
    <div v-on-clickaway="away">
      <v-navigation-drawer app v-model="drawer" disable-resize-watcher>
        <supervisorsideMenu v-if="isSupervisor" />
        <coordinatorsideMenu v-else-if="isCoordinator" />
      </v-navigation-drawer>
    </div>
    <!-- side menu ends -->
    <!-- complete navigation starts -->
    <v-toolbar app style="background-color:white">
      <!--  sandwich menu for side bar/menu-->
      <v-toolbar-side-icon
        x-large
        class="px-4 py-2"
        @click.stop="drawer = !drawer"
        v-if="checkIsLoggedIn"
      />
      <!-- sandwich menu -->

      <!-- logo starts -->
      <div class="logo-text">
        <span class="teach">Teach</span>
        <span class="acronym">EIP</span>
        <span class="full-title mt-1">
          <img
            src="https://drive.google.com/uc?export=view&id=19PR4dusrh30pW5aIrX4OL5RXybYfzK0T"
            lazy-src="https://drive.google.com/uc?export=view&id=19PR4dusrh30pW5aIrX4OL5RXybYfzK0T"
            alt="mescyt"
          />with The English Immersion Program
        </span>
      </div>
      <!-- logo ends -->

      <v-spacer />

      <!-- expanded navigation bar  starts-->
      <navBtnMax
        @hideMenu="hideMenu"
        @toggleProfile="profileModel = true"
        @rolePath='rolePath'
        />
      <!-- expanded navigation bar ends-->
      <!--  minimized menu starts-->
      <v-toolbar-side-icon
        x-large
        class="hidden-md-and-up mr-0  px-4 py-2"
        slot
        @click="sandwich = true"
      />
      <navBtnMin
        :sandwich="sandwich"
        @hideMenu="hideMenu"
        @toggleProfile="profileModel = true"
        @rolePath='rolePath'
      />
      <!--  minimized menu ends-->
      <v-list-tile v-if="profileModel">
        <profile
          class="profile"
          v-on-clickaway="closeProfile"
          @closeProfile="closeProfile"
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
import session from "@/store/modules/session.js";
import { directive as onClickaway } from "vue-clickaway";
import popupRegister from "@/views/session/RegisterView.vue";
import signInForm from "@/views/session/LogInView.vue";
import alerting from "@/components/alerts.vue";
import profile from "@/components/profile.vue";
import navBtnMin from "@/components/navigationBar/navBtnMin.vue";
import navBtnMax from "@/components/navigationBar/navBtnMax.vue";
import colors from "@/assets/colors/colors.js";
import { mapActions, mapGetters } from "vuex";
import supervisorsideMenu from "@/components/RoleComponents/supervisorComponents/SupervisorSidemenu.vue";
import coordinatorsideMenu from "@/components/RoleComponents/coordinatorComponents/CoordinatorSidemenu.vue";

export default {
  name: "Menu1",
  components: {
    popupRegister,
    navBtnMin,
    navBtnMax,
    signInForm,
    alerting,
    profile,
    supervisorsideMenu,
    coordinatorsideMenu
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
      isSupervisor: session.fetchRole() == "supervisor",
      isCoordinator: session.fetchRole() == "coordinator"
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
          })
          .catch(error => {
            console.log(`there was an issue logging out:${error}`);
          });
      } else {
        if (this.$route.path != `/${session.fetchRole()}Dashboard`)
          this.$router.push(`/${session.fetchRole()}Dashboard`);
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
    colorize() {
      return colors[Math.floor(Math.random() * 280)];
    },
    ...mapGetters([
      "checkIsLoggedIn",
      "getNavigation",
      "getCurrentRole",
      "auth"
    ])
  },

  beforeMount() {
    if (this.auth().currentUser && session.fetchRole()) {
      this.$store.commit("setLoggedIn", true);
    }
  },
  created() {
    this.onResize();
  }
};
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

.minimized {
  width: 250px;
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

.black-blue {
  background: linear-gradient(0deg, rgb(0, 0, 0) 45%, rgb(13, 71, 136));
}
.sign-in {
  color: white !important;
  background-color: rgb(19, 83, 147) !important;
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
.logo-text {
  font-size: 140%;
}
.logo-text:hover .acronym {
  display: none;
}
.logo-text:hover .full-title {
  display: inline;
  color: #135393;
  font-family: "Oswald", sans-serif;
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

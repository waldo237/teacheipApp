 
 <template>
  <div>
    <!-- alerts online/offline -->
    <v-alert v-model="log" class="connection-off">
      <v-icon>signal_wifi_off</v-icon>You are currently offline
    </v-alert>
    <v-alert v-model="online" type="success" class="connection-on">
      <v-icon>check_circle_outline</v-icon>Back online!
    </v-alert>
    <!-- alerts online/offline ends-->

    <!-- complete navigation starts -->
    <v-toolbar app style="background-color:white">
      <!--  sandwich menu for side bar/menu-->
      <v-toolbar-side-icon class="gray--text" @click="drawer = !drawer" v-on-clickaway="away" v-if="checkIsLoggedIn"></v-toolbar-side-icon>
      <!-- sandwich menu -->

      <!-- logo starts -->
      <div class="logo-text">
        <span class="teach">Teach</span>
        <span class="acronym">EIP</span>
        <span class="full-title">
          <img src="../../src/assets/mescyt-1024x878.png" alt="mescyt" />with The English Immersion Program
        </span>
      </div>
      <!-- logo ends -->

      <v-spacer></v-spacer>

      <!-- expanded navigation bar  starts-->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-toolbar-items class="hidden-sm-and-down" v-if="!checkIsLoggedIn">
          <router-link
            tag="v-btn"
            style="background-color:white"
            v-for="item in getNavigation.publicNav"
            :key="item.icon"
            :to="item.link"
            :class="item.class"
          >{{ item.title }}</router-link>
        </v-toolbar-items>
        <v-btn @click="toggleSU" class="sign-up" v-if="!checkIsLoggedIn">REGISTER</v-btn>
        <v-btn @click="toggleSI" class="sign-in" v-if="!checkIsLoggedIn">SIGN IN</v-btn>

        <!-- private navigation elements starts -->
        <v-toolbar-items class="hidden-sm-and-down" v-if="checkIsLoggedIn">
          <router-link
            tag="v-btn"
            style="background-color:white"
            v-for="item in getNavigation.privateNav"
            :key="item.icon"
            :to="item.link"
            :class="item.class"
          >
            {{ item.title }}
            <v-icon>{{item.icon}}</v-icon>
            <br />
          </router-link>
        </v-toolbar-items>
        <!-- private navigation elements ends -->

        <!-- profile avatar starts -->
        <v-btn depressed fab color="white" class="avatar-button"  @click="profileModel = !profileModel" v-if="checkIsLoggedIn">
        <v-avatar>
              <img
                :src="getCurrentUser.photoURL"
                alt="Waldo"
              />
        </v-avatar>
        </v-btn>
        <!-- profile avatar ends -->
      </v-toolbar-items>
      <!-- expanded navigation bar ends-->
               <v-list-tile>
              <profile class="profile" v-if="profileModel" v-on-clickaway="closeProfile"/>
          </v-list-tile>

      <!-- sandwich menu when minimized -->
      <transition name="sandwich">
        <v-menu class="hidden-md-and-up" v-model="sandwich">
          <v-toolbar-side-icon slot="activator" v-on-clickaway="hideMenu"></v-toolbar-side-icon>
          <transition name="tiles">
            <v-list class="tiles">
              <router-link
                tag="v-btn"
                v-for="item in getNavigation.publicNav"
                :key="item.icon"
                :to="item.link"
                :class="item.class"
              >
                {{ item.title }}
                <v-icon>{{item.icon}}</v-icon>
                <br />
              </router-link>
            </v-list>
          </transition>
        </v-menu>
      </transition>
    </v-toolbar>
    <!-- complete navigation ends -->

    <!--side-menu starts-->
      <v-navigation-drawer v-model="drawer" app class="indingo" v-if="checkIsLoggedIn">
    <sidemenu />
      </v-navigation-drawer>

    <!-- <v-navigation-drawer v-model="drawer" app class="indingo" v-if="checkIsLoggedIn">
      <v-card>
        <v-card-title>
          <v-icon>dashboard</v-icon>DASHBOARD
        </v-card-title>
      </v-card>

      <v-list-tile-title></v-list-tile-title>
      <v-list-tile v-for="item in getNavigation.publicNav" :key="item.class">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{item.title}}</v-list-tile-title>
      </v-list-tile>
    </v-navigation-drawer> -->
    <!--side-menu ends-->

    <!-- communication dialogs -->
    <popupRegister />
    <signInForm />
    <alerting />
    <!-- communication dialogs -->
  </div>
</template>


<script>
import { directive as onClickaway } from "vue-clickaway";
import popupRegister from "@/views/popup-signup.vue";
import signInForm from "@/views/popup-signin.vue";
import alerting from "@/components/alerts.vue";
import profile from "@/components/profile.vue";
import sidemenu from "@/components/sidemenu.vue";
import { mapActions, mapGetters } from "vuex";
import auth from "firebase";
import { async } from "q";
import { get } from "http";
import { setTimeout } from "timers";
export default {
  name: "menu1",
  components: { popupRegister, signInForm, alerting, profile,sidemenu },
  template: '<p v-on-clickaway="away">Click away</p>',
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      currentUser: false,
      drawer: false,
      sandwich: false,
      log: false,
      online: false,
      profileModel: false
    };
  },
  methods: {
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    async logout() {
      await this.showAlert(
        "Are you sure you want to log out",
        "help_outline",
        "warning"
      );
      auth
        .auth()
        .signOut()
        .then(async () => {
          this.$router.push("/");
          this.toggleIsLoggedIn();
        });
    },
    closeProfile: function() {
      if (this.profileModel) {
        this.profileModel = false;
      }
    },
    away: function() {
      if (this.drawer) {
        this.drawer = false;
      }
    },
    hideMenu: function() {
      if (this.sandwich) {
        this.sandwich = false;
      }
    },
    onResize: function() {
      window.addEventListener("resize", () => {
        this.sandwich = false;
      });
    },
    init() {
      const updateOnlineStatus = async event => {
        this.log = navigator.online ? false : true;
        if (navigator.onLine) {
          this.log = false;
          this.online = true;
          setTimeout(async () => {
            this.online = false;
          }, 2000);
        }
      };
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);
    },
    ...mapActions(["toggleSI", "toggleSU", "toggleIsLoggedIn", "runAlert"])
  },
  computed: mapGetters(["checkIsLoggedIn", "getUsers", "getCurrentUser", "getNavigation"]),
  created: function() {
    this.init();
    if (auth.auth().currentUser) {
      this.toggleIsLoggedIn();
      this.$store.commit("setCurrentUser", auth.auth().currentUser);
    }
    this.onResize();
    this.profileModel = false;
  }
};
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

.profile {
  width: 20%;
  z-index: 1;
  position: fixed;
  top: 100%;
  right: 2%;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: fadeIn;
  animation-timing-function: ease-in-out;
  display: block;
}
.connection-on {
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 35px;
  height: 60px;
  padding: 0%;
  text-align: center;
  animation-duration: 1.5s;
  animation-name: bounceIn;
  animation-timing-function: ease-in-out;
  display: block;
  color: white;
}
.connection-off {
  z-index: 1;
  position: fixed;
  top: 35px;
  height: 49px;
  text-align: center;
  animation-duration: 1.5s;
  animation-name: bounceInDown;
  animation-timing-function: ease-in-out;
  display: block;
  color: white;
}

.tiles {
  animation-duration: 0.5s;
  animation-name: bounceInRight;
  animation-timing-function: ease-in-out;
  display: block;
  font-size: 40px;
  color: white;
}
.tiles:after {
  animation-duration: 0.5s;
  animation-name: bounceInLeft;
  animation-timing-function: ease-out;
  display: block;
  font-size: 40px;
  color: white;
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
  height: 96px;
}
.acronym {
  color: #c6192a;
  font-family: inherit;
  font-weight: bolder;
}
.teach {
  color: #135393;
}
.logo-text:hover .acronym {
  display: none;
}
@keyframes example {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(-100px);
  }
  50% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
.logo-text:hover .full-title {
  display: inline;
  color: #135393;
  font-weight: 900;
  animation-name: example;
  animation-duration: infinite 2s;
  transform: translated(0, 2, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
.logo-text:hover .teach {
  font-size: 120%;
  font-weight: bolder;
  color: #c6192a;
}

@media screen and (max-width: 800px) {
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

 
 <template>
  <div>
                <v-alert v-model="log" class="connection-off" ><v-icon>signal_wifi_off</v-icon> You are currently offline</v-alert>
                <v-alert v-model="online" type="success" class="connection-on"><v-icon>check_circle_outline</v-icon>Back online!</v-alert>
  

    <v-toolbar app style="background-color:white">
      <v-toolbar-side-icon class="gray--text" @click="drawer = !drawer" v-on-clickaway="away"></v-toolbar-side-icon>
      <div class="logo-text">
        <span class="teach">Teach</span>
        <span class="acronym">EIP</span>
        <span class="full-title">
          <img src="../../src/assets/mescyt-1024x878.png" alt="mescyt" />with The English Immersion Program
        </span>
      </div>
      <v-spacer></v-spacer>
      <!-- navigation bar -->
      <v-toolbar-items class="hidden-md-and-down">
        <v-toolbar-items class="hidden-md-and-down" v-if="!checkIsLoggedIn">
          <router-link
            tag="v-btn"
            style="background-color:white"
            v-for="item in publicNav"
            :key="item.icon"
            :to="item.link"
            :class="item.class"
          >{{ item.title }}</router-link>
        </v-toolbar-items>
        <v-btn @click="toggleSU" class="sign-up" v-if="!checkIsLoggedIn">REGISTER</v-btn>
        <v-btn @click="toggleSI" class="sign-in" v-if="!checkIsLoggedIn">SIGN IN</v-btn>
        <v-toolbar-items class="hidden-md-and-down" v-if="checkIsLoggedIn">
          <router-link
            tag="v-btn"
            style="background-color:white"
            v-for="item in privateNav"
            :key="item.icon"
            :to="item.link"
            :class="item.class"
          >
            {{ item.title }}
            <v-icon>{{item.icon}}</v-icon>
            <br />
          </router-link>
        </v-toolbar-items>
        <!-- log out -->
        <v-btn tag="v-btn" class="sign-up" @click="logout" v-if="checkIsLoggedIn">
          Log out
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <!-- log out -->
      </v-toolbar-items>

      <!-- sandwich menu when minimized -->
      <transition name="sandwich">
        <v-menu class="hidden-lg-and-up" v-model="sandwich">
          <v-toolbar-side-icon slot="activator" v-on-clickaway="hideMenu"></v-toolbar-side-icon>
          <transition name="tiles">
            <v-list class="tiles">
              <router-link
                tag="v-btn"
                v-for="item in publicNav"
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
    <!-- this is the side-menu -->
    <v-navigation-drawer v-model="drawer" app class="indingo">
      <v-card>
        <v-card-title>
          <v-icon>dashboard</v-icon>DASHBOARD
        </v-card-title>
      </v-card>

      <v-list-tile-title></v-list-tile-title>
      <v-list-tile v-for="item in publicNav" :key="item.class">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{item.title}}</v-list-tile-title>
      </v-list-tile>
    </v-navigation-drawer>
    <!-- popup-register -->
    <popupRegister />
    <signInForm />
    <alerting />

    <!-- popup-register -->
  </div>
</template>


<script>
import { directive as onClickaway } from "vue-clickaway";
import popupRegister from "@/views/popup-signup.vue";
import signInForm from "@/views/popup-signin.vue";
import alerting from "@/components/alerts.vue";
import { mapActions, mapGetters } from "vuex";
import auth from "firebase";
import { async } from "q";
import { get } from "http";
import { setTimeout } from 'timers';
export default {
  name: "menu1",
  components: { popupRegister, signInForm, alerting },
  template: '<p v-on-clickaway="away">Click away</p>',
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      publicNav: [
        {
          icon: "home",
          title: "HOME",
          link: "/",
          class: "home"
        },
        {
          icon: "people_outline",
          title: "ABOUT",
          link: "/about",
          class: "about"
        }
      ],
      privateNav: [
        {
          icon: "folder",
          title: "LESSON PLANS",
          link: "/lesson plans",
          class: "lesson-plan"
        },
        {
          icon: "person",
          title: "EMPLOYEES",
          link: "/register",
          class: "employees"
        },

        {
          icon: "dashboard",
          title: "DASHBOARD",
          link: `dashboard/${this.getCurrentUser}`,
          class: "sign-in"
        }
      ],
      currentUser: false,
      drawer: false,
      sandwich: false,
      log: false,
      online: false,

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
    },init(){
  // const status = document.getElementById("status");
  const updateOnlineStatus= async (event)=> {
      this.log = navigator.online ? false : true;
      if(navigator.onLine){
        this.log = false;
        this.online =true;
       setTimeout(async()=>{
        this.online =false;
        }, 2000);
        // this.online = navigator.onLine ? false : true;

      }
  }
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }, 
    ...mapActions(["toggleSI", "toggleSU", "toggleIsLoggedIn", 'runAlert'])
  },
  computed: mapGetters(["checkIsLoggedIn", "getUsers", "getCurrentUser"]),
  created: function() {
    this.init()
    if (auth.auth().currentUser) {
      // auth.auth().currentUser.updateProfile({ displayName: "waldo milanes" });
      this.toggleIsLoggedIn();
      this.$store.commit("setCurrentUser", auth.auth().currentUser);
    }
    this.onResize();
  }
};
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

.connection-on {
  width: 100%;
  z-index: 1;
  position: fixed;
  top:35px;
  height:60px;
  padding: 0%;
  text-align: center;
  animation-duration: 1.5s;
  animation-name: heartBeat;
  animation-timing-function: ease-in-out;
  display: block;
  color: white;
}
.connection-off {
  z-index: 1;
  position: fixed;
  top:35px;
  height:49px;
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

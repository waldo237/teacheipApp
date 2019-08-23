 
 <template>
  <div >

    <!-- complete navigation starts -->
    <v-toolbar app style="background-color:white">
      <!--  sandwich menu for side bar/menu-->
      <v-toolbar-side-icon @click="drawer= !drawer" v-if="checkIsLoggedIn"></v-toolbar-side-icon>
      <!-- sandwich menu -->

      <!-- logo starts -->
      <div class="logo-text">
        <span class="teach ">Teach</span>
        <span class="acronym">EIP</span>
        <span class="full-title mt-1">
          <img src="../../src/assets/mescyt-1024x878.png" alt="mescyt" />with The English Immersion Program
        </span>
      </div>
      <!-- logo ends -->

      <v-spacer></v-spacer>

      <!-- expanded navigation bar  starts-->
      <v-toolbar-items class="hidden-sm-and-down mx-auto">
        <v-toolbar-items class="hidden-sm-and-down">
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

        <!-- profile avatar starts -->
        <v-btn
          depressed
          fab
          color="white"
          class="avatar-button"
          @click="profileModel = true"
          v-if="checkIsLoggedIn"
        >
          <v-avatar v-if="getCurrentUser.photoURL !== 'https://generic.jpg'">
                <img :src="getCurrentUser.photoURL"
              :alt="getCurrentUser.displayName" />
            </v-avatar>    
              <v-avatar color="red" v-else>
              <span  class="white--text headline">{{getCurrentUser.displayName.split(" ").map((n)=>n[0]).join("").toUpperCase()}}</span>

            </v-avatar>   
        </v-btn>
        <!-- profile avatar ends -->
      </v-toolbar-items>
      <!-- expanded navigation bar ends-->
      <!--  minimized menu starts-->
      <v-toolbar-side-icon
        class="hidden-md-and-up mx-auto"
        slot
        @click="sandwich = true"
      ></v-toolbar-side-icon>
        <v-list class="minimized elevation-24" v-if="sandwich" v-on-clickaway="hideMenu">
          <v-list-tile @click="profileModel = true"
            v-if="checkIsLoggedIn" class="pb-1 white">
          <v-btn
            depressed
            fab
            class="avatar-button mx-auto my-0 pt-0"
     
          >
           <v-avatar v-if="getCurrentUser.photoURL!== 'https://generic.jpg'">
                <img :src="getCurrentUser.photoURL"
              :alt="getCurrentUser.displayName" />
            </v-avatar>    
              <v-avatar color="red" v-else>
              <span  class="white--text headline">{{getCurrentUser.displayName.split(" ").map((n)=>n[0]).join("").toUpperCase()}}</span>

            </v-avatar>   

          </v-btn>
          </v-list-tile>
          <v-list-tile
            tag="v-btn"
            style="background-color:white"
            v-for="item in getNavigation.publicNav"
            :key="item.icon"
            :to="item.link"
            class="elevation-12"
          > <span class="mx-auto">

           {{ item.title }}
          </span>
          </v-list-tile>
          <v-list-tile @click="toggleSU" class="sign-up" v-if="!checkIsLoggedIn"><span class="mx-auto">REGISTER</span></v-list-tile>
          <v-list-tile @click="toggleSI" class="sign-in" v-if="!checkIsLoggedIn"><span class="mx-auto">SIGN IN</span></v-list-tile>
      </v-list>
        

      <!--  minimized menu ends-->
      <v-list-tile>
        <profile class="profile" v-if="profileModel" v-on-clickaway="closeProfile" />
      </v-list-tile>
      <!-- profile insertion ends-->
    </v-toolbar>
    <!-- complete navigation ends -->

    <!--side-menu starts-->
    <v-navigation-drawer v-model="drawer" app v-if="checkIsLoggedIn">
      <sidemenu />
    </v-navigation-drawer>
    <!--side-menu ends-->

    <!-- communication dialogs -->
    <popupRegister />
    <signInForm />
    <alerting />

    <!-- communication dialogs -->
    <!-- profile insertion starts-->
  </div>
</template>


<script>
import { directive as onClickaway } from "vue-clickaway";
import popupRegister from "@/views/RegisterView.vue";
import signInForm from "@/views/LogInView.vue";
import alerting from "@/components/alerts.vue";
import profile from "@/components/profile.vue";
import sidemenu from "@/components/sidemenu.vue";
import { mapActions, mapGetters } from "vuex";
import auth from "firebase";
export default {
  name: "menu1",
  components: { popupRegister, signInForm, alerting, profile, sidemenu },
  template: '<p v-on-clickaway="away">Click away</p>',
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      currentUser: false,
      drawer: false,
      sandwich: false,
      profileModel: false,
      signIn: false
      // sandwich menu element models
    };
  },
  methods: {
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    closeProfile: function() {
      if (this.profileModel) {
        this.profileModel = false;
      }
    },
    away: function() {
      if (this.drawer && checkIsLoggedIn) {
        this.drawer = !this.drawer;
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
 
    ...mapActions(["toggleSI", "toggleSU", "runAlert"])
  },
  computed: mapGetters([
    "checkIsLoggedIn",
    "getUsers",
    "getCurrentUser",
    "getNavigation",
  ]),
  created: function() {
    
    if (auth.auth().currentUser) {
      if(auth.auth().currentUser.emailVerified) this.$store.commit('setLoggedIn', true); this.$store.commit("setCurrentUser", auth.auth().currentUser);
    }
    this.onResize();
    // this.profileModel = false;
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

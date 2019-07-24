 
 <template>
  <div>
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
        <router-link
          tag="v-btn"
          style="background-color:white"
          v-for="item in navbar"
          :key="item.icon"
          :to="item.link"
          :class="item.class"
        >{{ item.title }}</router-link>
        <v-btn @click="toggleSU" class="sign-up">REGISTER</v-btn>
        <v-btn @click="toggleSI" class="sign-in">SIGN IN</v-btn>
        <!-- log out -->
        <v-btn
          tag="v-btn"
          class="sign-up"
          @click="logout"          
        >Log out <v-icon>exit_to_app</v-icon></v-btn>
        <!-- log out -->
      </v-toolbar-items>

      <!-- sandwich menu when minimized -->
      <transition name="sandwich">
      <v-menu class="hidden-lg-and-up" v-model="sandwich" >
        <v-toolbar-side-icon slot="activator" v-on-clickaway="hideMenu"></v-toolbar-side-icon>
        <transition name="tiles">
        <v-list class="tiles">
          <router-link
            tag="v-btn"
            v-for="item in navbar"
            :key="item.icon"
            :to="item.link"
            :class="item.class"
          >
            {{ item.title }}
            <v-icon>{{item.icon}}</v-icon><br>
          </router-link>
        </v-list>

        </transition>
      </v-menu>

      </transition>
    </v-toolbar>
    <!-- this is the side-menu -->
    <v-navigation-drawer v-model="drawer" app class="indingo">
      <v-card>
      <v-card-title><v-icon>dashboard</v-icon>DASHBOARD</v-card-title>
      
       </v-card>

      <v-list-tile-title></v-list-tile-title>
      <v-list-tile v-for="item in navbar" :key="item.class">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{item.title}}</v-list-tile-title>
      </v-list-tile>
    </v-navigation-drawer>
    <!-- popup-register -->
    <popupRegister />
    <signInForm />

    <!-- popup-register -->
  </div>
</template>


<script>
import { directive as onClickaway } from "vue-clickaway";
import popupRegister from "@/components/popup-signup.vue";
import signInForm from "@/components/popup-signin.vue";
import { mapActions } from "vuex";
import firebase from 'firebase'
export default {
  name: "navbar",
  components: { popupRegister,signInForm },
  template: '<p v-on-clickaway="away">Click away</p>',
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      navbar: [
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
        },
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
          class: "employees",
        },
       

        // {
        //   icon: "exit_to_app",
        //   title: "SIGN IN",
        //   link: "/sign in",
        //   class: "sign-in"
        // }
      ],
       isLoggedIn: false,
       currentUser: false,
      drawer: false,
      sandwich: false
    };
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(()=>{
        alert(' you are logged out')
        this.$router.push('/')
      })
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
    onResize: function(){
      window.addEventListener('resize', ()=>{
        this.sandwich = false;
      })
    },
    ...mapActions(["toggleSI", "toggleSU"])
  },
  created:function(){
    this.onResize();
  }
};
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
.tiles{
  animation-duration: 0.5s;
  animation-name: bounceInRight;
  animation-timing-function: ease-in-out;
  display: block;
  font-size: 40px;
  color: white;
}
.tiles:after{
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

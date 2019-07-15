 
 <template>
  <div id="app">
    <v-toolbar app style="background-color:white" data-app>
      <v-toolbar-side-icon class="gray--text" @click="drawer = !drawer"  v-on-clickaway="away"></v-toolbar-side-icon>
      <div class="logo-text">
        <span class="teach">Teach</span>
        <span class="acronym">EIP</span>
        <span class="full-title">
          <img src="../../src/assets/mescyt-1024x878.png" alt="mescyt" />with The English Immersion Program
        </span>
      </div>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down">
        <router-link
          tag="v-btn"
          style="background-color:white"
          v-for="item in navbar"
          :key="item.icon"
          :to="item.link"
          :class="item.class"
        >{{ item.title }}</router-link>
      </v-toolbar-items>
      <v-menu class="hidden-lg-and-up" v-model="sandwich">
        <v-toolbar-side-icon slot="activator"  v-on-clickaway="hideMenu"></v-toolbar-side-icon>
        <v-list >
          <router-link
            tag="v-btn"
            v-for="item in navbar"
            :key="item.icon"
            :to="item.link"
            :class="item.class"
          >{{ item.title }}</router-link>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app class="indingo">
            <v-icon>dashboard</v-icon>
             <v-list-tile-title></v-list-tile-title>
      <v-list-tile v-for="item in navbar" :key="item.class">
       
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
           <v-tile-content>
             <v-list-tile-title>{{item.title}}</v-list-tile-title>
      <!-- <router-link
          tag="v-btn"
          style="background-color:white"
          v-for="item in navbar"
          :key="item.icon"
          :to="item.link"
          :class="item.class"
        >{{ item.title }}</router-link> -->

        </v-tile-content>

      </v-list-tile>
    </v-navigation-drawer>
  </div>
</template>


<script>
import { directive as onClickaway } from "vue-clickaway";

export default {
  name: "navbar",
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
            icon: "sign-up",
            title: "REGISTER",
            link: "/sign-up",
            class: "sign-up",
          },
        {
          icon: "login",
          title: "SIGN IN",
          link: "/sign in",
          class: "sign-in",
        },
      ],
      drawer: false,
      sandwich: false
    };
  },
  methods: {
    away: function() {
     if(this.drawer){this.drawer = false;}
    },
    hideMenu: function() {
     if(this.sandwich){this.sandwich = false;}
    }
  }
};
</script>
 
<style>
.sign-in{
  color: white !important;
  background-color: rgb(19, 83, 147) !important;
}
.sign-up{
  color: white !important;
  background-color: rgb(209,60,52)  !important;
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

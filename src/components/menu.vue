 
 <template>
  <div id="app">
    <v-toolbar  app style="background-color:white" data-app>
      <v-toolbar-side-icon class="gray--text" @click="drawer = !drawer" v-click-outside="hide"></v-toolbar-side-icon>
      <div class="logo-text"> 
        <span class="teach">Teach</span>
        <span class="acronym">EIP</span>
        <span class="full-title"> <img src="../../src/assets/mescyt-1024x878.png" alt="mescyt">with The English Immersion Program</span>

      </div> 
      
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down">
        <router-link
        class="open-menu"
        tag="v-btn"
        style="background-color:white"
          v-for="item in navbar"
          :key="item.icon"
          :to="item.link"
          :name="item.name"
          
        >{{ item.title }}</router-link>
      </v-toolbar-items>
      <v-menu class="hidden-lg-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
       <v-list class="sandwich-menu">
              <router-link
        tag="v-list-tile"
          v-for="item in navbar"
          :key="item.icon"
          :to="item.link"
          :name="item.name"
          
        >{{ item.title }}</router-link>
            </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app class="indingo">
      <p>klk</p>
    </v-navigation-drawer>
  </div>
</template>


<script>
import Vue from 'vue'

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    this.event = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', this.event)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', this.event)
  },
});
export default {
 name: "navbar",
  data () {
    return {
      navbar: [
        { icon: "home", title: "HOME", link: "/", class: "nav-button", name:"home"},
        { icon: "people_outline", title: "ABOUT", link: "/about" , class: "nav-button" , name:"about"},
        { icon: "ballot", title: "LESSON PLANS", link: "/lesson plans", class: "nav-button", name:"lesson-plan" },
        { icon: "login", title: "SING IN", link: "/sign in", class:"sign-in", name:"sign-in"}
      ],
      drawer: false
    };
  },
  methods:{
    hide: function() {
    	this.drawer = false;
    }
  }
}
</script>
 
<style>
.nav-link:hover {
  background-color: rgb(19,83,147);
  color: white;
  font-size: 80%;
}

.full-title {
  display: none;
 
}
.full-title img {
 height: 96px;
 
}
.acronym{
  color: #c6192a;
  font-family: inherit;
    font-weight: bolder;

}
.teach{
  color: #135393;
}
.logo-text:hover .acronym {
  display: none;
  
}
@keyframes example {
 0%   { transform: scale(1,1)    translateY(0); }
        10%  { transform: scale(1.1,.9) translateY(0); }
        30%  { transform: scale(.9,1.1) translateY(-100px); }
        50%  { transform: scale(1,1)    translateY(0); }
        100% { transform: scale(1,1)    translateY(0); }
}
.logo-text:hover .full-title {
  display:inline;
  color:#135393;
  font-weight:900;
  animation-name:shake;
  animation-duration: infinite 2s ;
  transform: translated(0, 2, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
.logo-text:hover .teach{
  font-size: 120%;
  font-weight: bolder;
  color: #c6192a;

}

.sandwich-menu{
  position: relative; 
  left: 10%;
  top: 50%;
  color: red;
}

@media screen and (max-width: 800px) {
  .logo-text:hover .full-title {
   font-size: 70%;
  }
  .logo-text:hover .teach{
   font-size: 70%;
  }
  .logo-text:hover img {
   height: 50px;
   width: 50px;
  }
}


</style>

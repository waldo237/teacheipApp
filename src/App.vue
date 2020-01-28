<template>
  <div
    id="app"
    data-app
  >
    <!-- alerts online/offline -->
      <v-alert
        v-model="log"
        class="connection-off sign-up mt-3"
      >
        <v-icon class="mr-2">
          signal_wifi_off
        </v-icon>You are currently offline
      </v-alert>
      <v-alert
        v-model="online"
        type="success"
        icon="false"
        class="connection-on mt-3"
      >
        <v-icon class="mr-2">
          check_circle_outline
        </v-icon>Back online!
      </v-alert>
    <!-- alerts online/offline ends-->

  
      <!-- .header-wrapper -->
      <NavBar />       
      <!-- .navbar-wrapper -->
    <router-view />
    <Footer />
    <Sugerencias v-if="checkIsLoggedIn"/>
  </div>
</template>
<script>
import 'vuetify/dist/vuetify.min.css'
import NavBar from '@/components/navigationBar/navBar.vue'
import {mapGetters} from 'vuex'
import Footer from '@/components/footer.vue';
import Sugerencias from '@/views/services/sugerencias.vue';
export default {
 name: 'SiteHeade',
 data(){
   return{
      log: false,
      online: false,
      timeOut: {},
   }
 },
 components: {
   NavBar, 
   Footer,
   Sugerencias
 },
 methods: {
      init() {
      const updateOnlineStatus = async event => {
        this.log = navigator.online ? false : true;
        if (navigator.onLine) {
          this.log = false;
          this.online = true;
        this.timeOut =  setTimeout(async () => {
            this.online = false;
          }, 3000);
        }
      };
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);
    },
 },
computed: mapGetters(["getFullScreen","checkIsLoggedIn"]),
async created(){
       this.init();
       await this.$store.dispatch('fetchPhotos')
    },
    beforeDestroy() {
    clearInterval(this.timeOut);
  },
}
</script>
<style>
[v-cloak]{
  display: none !important;
}

@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

@import url('https://fonts.googleapis.com/css?family=Karla&display=swap');
@import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');

html, body {
  font-family: 'Karla', sans-serif;
}

#app {
  font-family: 'Karla', sans-serif;
}
.v-card-title{
font-family: 'Oswald', sans-serif;
}

@media screen and (max-width: 960px) {

#img-mescyt{
  width: 80% ;
}
.site-title{
font-size: 60% !important;
padding: 0%;
}
.page-title{
font-size: 30% !important;
padding: 0%;
}
}

.titles{
  font-family: 'Oswald', sans-serif !important;
}
.titles a{
  color:#135393 !important;
}
.titles:hover{
  color: #d13c34;
  animation-duration: 1.5s;
  animation-name: rubberBand;
  animation-timing-function: ease-in-out;
}

a{
  text-decoration: none;
}
.connection-on {
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 32px;
  height: 49px;
  text-align: center;
  animation-duration: 1.5s;
  animation-name: slideInUp;
  animation-timing-function: ease-in-out;
  background-color: rgb(76, 175, 80) !important;
}
.connection-off {
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 32px;
  height: 49px;
  text-align: center;
  animation-duration: 1.5s;
  animation-name: bounceInDown;
  animation-timing-function: ease-in-out;
  display: block;
  
}
</style>
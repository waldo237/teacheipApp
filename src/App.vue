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

    <v-layout
      id="masthead"
      align-center
      class="text-no-wrap text-center mt-4"
    >
      <v-flex
        v-if="getFullScreen"
        xl6
        lg6
        md8
        sm6
        ma-auto
        class="d-flex align-center mt-5"
        v-cloak
      >
        <v-card
          flat
          class="text-center "
          id="logo"
        >
          <v-flex
            lg5
            md8
            sm12
            xs3
            ma-auto
            class="d-flex align-center"
          >
            <a
              href="https://teacheip.com/"
              rel="home"
            >
              <v-img
                
                alt="Direccion de Lenguas Extranjeras"
                src="https://drive.google.com/uc?export=view&id=1obnHAN71iuijto0gsL8TIpmPzO6SmXVF"
                lazy-src="https://drive.google.com/uc?export=view&id=1obnHAN71iuijto0gsL8TIpmPzO6SmXVF"
                aspect-ratio="1"
                id="img-mescyt"
                class="grey lighten-2 mx-auto"
                max-width="180"
                max-height="130"
              />
            </a>
          </v-flex>
          <v-card flat>
            <transition>
              <v-card-title
                xs10
                class=" titles display-2 font-weight-medium  pb-2"
              >
                <a
                  href="https://teacheip.com/"
                  rel="home"
                  class="mx-auto site-title "
                >
                  Direccion de Lenguas
                  Extranjeras
                </a>
                <div class="mx-auto">
                  <v-card-text
                    class="title page-title mb-0 py-1  font-italic font-weight-medium"
                    xl8
                    lg5
                  >
                    An
                    Academic Community for the English Immersion Program
                  </v-card-text>
                </div>
              </v-card-title>
            </transition>
          </v-card>
          <!-- .site-branding-text -->
        </v-card>
        <!-- .site-branding -->
      </v-flex>
      <!-- .header-wrapper -->
      <Menu />       
      <!-- .menu-wrapper -->
    </v-layout>
    <router-view />
    <Footer />
    <Sugerencias v-if="checkIsLoggedIn"/>
  </div>
</template>
<script>
import 'vuetify/dist/vuetify.min.css'
import Menu from '@/components/menu.vue'
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
   Menu, 
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
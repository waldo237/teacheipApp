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
      </v-icon>estás desconectado en este momento

    </v-alert>
    <v-alert
      v-model="online"
      color="green"
      class="connection-on mt-3"
    >
      <v-icon class="mr-2">
        check_circle_outline
      </v-icon>Estás de vuelta en línea!
    </v-alert>
    <!-- alerts online/offline ends-->

    <!-- feeds start -->
    <feeds />
    <!-- feeds end -->
    <!-- IM starts -->
    <IM
      v-if="IMComponent"
      :i-m="IM"
      :participant="participant"
      @openIM="IM=true"
      @closeIM="IM=false"
    />
    <!-- IM ends -->
    <NavBar />
    <router-view />
    <Footer />

    <Sugerencias v-if="checkIsLoggedIn" />
  </div>
</template>
<script>
import "vuetify/dist/vuetify.min.css";
import NavBar from "@/components/navigationBar/navBar.vue";
import { mapGetters } from "vuex";
import Footer from "@/components/footer.vue";
import Sugerencias from "@/views/services/sugerencias.vue";
import IM from "@/components/utilities/IM.vue";

import feeds from "@/components/feeds.vue";
export default {
  name: "SiteHeade",
    components: {
      NavBar,
      Footer,
      Sugerencias,
      IM,
      feeds
    },
  data() {
    return {
      log: false,
      online: false,
      timeOut: {},
      IM: false,
      IMComponent: false,
      participant: {},
    };
  },
  methods: {
    init() {
      const updateOnlineStatus = async event => {
        this.log = navigator.online ? false : true;
        if (navigator.onLine) {
          this.log = false;
          this.online = true;
          this.timeOut = setTimeout(async () => {
            this.online = false;
          }, 3000);
        }
      };
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);
    }
  },
  computed: mapGetters([ "checkIsLoggedIn"]),
  async created() {
    this.$root.$on('createRoom', (receivedParticipant)=>{
      this.participant = receivedParticipant;
      this.IMComponent = true;
      this.IM = true;
    })
    this.init();
  },
  beforeDestroy() {
    clearInterval(this.timeOut);
  }
};
</script>
<style>
[v-cloak] {
  display: none !important;
}

@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import url("https://fonts.googleapis.com/css?family=Karla&display=swap");
@import url("https://fonts.googleapis.com/css?family=Oswald&display=swap");

html,
body {
  font-family: "Karla", sans-serif;
}

#app {
  font-family: "Karla", sans-serif;
}
.v-card-title {
  font-family: "Oswald", sans-serif;
}

@media screen and (max-width: 960px) {
  .font-95{
    font-size: 95% !important;
  }
 
}
@media screen and (max-width: 700px) {
  .font-95{
    font-size: 95% !important;
  }
  .dashboard-component{
    max-width: 360px !important;
  }

}



a {
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

<template>
  <div>
    <!-- alerts online/offline -->
    <v-alert dense v-model="offline" class="connection-off sign-up mt-3">
      <v-icon class="mr-2"> signal_wifi_off </v-icon>estás desconectado en este
      momento
    </v-alert>
    <v-alert v-model="online" color="green" class="connection-on mt-3">
      <v-icon class="mr-2"> check_circle_outline </v-icon>Estás de vuelta en
      línea!
    </v-alert>
    <!-- alerts online/offline ends-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      offline: false,
      online: false,
      timeOut: {},
    }
  },
  methods:{
    listenToConnectionChange() {
      const updateOnlineStatus = async event => {
        this.offline = navigator.online ? false : true;
        if (navigator.onLine) {
          this.offline = false;
          this.online = true;
          this.timeOut = setTimeout(async () => {
            this.online = false;
          }, 3000);
        }
      };
      window.addEventListener("online", updateOnlineStatus);
      window.addEventListener("offline", updateOnlineStatus);
    },
  },
  created() {
    //  displays a message if offline
    this.listenToConnectionChange();
  },
      beforeDestroy() {
    clearInterval(this.timeOut);
  },
};
</script>
<style>
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
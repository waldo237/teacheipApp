<template>
  <v-layout column v-if="!closeIM" :class="(IM)?'chat my-0 py-0 elevation-15':''">
    <!-- IM ROOM STARTS -->
    <transition></transition>
    <v-card dark v-if="IM" class>
      <v-card class="grey darken-4">
        <v-card-title class="my-0 py-1">
          <v-layout row justify-space-between align-center>
            <v-avatar size="40" color="red" class="mx-2">
              <img :src="participant.photoURL" alt="alt" />
            </v-avatar>
            {{ participant.firstName }}
            <v-layout row justify-end align-center>
              <v-btn round icon small class="mx-1 pa-0" @click="$emit('minimizeIM')">
                <v-icon small>minimize</v-icon>
              </v-btn>
              <v-btn round icon small class="ma-0 pa-0" @click="$emit('closeIM')">
                <v-icon small>close</v-icon>
              </v-btn>
            </v-layout>
          </v-layout>
        </v-card-title>
      </v-card>
      <v-card max-height="260px" class="scrollbar chatCard grey" v-if="IM">
        <v-card-text class="scrollbar">
          <span>este dialogo comenzo el {{ fecha() }}</span>
          <v-layout row justify-start align-center>
            <v-card class="mr-3 my-2 sent" light>
              Me interesa enviar mensajes a {{ participant.firstName }}
              <br />
              <span class="caption timestamp mr-1">{{ time() }}</span>
            </v-card>
            <v-avatar size="30" color="red">
              <img :src="auth().currentUser.photoURL" alt="alt" />
            </v-avatar>
          </v-layout>
          <v-layout row justify-end align-center>
            <v-avatar size="30" color="red">
              <img :src="participant.photoURL" alt="alt" />
            </v-avatar>
            <v-card class="ml-3 my-2 received" light>
              Este servicio estara disponible pronto, {{ auth().currentUser.displayName }}
              <span
                class="caption timestamp mr-1"
                flat
              >{{ time() }}</span>
            </v-card>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-card class="px-2 grey darken-4">
        <v-text-field label="escribe mensaje" name="name" />
      </v-card>
    </v-card>
    <!-- IM ROOM ENDS -->
    <v-card class="btn grey darken-4">
      <v-btn v-if="!IM" x-large dark flat @click="$emit('openIM')">
        <v-avatar size="40" color="red" class="mx-2">
          <img :src="participant.photoURL" alt="alt" />
        </v-avatar>
        {{ participant.firstName }} {{ participant.lastName }}
      </v-btn>
    </v-card>
  </v-layout>
</template>

<script>
import moment from "moment";
// import socket from "socket.io-client";

export default {
  props: ["IM", "participant", "closeIM"],
  data() {
    return {
      auth: this.$store.getters.auth
    };
  },
  // sockets: {
  //   connect() {
  //     // Fired when the socket connects.
  //     console.log('connets')
  //   },

  //   disconnect() {
  //      console.log('disconnets')
  //   }
  // },
  methods: {
    fecha() {
      return moment(new Date())
        .locale("es")
        .format("DD-MM-YYYY");
    },
    time() {
      return moment().format("hh:mm a");
    },
    // pingServer() {
    //   const io = socket.connect("http://localhost:3001");
    //   io.on("news", function(data) {
    //     console.log(data);
    //     io.emit("my other event", { my: "data" });
    //   });
    // }
  },
  created() {
    // this.pingServer();
  }
};
</script>

<style >
.chat {
  width: 300px;
  max-height: 370px;
  z-index: 2;
  position: fixed;
  bottom: 1px;
  right: 2px;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: slideInUp;
  animation-timing-function: ease-in-out;
  display: block;
}
.btn {
  z-index: 1;
  position: fixed;
  bottom: 0px;
  right: 170px;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: slideInUp;
  animation-timing-function: ease-in-out;
  display: block;
}
.chatCard {
  overflow-y: scroll;
  overflow-x: hidden;
  text-overflow: clip;
  border: 1px solid black !important;
}

.scrollbar::-webkit-scrollbar {
  width: 0.7em;
}

.scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #376092;
  border-radius: 25px;
}

.sent {
  width: 210px;
  min-height: 50px;
  background: lightgreen !important;
  position: relative;
  border-radius: 10px;
  -moz-boder-radius: 10px;
  -webkit-border-radius: 10px;
}
.sent:after {
  content: "";
  z-index: 1;
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 15px solid lightgreen;
  border-right: 20px solid transparent;
  left: 100%;
  top: 10px;
}

.received {
  width: 210px;
  min-height: 50px;
  background: white !important;
  position: relative;
  border-radius: 10px;
  -moz-boder-radius: 10px;
  -webkit-border-radius: 10px;
}
.received:after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 15px solid white;
  border-left: 20px solid transparent;
  right: 100%;
  top: 10px;
}
.timestamp {
  position: absolute;
  bottom: 1px;
  right: 1px;
}
</style>
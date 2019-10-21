<template>
  <v-layout>
    <v-dialog
      v-model="getSUDialog"
      persistent
      max-width="465px"
      min-width="465px"
      lass="round"
    >
      <v-form>
        <v-card
          width="465px"
          height="250px"
          color="#135393"
          min-width="465px"
          class="round"
        >
          <v-layout align-content-start>
            <v-toolbar
              dense
              class="elevation-24 round"
            >
              <v-toolbar-title class="logo">
                <v-icon>lock_open</v-icon>
                <span class="teach">Teach</span>
                <span class="acronym">EIP</span>
              </v-toolbar-title>
              <v-spacer />
              <v-btn
                icon
                @click.prevent="toggleSU"
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
          </v-layout>
          <v-layout
            class="pt-4 px-1"
            align-center
          >
            <v-btn
              @click.prevent="google"
              class="font-weight-bold elevation-24 round"
              :loading="loading"
            >
              <img
                src="https://www.solarwinds.com/-/media/solarwinds/swdcv2/licensed-products/service-desk/integrations/sd-integrations-logo-google-single-sign-on.ashx?la=en&rev=aab01f816f1c4af5b415d614081150ee&hash=80ED17DEB435A7EFFC9C29101FBC92C5B05FD5D2"
                width="25px"
                class="mr-2"
                alt
              >sign up with google
            </v-btn>
            <v-btn
              @click.prevent="facebook"
              class="pa-0 px-2 font-weight-bold elevation-24 round"
              disabled
            >
              <img
                src="https://image.flaticon.com/icons/png/512/124/124010.png"
                width="27px"
                class="mr-2 elevation-10"
                alt
              >
              sign up with Faceboook
            </v-btn>
          </v-layout>
          <v-layout
            class="pt-4 px-1"
            align-end
            wrap
          >
            <v-btn
              @click.prevent="microsoft"
              class="font-weight-bold elevation-24 round"
              disabled
            >
              <img
                src="https://icon-library.net/images/microsoft-logo-icon/microsoft-logo-icon-17.jpg"
                width="25px"
                class="mr-2"
                alt
              >Continue with Microsoft
            </v-btn>
          </v-layout>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>
<style>
.round {
  border-radius: 5px !important;
}
</style>

<script>
import Policy from "@/components/Useterms.vue";
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";

import { async } from "q";

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    Policy
  },
  data: () => ({
    positions: [
      { text: "Teacher", value: "teacher" },
      { text: "Coordinator", value: "coordinator" },
      { text: "Supervisor", value: "supervisor" },
      { text: "Manager", value: "manager" }
    ],
    profile: {},
    policy: false,
    position: false,
    name: "",
    loading: false,
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      }
    }
  }),
  methods: {
    async microsoft() {
      this.auth()
        .signInWithPopup(this.providerMicrosoft)
        .then(function(result) {
          const token = result.credential.accessToken;
          const user = result.user;
        })
        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
        });
      await this.$store.commit("setLanding", true);
      await this.$router.push(`/landing/`);
      await this.toggleSU();
    },
    async facebook() {
      this.auth()
        .signInWithPopup(this.FacebookAuthProvider)
        .then(result => {
          const token = result.credential.accessToken;
          const user = result.user;
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
        });
    },
    async google() {
      await 
        this.auth()
        .signInWithPopup(this.GoogleAuthProvider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          this.loading = true;
    
        })
        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
        });
     if(this.validated.authenticated){
       await this.$router.push(`/coordinatorDashboard/`);
     }
     else{ await this.$store.commit("setLanding", true);
      await this.$router.push(`/landing/`);
      }
      await this.toggleSU();
    },
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    ...mapActions(["toggleSU", "runAlert", "fetchAllUsers", "validateToken"])
  },
  created(){
    this.validateToken();
  },
  computed: mapGetters(["getSUDialog", "firebase", "auth", "GoogleAuthProvider", "providerMicrosoft","validated"])
};
</script>



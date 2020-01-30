<template>
  <v-layout>
    <v-dialog v-model="getSUDialog" persistent class="round px-5">
      <v-form class>
        <v-card class="round">
          <v-layout justify-center>
            <v-toolbar dense class="round" flat color="white">
              <v-toolbar-title class="logo">
                <v-icon>lock_open</v-icon>
                <span class="teach">Teach</span>
                <span class="acronym">EIP</span>
              </v-toolbar-title>
              <v-spacer />
              <v-btn icon @click.prevent="toggleSU">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
          </v-layout>
          <v-layout class="py-4 px-5" column justify-center wrap>
    
              <v-btn
                @click.prevent="google"
                round
                large
                block
                class=" pa-2 ma-2 elevation-10 white--text"
                color="#de4c33"
                :loading="loading"
              >
                <v-icon size="30" class="mx-2">fab fa-google</v-icon>sign up
                with google
              </v-btn>
              <v-btn
                @click.prevent="facebook"
                round
                large
                block
                color="#415dae"
                class=" pa-2 ma-2 elevation-10 white--text"
              >
                <v-icon size="30" class="mx-2">fab fa-facebook-square</v-icon
                >sign up with Faceboook
              </v-btn>
              <v-btn
                @click.prevent="microsoft"
                round
                large
                block
                color="#36af5b"
                class=" pa-2 ma-2 elevation-10"
              >
                <v-icon size="30" class="mx-2">fab fa-windows</v-icon>Continue
                with Microsoft
              </v-btn>
          </v-layout>
        </v-card>
      </v-form>
    </v-dialog>
    <LoadingFull  />
  </v-layout>
</template>
<style>
.round {
  border-radius: 10px !important;
}
</style>

<script>
import Policy from "@/components/Useterms.vue";
import LoadingFull from "@/components/loadingFull.vue";
import { mapGetters, mapActions } from "vuex";
import { fetchRole } from "@/store/modules/session.js";
import Vue from "vue";

import { async } from "q";

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    Policy,
    LoadingFull
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
    async signInWithPopup(result) {
      try {
        this.toggleSU();
        await this.validateToken();
        if (this.validated.authenticated) {
          if (this.auth().currentUser) this.$store.commit("setLoggedIn", true);
          this.$store.commit('setLoadingFull', false);
          await this.$router.push(`/${fetchRole()}Dashboard`);
        } else {
          this.$store.commit('setLoadingFull', false);
          await this.$store.commit("setLanding", true);
          await this.$router.push(`/landing/`);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    googleImg() {
      return "https://drive.google.com/uc?export=view&id=19gqsAvafJBgOeXJn4pqooOTuGWpwponA";
    },
    facebookImg() {
      return "https://drive.google.com/uc?export=view&id=1Mf_ItAgwI2lI34L9cNZpEOqMrmJ4qsJ-";
    },
    microsoftImg() {
      return "https://drive.google.com/uc?export=view&id=1Okh6YMoL8jfAcXXFj8ybedJGv-mdHGTE";
    },
    microsoft() {
      this.$store.commit('setLoadingFull', true);
      this.auth()
        .signInWithPopup(this.providerMicrosoft)
        .then(this.signInWithPopup)
        .catch(function(error) {
          /* console.log(`there was an error: ${error}`)*/
        });
    },
    facebook() {
      this.$store.commit('setLoadingFull', true);
      this.auth()
        .signInWithPopup(this.FacebookAuthProvider)
        .then(this.signInWithPopup)
        .catch(function(error) {
          /* console.log(`there was an error: ${error}`)*/
        });
    },
    google() {
      this.$store.commit('setLoadingFull', true);
      this.auth()
        .signInWithPopup(this.GoogleAuthProvider)
        .then(this.signInWithPopup)
        .catch(function(error) {
          /* console.log(`there was an error: ${error}`)*/
        });
    },
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    ...mapActions(["toggleSU", "runAlert", "fetchAllUsers", "validateToken"])
  },
  async created() {},
  computed: mapGetters([
    "getSUDialog",
    "firebase",
    "auth",
    "GoogleAuthProvider",
    "FacebookAuthProvider",
    "providerMicrosoft",
    "validated",
    "loadingFull"
  ])
};
</script>

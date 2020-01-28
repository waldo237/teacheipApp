<template>
  <v-layout>
    <v-dialog max-width="465px" v-model="getSUDialog" persistent class="round">
      <v-form>
        <v-card max-width="465px" color="#135393" class="round">
          <v-layout justify-center>
            <v-toolbar dense class="elevation-24 ">
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
          <v-layout class="pt-4 px-1" justify-center wrap>
            <v-btn
              @click.prevent="google"
              round
              class="font-weight-bold elevation-24"
              :loading="loading"
            >
              <img
                :src="googleImg()"
                width="25px"
                class="mr-2"
                alt
              />sign up with google
            </v-btn>
            <v-btn
              @click.prevent="facebook"
              round
              class="pa-0 px-2 font-weight-bold elevation-24"
            >
              <img
                :src="facebookImg()"
                width="27px"
                class="mr-2 elevation-10"
                alt
              />
              sign up with Faceboook
            </v-btn>
          </v-layout>
          <v-layout class="pt-4 px-1" justify-center wrap>
            <v-btn
              @click.prevent="microsoft"
              class="font-weight-bold elevation-24 "
              round
            >
              <img
                :src="microsoftImg()"
                width="25px"
                class="mr-2"
                alt
              />Continue with Microsoft
            </v-btn>
          </v-layout>
        </v-card>
      </v-form>
    </v-dialog>
        <LoadingFull/>

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
import {fetchRole} from "@/store/modules/session.js";
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
          await this.$router.push(`/${fetchRole()}Dashboard`);
        } else {
          await this.$store.commit("setLanding", true);
          await this.$router.push(`/landing/`);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
     googleImg(){
      return "https://drive.google.com/uc?export=view&id=19gqsAvafJBgOeXJn4pqooOTuGWpwponA"
    },
     facebookImg(){
      return "https://drive.google.com/uc?export=view&id=1Mf_ItAgwI2lI34L9cNZpEOqMrmJ4qsJ-"
    },
     microsoftImg(){
      return "https://drive.google.com/uc?export=view&id=1Okh6YMoL8jfAcXXFj8ybedJGv-mdHGTE"
    },
    microsoft() {
       this.auth()
        .signInWithPopup(this.providerMicrosoft)
        .then(this.signInWithPopup)
        .catch(function(error) {/* console.log(`there was an error: ${error}`)*/});
    },
    facebook() {
       this.auth()
       .signInWithPopup(this.FacebookAuthProvider)
        .then(this.signInWithPopup)
        .catch(function(error) {/* console.log(`there was an error: ${error}`)*/});
    },
    google() {
      this.auth()
        .signInWithPopup(this.GoogleAuthProvider)
        .then(this.signInWithPopup)
        .catch(function(error) {/* console.log(`there was an error: ${error}`)*/});
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
    "validated"
  ])
};
</script>

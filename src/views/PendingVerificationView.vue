<template>
  <!-- pendingForVerification dialog starts -->
  <v-dialog v-model="dialog" fullscreen persistent  hide-overlay>
    <v-layout justify-center>
      <v-card min-width="100%" min-height="100%" class="pb-5 mb-5">
        <v-toolbar color="white elevation-24">
          <v-layout justify-start>
            <v-toolbar-title class="hidden-sm-and-down">Waiting for email Verification</v-toolbar-title>
          </v-layout>
          <v-layout justify-center class="pr-5 mr-5">
            <span class="teach display-1">Teach</span>
            <span class="acronym display-1 mr-5 pr-5">EIP</span>
          </v-layout>
          <v-spacer></v-spacer>
          <span class="acronym"></span>
        </v-toolbar>
        <v-layout justify-center class="ml-5">
          <v-img
            alt="Oh man! more waiting?"
            src="https://media0.giphy.com/media/26DNhSJnqWFdgPgMo/source.gif"
            lazy-src="https://media0.giphy.com/media/26DNhSJnqWFdgPgMo/source.gif"
            aspect-ratio="1"
            max-width="400"
            max-height="400"
          ></v-img>
        </v-layout>

        <v-layout class="pt-0" justify-center>
          <v-list-tile
            class="title"
            justify-center
          >We have sent an email to the provided email address, please go to your inbox and click on its link to continue!</v-list-tile>
        </v-layout>

        <v-layout class="pt-1" justify-center>
          <v-list-tile-action>
            <v-btn
              block
              class="sign-up mx-5 px-5 elevation-24"
              :disabled="disabled"
              @click="swap()"
            >Continue</v-btn>
          </v-list-tile-action>
        </v-layout>
      </v-card>
    </v-layout>
  </v-dialog>
  <!-- pendingForVerification dialog ends -->
</template>
<style scoped>
</style>
 
<script>
import {auth} from "firebase/app";
import { mapGetters, mapMutations } from "vuex";
import { setTimeout, setInterval } from "timers";
import { async } from "q";
export default {
  name: "editor",
  data() {
    return {
      dialog: true,
      disabled: true,
      isDone: false,
    };
  },
  methods: {
    async swap() {
      await this.$router.push(`/dashboard/`);
      this.dialog = false;
       this.isDone= true;
      location.reload();
    }
  },
  created() {
    if (!this.isDone) {
      setInterval(async ()=>{
        await auth().currentUser.reload();
        if (auth().currentUser.emailVerified) {
          this.disabled = false;
        }
      }, 1000);
    }
  },
};
</script>
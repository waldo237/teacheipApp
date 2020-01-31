<template>
  <v-dialog
    id="alerting"
    v-model="isAlert"
    persistent
    width="380px"
  >
    <v-card class="elevation-12 round ">
      <v-toolbar
        dense
        flat
        color="white"
      >
        <v-layout
          row
          justify-space-between
          align-center
        >
          <div>
            <span class="teach title">Teach</span>
            <span class="acronym title">EIP</span>
          </div>
          <v-btn
            round
            icon
            @click="toggleAlert"
            class="ma-0 pa-0"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-layout>
      </v-toolbar>
      <v-layout justify-center>
        <v-card-title class="title font-weight-bold mt-5 v-card-title">
          {{ getAlertMessage }}
        </v-card-title>
      </v-layout>
      <v-layout
        row
        justify-center
        class="pa-5"
        wrap
      >
        <v-btn
          round
          class="sign-up"
          @click.prevent="toggleAlert"
        >
          Close
        </v-btn>
        <v-btn
          round
          class="blue-grey lighten-2"
          @click="toggleAlert"
          v-if="!getInteract"
        >
          Okay
        </v-btn>
        <v-btn
          round
          class="blue-grey lighten-2"
          @click="setYes"
          v-else
        >
          Yes
        </v-btn>
      </v-layout>
    </v-card>
  </v-dialog>
</template>
<style scoped></style>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Alerting",
  methods: {
    ...mapActions(["runAlert", "toggleAlert"]),
    async setYes() {
      await this.auth()
        .signOut()
        .then(async () => {
          await this.$store.commit("setLoggedIn", false);
          await this.$store.commit("setValidated", {});
          await this.$store.commit("setAlert", false);
          if (this.$route.path != "/") await this.$router.push("/");
        })
        .catch(error => {
          console.log(`there was an issue logging out:${error}`);
        });
    }
  },
  computed: mapGetters([
    "isAlert",
    "getParams",
    "getAlertMessage",
    "getAlertType",
    "getInteract",
    "auth"
  ])
};
</script>

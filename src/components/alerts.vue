<template>
  <v-dialog id="alerting" v-model="isAlert" persistent max-width="500px">
    <v-flex>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form>
            <v-card-text>
              <v-icon>{{getAlertType.icon}}</v-icon>
              {{getAlertMessage}}
            </v-card-text>
            <v-btn class="sign-up" @click="toggleAlert">Close</v-btn>
            <v-btn v-bind:class="getAlertType.class" @click="toggleAlert" v-if="!getInteract">Okay</v-btn>
            <v-btn :class="getAlertType.class" @click="setYes" v-else>Yes</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-dialog>
</template>
<style scoped>
</style>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import {firebase,auth} from 'firebase';
export default {
  name: "alerting",
  methods: {
    ...mapActions(["runAlert", "toggleAlert"]),
    async setYes() {
      await auth()
        .signOut()
        .then(async () => {
          await this.$router.push("/");
          await this.$store.commit('setLoggedIn', false)
          await this.$store.commit('setAlert', false)
        });
    }
  },
  computed: mapGetters([
    "isAlert",
    "getParams",
    "getAlertMessage",
    "getAlertType",
    "getInteract"
  ])
};
</script>
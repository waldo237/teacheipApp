<template>
  <v-dialog id="alerting" v-model="isAlert" persistent max-width="500px">
    <v-flex>
      <v-card class="elevation-12">
        <v-card-text>
          <v-form>
            <v-card-text><v-icon>{{getAlertType.icon}}</v-icon>{{getAlertMessage}} </v-card-text>
            <v-btn class="sign-up" @click="setAlert">Close</v-btn>
            <v-btn v-bind:class= getAlertType.class @click="setAlert">Okay</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-dialog>
</template>
<style scoped>
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "alerting",
  methods: {
    ...mapActions(["runAlert", "setAlert"])
  },
  computed: mapGetters(["isAlert", "getParams", "getAlertMessage",'getAlertType']),
};
</script>
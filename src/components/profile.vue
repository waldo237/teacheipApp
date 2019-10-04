// this component will manage all operations that are related to profile
<template>
  <v-list class="tile" v-if="checkIsLoggedIn">
    <!-- photo display starts -->
    <v-avatar v-if="getCurrentUser.photoURL">
      <img :src="getCurrentUser.photoURL" :alt="getCurrentUser.displayName" />
    </v-avatar>
    <v-avatar  :color="colorize" v-else>
      <span class="white--text headline">{{ initialize}}</span>
    </v-avatar>
    <!-- photo display ends -->
    <v-list-tile-title class="title mx-5 px-1">{{ getCurrentUser.displayName }}</v-list-tile-title>
    <v-list-tile-sub-title class="email">{{ getCurrentUser.email }}</v-list-tile-sub-title>
    <v-card-actions class="justify-center">
      <!-- editor dialog starts -->
      <editor />
      <!-- editor dialog ends -->
    </v-card-actions>
    <v-card-actions class="justify-center">
      <v-btn tag="v-btn" class="sign-up" @click="logout">
        Log out
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-card-actions>
  </v-list>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import editor from "../views/ProfileEditorView.vue";
import { auth } from "firebase/app";
import colors from "@/assets/colors/colors.js";

export default {
  components: { editor },
  methods: {
    showAlert(message, icon, classy, interact) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
      this.$store.commit("setInteract", interact);
    },
    async logout() {
      await this.showAlert(
        " Are you sure you want to log out?",
        "help_outline",
        "warning orange",
        true
      );
    },
    ...mapActions(["runAlert"]),
    toggleEditProfile() {
      this.$store.commit("setEditProfile", !this.editProfile);
    }
  },
  computed: {
    initialize: function() {
     return this.getCurrentUser.displayName.split(" ").map((n)=>n[0]).join("").toUpperCase()
    },
    colorize: function() {
      return colors[Math.floor(Math.random() * 280)];
    },
    ...mapGetters(["checkIsLoggedIn", "getUsers", "getCurrentUser", "getYes"]),
    ...mapState(["editProfile"])
  },
  created: function() {}
};
</script>
<style scoped>
.tile {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.281),
    0 12px 30px 0 rgba(0, 0, 0, 0.281);
}
</style>

// this component will manage all operations that are related to profile
<template>
  <v-list class="tile" v-if="checkIsLoggedIn">
    <!-- photo display starts -->
      <v-avatar v-if="getCurrentUser.photoURL!== 'https://generic.jpg'">
                <img :src="getCurrentUser.photoURL"
              :alt="getCurrentUser.displayName" />
            </v-avatar>    
              <v-avatar color="red" v-else>
              <span class="white--text headline">{{getCurrentUser.displayName.split(" ").map((n)=>n[0]).join("").toUpperCase()}}</span>

            </v-avatar> 
    <!-- photo display ends -->
    <v-list-tile-title class="title mx-5 px-1">{{getCurrentUser.displayName}}</v-list-tile-title>
    <v-list-tile-sub-title class="email">{{getCurrentUser.email}}</v-list-tile-sub-title>
      <v-card-actions class="justify-center">
       <!-- editor dialog starts -->
          <editor/>
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
import {firebase, auth} from "firebase/app";
export default {
  components: {editor},
  methods: {
    showAlert(message, icon, classy, interact) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
      this.$store.commit('setInteract', interact);
    },
    async logout() {
      await this.showAlert(
        " Are you sure you want to log out?",
        "help_outline",
        "warning",
        true
      );
      
    },
    ...mapActions([ "runAlert"]),
            toggleEditProfile(){
            this.$store.commit('setEditProfile', !this.editProfile)
        }
  },
  computed: mapGetters(["checkIsLoggedIn", "getUsers", "getCurrentUser", "getYes"]), ...mapState(['editProfile']),
  created: function() {

  }
};
</script>
<style scoped>
.tile{
  box-shadow:0 8px 16px 0 rgba(0,0,0,0.281), 0 12px 30px 0 rgba(0,0,0,0.281);
}
</style>

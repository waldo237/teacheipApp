// this component will manage all operations that are related to profile
<template>
  <v-list class="tile" v-if="checkIsLoggedIn">
    <v-avatar>
      <img
        :src="getCurrentUser.photoURL"
        alt="Waldo"
      />
    </v-avatar>
    <v-list-tile-title class="title text-md-center">{{getCurrentUser.displayName}}</v-list-tile-title>
    <v-list-tile-sub-title class="email">{{getCurrentUser.email}}</v-list-tile-sub-title>
      <v-card-actions class="justify-center">
       
     <editor/>
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
import editor from "../views/updateProfile.vue";
import auth from "firebase";
export default {
  components: {editor},
  methods: {
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    async logout() {
      await this.showAlert(
        "Are you sure you want to log out",
        "help_outline",
        "warning"
      );
      auth
        .auth()
        .signOut()
        .then(async () => {
          this.$router.push("/");
          this.toggleIsLoggedIn();
        });
    },
    ...mapActions(["toggleIsLoggedIn", "runAlert"]),
            toggleEditProfile(){
            this.$store.commit('setEditProfile', !this.editProfile)
        }
  },
  computed: mapGetters(["checkIsLoggedIn", "getUsers", "getCurrentUser"]), ...mapState(['editProfile']),
  created: function() {

  }
};
</script>
<style scoped>
.tile{
  box-shadow:0 8px 16px 0 rgba(0,0,0,0.281), 0 12px 30px 0 rgba(0,0,0,0.281);
}
</style>

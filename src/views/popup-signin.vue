<template>
  <v-dialog v-model="getSIDialog" persistent max-width="500px">
    <v-flex>
      <v-card class="elevation-12">
        <v-toolbar class="sign-in">
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="person"
              name="login"
              label="Login"
              type="text"
              v-model="email"
            ></v-text-field>
            <v-text-field
              autocomplete
              prepend-icon="lock"
              name="password"
              label="Password"
              id="passwordin"
              type="password"
              v-model="password"
            ></v-text-field>
            <v-label for="password">
              <a href="#" class="float-right">Forgot Password?</a>
            </v-label>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="sign-up" @click="toggleSI">Cancel</v-btn>
              <v-btn class="sign-in" @click="register">Login</v-btn>
            </v-card-actions>
          </v-form>
          <v-divider></v-divider>
          <v-layout justify-center style="font-size:70%">
            <div>Or sign in with</div>
          </v-layout>
          <v-layout justify-center>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-dialog>
</template>
<style scoped>
.g-signin2 {
  margin: 0 auto;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import auth from "firebase";

export default {
  data: () => {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["toggleSI", "toggleIsLoggedIn", "runAlert",'setAlertMessage','setAlert']),
    showAlert(message, icon, classy){
      this.$store.commit('setAlertType',{icon: icon, class: classy})
            this.runAlert(message);
    },
    register(e) {
      auth
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          async user => {
            await  this.showAlert(`Successful logged in ${this.email}`, 'info', 'info');
            await this.toggleIsLoggedIn();
            await this.toggleSI();
             this.$router.push(`/dashboard/${auth.auth().currentUser.uid}`);
            this.$store.commit("setCurrentUser", auth.auth().currentUser);
            setTimeout(()=>{ this.$store.commit('setAlert', false) }, 2000);
          },
          async err => {
            // -------------------------------------------------------
            this.showAlert(err.message, 'warning', 'warning')
          }
        ),
        e.preventDefault();
    }
  },
  computed: mapGetters(["getSIDialog", "getParams", "isAlert"])
};
</script>
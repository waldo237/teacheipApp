<template>
  <v-dialog v-model="getSIDialog"  persistent max-width="500px" @keydown.enter="signIn">
    <v-flex>
      <v-card class="elevation-12 m-1 p-2">
        <v-layout align-content-start>
        <v-toolbar dense>
          <v-spacer></v-spacer>
          <v-toolbar-title class="logo"> <v-icon>lock_open</v-icon>  <span class="teach">Teach</span>
        <span class="acronym">EIP</span></v-toolbar-title>
        </v-toolbar>
        </v-layout>
        <v-card-text>
          <v-form>
            <div class="pl-5">
          <v-card-text class="text-center pl-5 text-uppercase font-weight-bold pa-1 grey--text">
            Sign in to do operations
          </v-card-text>

            </div>
            <v-text-field
              clearable
              prepend-icon="person"
              name="login"
              label="Login"
              type="text"
              v-model="email"
            ></v-text-field>
            <v-text-field
              autocomplete
              prepend-icon="lock"
              :append-icon="!showPassword ? 'visibility_off':'visibility'"
              name="password"
              label="Password"
              id="passwordin"
              :type="showPassword ? 'text': 'password'"
              v-model="password"
              @click:append="showPassword =!showPassword"
            ></v-text-field>
            <v-label for="password" >
              <a href="#" class="float-right " >Forgot Password?</a>
            </v-label>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="sign-up elevation-20" @click="toggleSI"  >Cancel</v-btn>
              <v-btn class="sign-in elevation-20" @click="signIn" :loading="loading">Login</v-btn>
            </v-card-actions>
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
import auth from "firebase";

export default {
  data: () => {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false
    };
  },
  methods: {
    ...mapActions(["toggleSI", "toggleIsLoggedIn", "runAlert",'setAlertMessage','setAlert']),
    showAlert(message, icon, classy){
      this.$store.commit('setAlertType',{icon: icon, class: classy})
            this.runAlert(message);
    },
async    signIn(e) {
      this.loading = await true;    
      auth
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          async () => {
            await  this.showAlert(`Successfully logged in ${this.email}`, 'info', 'info');
            await this.toggleIsLoggedIn();
            await this.$store.commit('setSIDialog', false)
             this.$router.push(`/dashboard/`);
            this.$store.commit("setCurrentUser", auth.auth().currentUser);
            this.loading = await false;    

            setTimeout(()=>{ this.$store.commit('setAlert', false) }, 1000);
          },
          async err => {
            // -------------------------------------------------------
            this.loading = await false;  
            this.showAlert(err.message, 'warning', 'warning')
          }
        ),
        e.preventDefault();
    }
  },
  computed: mapGetters(["getSIDialog"]),

};
</script>
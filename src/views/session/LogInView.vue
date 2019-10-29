<template>
  <v-dialog
    v-model="getSIDialog"
    persistent
    max-width="500px"
    @keydown.enter="signIn"
  >
    <v-flex>
      <v-card class="elevation-12 m-1 p-2">
        <v-layout align-content-start>
          <v-toolbar dense>
            <v-spacer />
            <v-toolbar-title class="logo">
              <v-icon>lock_open</v-icon>  <span class="teach">Teach</span>
              <span class="acronym">EIP</span>
            </v-toolbar-title>
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
              label="Email"
              type="text"
              v-model="email"
            />
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
            />
            <v-label for="password">
              <a
                href="#"
                class="float-right "
              >Forgot Password?</a>
            </v-label>
            <v-card-actions>
              <v-spacer />
              <v-btn
                class="sign-up elevation-20"
                @click.prevent="toggleSI"
              >
                Cancel
              </v-btn>
              <v-btn
                class="sign-in elevation-20"
                @click="signIn"
                :loading="loading"
              >
                Login
              </v-btn>
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
    ...mapActions(["toggleSI",  "runAlert",'setAlertMessage','setAlert']),
    showAlert(message, icon, classy){
      this.$store.commit('setAlertType',{icon: icon, class: classy})
            this.runAlert(message);
    },
async    signIn(e) {
      this.loading = await true;    
      this.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          async () => {
            await  this.showAlert(`Successfully logged in ${this.email}`, 'info', 'info sign-in');

            await this.$store.commit('setSIDialog', false)
             this.$router.push(`/dashboard/`);
            this.loading = await false;    

            setTimeout(()=>{ this.$store.commit('setAlert', false) }, 4000);
          },
          async err => {
            // -------------------------------------------------------
            this.loading = await false;  
            this.showAlert(err.message, 'warning', 'warning orange')
          }
        ),
        e.preventDefault();
    }
  },
  computed: mapGetters(["getSIDialog", "auth"]),

};
</script>
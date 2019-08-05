<template>
  <v-layout row justify-center>
    <v-dialog v-model="getSUDialog" persistent max-width="500px">
      <v-form>
        <v-card>
          <v-toolbar class="sign-up elevation-10" dense>
            <span class="headline">
              <v-icon class="mr-3">new_releases</v-icon>New profile
            </span>
          </v-toolbar>
          <v-card-text class="px-4">
            <v-text-field
              prepend-icon="person"
              v-model="name"
              v-validate="'required|max:20'"
              :counter="20"
              :error-messages="errors.collect('name')"
              label="Name"
              data-vv-name="name"
              required
            ></v-text-field>
            <v-text-field
              prepend-icon="email"
              v-model="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              label="E-mail"
              data-vv-name="email"
              required
            ></v-text-field>
            <v-text-field
              autocomplete
              prepend-icon="lock"
              name="password"
              label="Password"
              id="password"
              v-model="password"
              :type="showPassword ? 'text': 'password' "
              :append-icon="showPassword ? 'visibility': 'visibility_off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              autocomplete
              prepend-icon="lock"
              name="repeat"
              label="Repeat Password"
              id="repeat"
              v-model="repeat"
              :type="showRepeat ? 'text': 'password' "
              :append-icon="showRepeat ? 'visibility': 'visibility_off'"
              @click:append="showRepeat = !showRepeat"
            ></v-text-field>
            <v-flex xs>
              <v-select
                :items="positions"
                text="text"
                value="value"
                label="Position"

                return-object
              ></v-select>
            </v-flex>

            <v-layout row wrap class="policy">
              <v-flex sm1>
                <v-checkbox
                  class="checkbox ma-0 pa-0"
                  v-model="checkbox"
                  v-validate="'required'" :error-messages="errors.collect('checkbox')"
                  value="1"
                  data-vv-name="checkbox"
                  type="checkbox"
                  required
                ></v-checkbox>
              </v-flex>
              <a href="/" class="policy ma-0 pa-0">I have read and agree to your policy</a>
              <v-card-actions class="ml-5">
                <v-flex xl12>
                  <v-btn class="sign-up elevation-12 mx-2" flat @click="toggleSU">Close</v-btn>
                  <v-btn class="elevation-12 mx-2" @click="clear">clear</v-btn>
                  <v-btn class="sign-in elevation-12 mx-3" @click="submit">submit</v-btn>
                </v-flex>
              </v-card-actions>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>
<style scoped>
.policy {
  font-size: 80%;
  margin: 0px;
  padding: 0px;
  color: blue !important;
  margin-left: 2%;
}
.checkbox {
  margin: 0px;
  padding: 0px;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
import auth from "firebase";

export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    positions: [
      { text: "Teacher", value: "teacher" },
      { text: "Coordinator", value: "coordinator" },
      { text: "Supervisor", value: "supervisor" }
    ],
    position: false,
    name: "",
    email: "",
    password: "",
    repeat: "",
    select: "",
    checkbox: null,
    showPassword: false,
    showRepeat: false,
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
        },
        select: {
          required: "Select field is required"
        }
      }
    }
  }),
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  methods: {
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    async submit(e) {
      e.preventDefault();
      let passed = await this.$validator.validateAll();
      if (passed) {
        auth
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            async () => {
              await this.showAlert(
                "Congratulations! Your account was created successfully. We have sent an email to activate account",
                "done",
                "success"
              );
              await auth.auth().currentUser.sendEmailVerification();
              await this.toggleIsLoggedIn();
              await auth
                .auth()
                .currentUser.updateProfile({ displayName: this.name });
              await this.toggleSU();
              // redirect with curresponding id
              this.$router.push(`/dashboard/`);
              // update name

              await this.$store.commit(
                "setCurrentUser",
                auth.auth().currentUser
              );
              setTimeout(() => {
                this.$store.commit("setAlert", false);
              }, 3000);
            },
            async err => {
              this.showAlert(err.message, "warning", "warning");
            }
          );
      }
    },
    signWithGoogle() {
      // var provider = new auth.auth.GoogleAuthProvider();
      // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      // auth
      //   .auth()
      //   .signInWithPopup(provider)
      //   .then(function(result) {
      //     // This gives you a Google Access Token. You can use it to access the Google API.
      //     var token = result.credential.accessToken;
      //     // The signed-in user info.
      //     var user = result.user;
      //     // ...
      //   })
      //   .catch(function(error) {
      //     // Handle Errors here.
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     // The email of the user's account used.
      //     var email = error.email;
      //     // The firebase.auth.AuthCredential type that was used.
      //     var credential = error.credential;
      //     // ...
      //   });
    },
    clear() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.repeat = "";
      this.checkbox = null;
      this.position = "";
      this.$validator.reset();
    },
    ...mapActions(["toggleSU", "toggleIsLoggedIn", "runAlert"])
  },
  computed: mapGetters(["getSUDialog"])
};
</script>



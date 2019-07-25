<template>
  <v-layout row justify-center>
    <v-dialog v-model="getSUDialog" persistent max-width="600px">
      <v-form>
        <v-card>
          <v-card-title>
            <span class="headline">
              <v-icon>new_releases</v-icon>New profile
            </span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              prepend-icon="person"
              v-model="name"
              v-validate="'required|max:10'"
              :counter="10"
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
              type="password"
              v-model="password"
            ></v-text-field>
            <v-text-field
              autocomplete
              prepend-icon="lock"
              name="repeat"
              label="Repeat Password"
              id="repeat"
              type="password"
              v-model="repeat"
            ></v-text-field>

            <v-layout row wrap class="policy">
              <v-flex sm9 >
                <a href="/" class="policy">I have read and agree to your policy</a>
                <v-checkbox
                class="checkbox"
                  v-model="checkbox"
                  v-validate="'required'"
                  :error-messages="errors.collect('checkbox')"
                  value="1"
                  data-vv-name="checkbox"
                  type="checkbox"
                  required
                ></v-checkbox>

              </v-flex>
            
            </v-layout>
            <v-card-actions>
              <v-divider></v-divider>
              <v-btn class="sign-up" flat @click="toggleSU">Close</v-btn>
              <v-btn @click="clear">clear</v-btn>
              <v-btn @click="submit" class="sign-in">submit</v-btn>
              <v-divider class="mx-4"
     
        horizontal></v-divider>
            </v-card-actions>
           <v-layout row justify-center>
              <v-btn @click="update" ><v-avatar>
                <v-img src="https://i1.wp.com/nanophorm.com/wp-content/uploads/2018/04/google-logo-icon-PNG-Transparent-Background.png?fit=1000%2C1000&ssl=1&w=640"></v-img>
              </v-avatar>sign in with google</v-btn>
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
import { async } from 'q';

export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    repeat: "",
    checkbox: null,
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
        showAlert(message, icon, classy){
      this.$store.commit('setAlertType',{icon: icon, class: classy})
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
            async user => {
              await this.showAlert("Congratulations! Your account was created successfully",'done', 'success')
              await this.toggleIsLoggedIn();
              await this.toggleSU();
              this.$router.push(`/dashboard/${auth.auth().currentUser.uid}`);
              this.$store.commit('setCurrentUser',auth.auth().currentUser)
              setTimeout(()=>{ this.$store.commit('setAlert', false) }, 2000);

            },
           async err => {
               this.showAlert(err.message, 'warning', 'warning')
            }
          )
      }
    },
    update(user) {
      var provider = new auth.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      auth
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    clear() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.repeat = "";
      this.checkbox = null;
      this.$validator.reset();
    },
    ...mapActions(["toggleSU", "toggleIsLoggedIn", 'runAlert'])
  },
  computed: mapGetters(["getSUDialog"])
  
};
</script>



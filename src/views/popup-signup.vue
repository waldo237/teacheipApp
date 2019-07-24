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
              <v-flex sm1 class="checkbox">
                <v-checkbox
                  v-model="checkbox"
                  v-validate="'required'"
                  :error-messages="errors.collect('checkbox')"
                  value="1"
                  data-vv-name="checkbox"
                  type="checkbox"
                  required
                ></v-checkbox>
              </v-flex>
              <v-flex xs5 class="policy" id="linkp">
                <a href="/">I have read and agree to your policy</a>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-divider></v-divider>
              <v-btn class="sign-up" flat @click="toggleSU">Close</v-btn>
              <v-btn @click="clear">clear</v-btn>
              <v-btn @click="submit" class="sign-in">submit</v-btn>
              <v-divider></v-divider>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>
<style scoped>
.policy {
  margin: 0px;
  padding: 0px;
}
.checkbox {
  margin-bottom: 0%;
}
.linkp {
  margin-top: 10%;
  font-size: 60%;
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
    async submit(e) {
      auth
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          async user => {
            alert(`Account created for ${this.email}`);
            await this.$router.push("/dashboard");
            this.toggleSU();
            this.toggleIsLoggedIn();
          },
          err => {
            alert(err.message);
          }
        ),
        e.preventDefault();
      let passed = await this.$validator.validateAll();
      if (passed) {
      }
    },
    clear() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.repeat = "";
      this.checkbox = null;
      this.$validator.reset();
    },
    onSignIn(googleUser) {
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log("Full Name: " + profile.getName());
      console.log("Given Name: " + profile.getGivenName());
      console.log("Family Name: " + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    },
    ...mapActions(["toggleSU", "toggleIsLoggedIn"])
  },
  computed: mapGetters(["getSUDialog"])
};
</script>



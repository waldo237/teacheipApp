<template>
  <v-layout row justify-center>
    <v-dialog v-model="getSUDialog" persistent max-width="500px">
      <v-form>
        <v-card>
          <!--  the policy dialogue starts-->
          <template>
            <v-layout justify-center>
              <v-dialog v-model="policy" width="900px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Politicas de TeachEIP.com</span>
                  </v-card-title>
                    <Policy/>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="policy = false">Disagree</v-btn>
                    <v-btn color="green darken-1" text @click="policy = false">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>
          <!--  the policy dialogue ends-->
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
                  class="checkbox mt-2 pa-0"
                  v-model="checkbox"
                  v-validate="'required'" :error-messages="errors.collect('checkbox')"
                  value="1"
                  data-vv-name="checkbox"
                  type="checkbox"
                  required
                ></v-checkbox>
              </v-flex>
              <v-btn color="white" depressed @click="policy= true" class="policy ma-0 pa-0 ">I have read and agree to your policy</v-btn>
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
import Policy from "@/views/Useterms.vue";
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
import auth from "firebase";

export default {
  $_veeValidate: {
    validator: "new"
  },
  components:{
    Policy
  },
  data: () => ({
    positions: [
      { text: "Teacher", value: "teacher" },
      { text: "Coordinator", value: "coordinator" },
      { text: "Supervisor", value: "supervisor" }
    ],
    policy: false,
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



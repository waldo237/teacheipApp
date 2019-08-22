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
                  <Policy />
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="sign-up" text @click="unCheckIt">Disagree</v-btn>
                    <v-btn class="sign-in" text @click="checkIt">Agree</v-btn>
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
          <v-card-text class="px-4 pt-0">
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
            <div >
              <v-text-field
                @keyup="validateNum"
                type="tel"
                hint="Phone Number (Format: 809-999-9999)"
                prepend-icon="phone"
                v-model="phoneNumber"
                :error="err"
                label="Phone Number"
                required
              ></v-text-field>
            </div>
            <v-text-field
              autocomplete
              prepend-icon="lock"
              name="password"
              label="Password"
              id="password"
              required
              passEError
              v-model="password"
              hint="Your password should be at least 6 characters"
              :type="showPassword ? 'text': 'password' "
              :append-icon="showPassword ? 'visibility': 'visibility_off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
            @keyup="valRepeat"
              autocomplete
              :error="errRepeat"
              prepend-icon="lock"
              name="repeat"
              label="Repeat Password"
              id="repeat"
              v-model="repeat"
              :type="showRepeat ? 'text': 'password' "
              :append-icon="showRepeat ? 'visibility': 'visibility_off'"
              @click:append="showRepeat = !showRepeat"
            ></v-text-field>
            <!-- position selector starts -->
            <v-flex xs class="my-0">
              <v-select
                v-model="select"
                :items="positions"
                text="text"
                value="value"
                label="Position"
                return-object
              ></v-select>
            </v-flex>
            <!-- position selector ends -->

            <v-layout row wrap class="policy">
              <!-- checkbox and policy starts -->
              <v-flex sm1 xs1>
                <v-checkbox
                  class="checkbox mt-2 pa-0"
                  v-model="checkbox"
                  v-validate="'required'"
                  :error-messages="errors.collect('checkbox')"
                  :value="checkbox"
                  data-vv-name="checkbox"
                  type="checkbox"
                  required
                ></v-checkbox>
              </v-flex>
              <v-btn
                color="white"
                depressed
                @click="policy= true"
                class="policy ma-0 pa-0"
              >I have read and agree to your policy</v-btn>
              <!-- checkbox and policy ends -->

              <!-- buttons box starts -->
              <v-card-actions class="ml-5">
                <v-flex xl12 xs12>
                  <v-btn class="sign-up elevation-12 mx-2" flat @click="toggleSU">Close</v-btn>
                  <v-btn class="elevation-12 mx-2 hidden-sm-and-down" @click="clear">clear</v-btn>
                  <v-btn class="sign-in elevation-12 mx-3" @click="submit">submit</v-btn>
                </v-flex>
              </v-card-actions>
              <!-- buttons box ends -->
            </v-layout>
          </v-card-text>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>
<style scoped>
.policy {
  font-size: 90%;
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
  components: {
    Policy
  },
  data: () => ({
    positions: [
      { text: "Teacher", value: "teacher" },
      { text: "Coordinator", value: "coordinator" },
      { text: "Supervisor", value: "supervisor" },
      { text: "Manager", value: "manager" }
    ],
    profile: {},
    policy: false,
    position: false,
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    repeat: "",
    select: "",
    err: false,
    errRepeat: false,
    checkbox: null,
    user:{},
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
    validateNum() {
      if (!this.phoneNumber.match(/^[2-9]\d{2}-\d{3}-\d{4}$/)) {
        this.err = true;
      } else {
        this.err = false;
      }
    },
    valRepeat() {
      if (password.value!==repeat.value) {
        this.errRepeat = true;
      } else {
        this.errRepeat = false;
      }
    },
    checkIt() {
      this.policy = false;
      this.checkbox = "1";
    },
    unCheckIt() {
      this.policy = false;
      this.checkbox = null;
    },
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    async submit(e) {
      e.preventDefault();
      let passed = await this.$validator.validateAll();
      this.validateNum();
      if (passed) {
        auth
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            async () => {
              await auth.auth().currentUser.sendEmailVerification();
              await this.toggleIsLoggedIn();

              this.profile.displayName = await this.name;
              this.profile.updatePhoneNumber = this.phoneNumber;
              this.profile.photoURL = await "https://generic.jpg";
              // update profile auth
              await auth.auth().currentUser.updateProfile(this.profile);
                   await this.$store.commit(
                  "setCurrentUser",
                  auth.auth().currentUser
                );
              // update userdb
               this.user.id=  await auth.auth().currentUser.uid
                this.user.email= await this.email,
               this.user.level= await 2,
               this.user.name=  await this.name,
               this.user.position= await this.position,
               this.$store.commit('setUserDB', this.user)
              this.dialog = false;

              // await auth
              //   .auth()
              //   .currentUser.updateProfile({ displayName: this.name });
              await this.showAlert(
                "Congratulations! Your account was created successfully. We have sent an email to activate account",
                "done",
                "success"
              );
              await this.toggleSU();
              // redirect with curresponding id
              this.$router.push(`/dashboard/`);
              // update name

           
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
      this.phoneNumber = "";
      this.password = "";
      this.repeat = "";
      this.select = "";
      this.checkbox = null;
      this.position = "";
      this.$validator.reset();
      this.err = false;
      this.errRepeat = false;
    },
    ...mapActions(["toggleSU", "toggleIsLoggedIn", "runAlert","fetchAllUsers"])
  },
  created(){
    this.fetchAllUsers()
    // console.log(this.getUsers);
  },
  computed: mapGetters(["getSUDialog", "getCurrentUser", "getUserDB", "getUsers"])
};
</script>



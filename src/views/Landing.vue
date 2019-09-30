<template>
  <!-- pendingForVerification dialog starts -->
  <v-dialog v-model="getLanding" fullscreen persistent hide-overlay v-if="checkIsLoggedIn">
    <v-layout justify-center>
      <v-card min-width="100%" min-height="100%">
        <v-toolbar color="white elevation-24" dense>
          <v-layout justify-start>
            <v-toolbar-title class="hidden-sm-and-down">Role Wizzard</v-toolbar-title>
          </v-layout>
          <v-layout justify-center>
            <span class="acronym title mt-2">Hello,{{getCurrentUser.displayName}}. Welcome to</span>
            <span class="teach display-1">Teach</span>
            <span class="acronym display-1">EIP</span>
          </v-layout>
          <v-spacer />
          <!-- profile avatar starts -->
          <v-btn depressed fab color="white" class="avatar-button" v-if="checkIsLoggedIn">
            <v-avatar v-if="getCurrentUser.photoURL">
              <img :src="getCurrentUser.photoURL" :alt="getCurrentUser.displayName" />
            </v-avatar>
            <v-avatar color="red" v-else>
              <span
                class="white--text headline"
              >{{ getCurrentUser.displayName.split(" ").map((n)=>n[0]).join("").toUpperCase() }}</span>
            </v-avatar>
          </v-btn>

          <span class="acronym" />
        </v-toolbar>
        <v-layout justify-center class="ml-5">
          <v-img
            alt="Oh man! more waiting?"
            src="https://media0.giphy.com/media/26DNhSJnqWFdgPgMo/source.gif"
            lazy-src="https://media0.giphy.com/media/26DNhSJnqWFdgPgMo/source.gif"
            aspect-ratio="1"
            max-width="360"
            max-height="360"
          />
        </v-layout>

        <v-layout class="pt-0" justify-center>
          <v-layout class="mx-3 mb-5 pa-3 px-2 pt-0 main-card" wrap>
            <v-layout class="mx-2 px-1 justify-center" flat wrap>
              <!-- cards starts -->
              <v-card
                class="justify-center mx-1 grids"
                raised
                max-height="200px"
                max-width="400px"
                min-width="400px"
              >
                <v-card-title primary-title class="gradient justify-center elevation-12 py-1">
                  <h3 class="title white--text text--accent-2">Select your role to start</h3>
                </v-card-title>
                <v-flex xs class="my-0 mx-3">
                  <v-select
                    v-model="select"
                    :items="actors"
                    text="text"
                    value="value"
                    label="Role"
                    return-object
                  ></v-select>
                </v-flex>
                <v-card-text class="justify-center pt-3">
                  <!-- Submit button starts -->
                  <v-layout class="justify-end"  @click="show=true">
                    <v-tooltip v-model="show" right v-if="select==''">
                      <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                        </v-btn>
                      </template>
                      <span>Please select a role</span>
                    </v-tooltip>
                    <v-btn
                     @click="formTrigger"
                      :disabled="select==''"
                      class="justify-center mx-auto gradient font-weight-bold white--text grids"
                    >
                      <v-icon small>directions_walk</v-icon>Go in
                    </v-btn>
                  </v-layout>
                </v-card-text>
              </v-card>
              <!-- cards starts -->
            </v-layout>
          </v-layout>
        </v-layout>
      </v-card>
    </v-layout>
    <v-dialog
      v-model="studentForm"
      persistent :overlay="false"
      min-width="700px"
      transition="dialog-transition"
    >
      <Student />
    </v-dialog>
  </v-dialog>

  <!-- pendingForVerification dialog ends -->
</template>




<script>
import { auth } from "firebase/app";
import { mapGetters } from "vuex";
import Student from "../components/authenticationForms/student.vue";
export default {
  name: "Landing",
  components: {Student},
  data() {
    return {
      select: "",
      show: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      studentForm: false,
      actors: [
        {
          text: "Student",
          value: "Student",
          form: () => {
            this.studentForm = !this.studentForm;
          }
        },
        {
          text: "Teacher",
          value: "Teacher",
          form: () => {
            this.teacherForm = true;
          }
        },
        {
          text: "Coordinator",
          value: "Coordinator",
          form: () => {
            this.coordinatorForm = true;
          }
        },
        {
          text: "Supervisor",
          value: "Supervisor",
          form: () => {
            this.supervisorForm = true;
          }
        },
        {
          text: "Manager",
          value: "Manager",
          form: () => {
            this.managerForm = true;
          }
        }
      ]
    };
  },
  methods:{
    formTrigger(){
       for (const i in this.actors) {
         if (this.select.value == this.actors[i].value) {
           this.actors[i].form();
         }
       }
    }
  },
  computed: mapGetters(["getLanding", "checkIsLoggedIn", "getCurrentUser"]),
  created() {
    if (auth().currentUser) {
      if (auth().currentUser.emailVerified)
        this.$store.commit("setLoggedIn", true);
      this.$store.commit("setCurrentUser", auth().currentUser);
    }
  }
};
</script>
<style scoped>
.gradient {
  background: linear-gradient(
    0deg,
    rgba(2, 2, 32, 1) 33%,
    rgb(57, 11, 165) 100%
  );
}
.grids {
  border-radius: 5px !important;
}

.main-card {
  border-radius: 5px !important;
}
@media screen and (max-width: 960px) {
  .grids {
    margin-top: 5% !important;
  }
}
@import url("https://fonts.googleapis.com/css?family=Lexend+Exa|Oswald&display=swap");
.title {
  font-family: "Oswald", sans-serif !important;
  font-weight: lighter !important;
}
</style>

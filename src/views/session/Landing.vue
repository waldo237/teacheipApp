<template>
  <!-- pendingForVerification dialog starts -->
  <v-dialog
    v-model="getLanding"
    fullscreen
    persistent
    hide-overlay
    v-if="checkIsLoggedIn"
  >
    <v-layout justify-center>
      <v-card
        min-width="100%"
        min-height="100%"
        color="grey lighten-3"
      >
        <v-toolbar
          color="grey lighten-5"
          dense
          app
        >
          <v-layout justify-center>
            <span class="acronym title mt-2 mx-2">Hola, {{ auth().currentUser.displayName }}. Gracias por visitar a</span>
            <span class="teach title acronym  mt-2">Teach</span>
            <span class="acronym title mt-2">EIP</span>
          </v-layout>
          <v-spacer />
          <!-- profile avatar starts -->
          <v-btn
            depressed
            fab
            small
            color="white"
            class="avatar-button ma-0"
            v-if="checkIsLoggedIn"
            @click="toggleProfile"
          >
            <v-avatar
              size="45"
              v-if="auth().currentUser.photoURL"
            >
              <img
                :src="auth().currentUser.photoURL"
                :alt="auth().currentUser.displayName"
              >
            </v-avatar>
            <v-avatar
              color="#c6192a"
              v-else
            >
              <span class="white--text headline">{{ initialize }}</span>
            </v-avatar>
          </v-btn>
          <span class="acronym" />

          <v-list-tile>
            <Profile
              class="profile"
              v-if="profileModel"
              :show-edit-profile="true"
              @closeProfile="toggleProfile"
            />
          </v-list-tile>
        </v-toolbar>
        <v-layout
          justify-center
          class="ml-5"
        >
          <v-img
            alt="Oh man! more waiting?"
            src="https://drive.google.com/uc?export=view&id=16-haIxcaeGT4gulJqqbYkjX95yosY8LX"
            lazy-src="https://drive.google.com/uc?export=view&id=16-haIxcaeGT4gulJqqbYkjX95yosY8LX"
            aspect-ratio="1"
            max-width="360"
            max-height="360"
          />
        </v-layout>

        <v-layout
          class="pt-0"
          justify-center
        >
          <v-layout
            class="mx-3 mb-5 pa-3 px-2 pt-0 main-card"
            wrap
          >
            <v-layout
              class="mx-2 pb-5 px-1 justify-center"
              flat
              wrap
            >
              <!-- cards starts -->
              <v-card
                class="justify-center mx-1 grids grey lighten-2 elevation-17"
                raised
                max-height="200px"
                max-width="400px"
                min-width="400px"
              >
                <v-card-title
                  primary-title
                  class="black-blue justify-center elevation-12 py-1"
                >
                  <h3 class="title white--text text--accent-2">
                    Selecciona un rol para continuar
                  </h3>
                </v-card-title>
                <v-flex
                  xs
                  class="my-0 mx-3"
                >
                  <v-select
                    v-model="select"
                    :items="actors"
                    text="text"
                    value="value"
                    label="rol"
                    return-object
                  />
                </v-flex>
                <v-card-text class="justify-center pt-3">
                  <!-- Submit button starts -->
                  <v-layout
                    class="justify-end"
                    @click="show=true"
                  >
                    <v-tooltip
                      v-model="show"
                      right
                      v-if="select==''"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          icon
                          v-on="on"
                        />
                      </template>
                      <span>Por favor escoje un rol</span>
                    </v-tooltip>
                    <v-btn
                      @click="formTrigger"
                      :disabled="select==''"
                      class="justify-center mx-auto black-blue font-weight-bold white--text grids"
                    >
                      <v-icon small>
                        directions_walk
                      </v-icon>Entrar
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
    <!-- stuudent -->
    <v-dialog
      v-model="studentForm"
      persistent
      :overlay="false"
      min-width="700px"
      transition="dialog-transition"
    >
      <Student @close-student="studentForm= false" />
    </v-dialog>

    <!-- teacher -->
    <v-dialog
      v-model="teacherForm"
      persistent
      :overlay="false"
      min-width="700px"
      transition="dialog-transition"
    >
      <Teacher @close-teacher="teacherForm= false" />
    </v-dialog>

    <!-- coordinator -->
    <v-dialog
      v-model="coordinatorForm"
      persistent
      :overlay="false"
      min-width="700px"
      transition="dialog-transition"
    >
      <Coordinator @close-coordinator="coordinatorForm= false" />
    </v-dialog>
    <!-- supervisor -->
    <v-dialog
      v-model="supervisorForm"
      persistent
      :overlay="false"
      min-width="700px"
      transition="dialog-transition"
    >
      <Supervisor @close-supervisor="supervisorForm= false" />
    </v-dialog>
    <!-- manager -->
    <v-dialog
      v-model="managerForm"
      persistent
      :overlay="false"
      min-width="700px"
      transition="dialog-transition"
    >
      <Manager @close-manager="managerForm= false" />
    </v-dialog>
    <!--  minimized menu ends-->
  </v-dialog>
  <!-- pendingForVerification dialog ends -->
</template>




<script>
import { directive as onClickaway } from "vue-clickaway";
import Profile from "@/components/profile.vue";
import { mapGetters, mapActions } from "vuex";
import Student from "@/components/authenticationForms/student.vue";
import Teacher from "@/components/authenticationForms/teacher.vue";
import Coordinator from "@/components/authenticationForms/coordinator.vue";
import Supervisor from "@/components/authenticationForms/supervisor.vue";
import Manager from "@/components/authenticationForms/manager.vue";
export default {
  name: "Landing",
  components: { Student, Teacher, Coordinator, Supervisor, Manager, Profile },
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      select: "",
      show: false,
      profileModel: false,
      studentForm: false,
      teacherForm: false,
      coordinatorForm: false,
      supervisorForm: false,
      managerForm: false,
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
  methods: {
    formTrigger() {
      for (const i in this.actors) {
        if (this.select.value == this.actors[i].value) {
          this.actors[i].form();
        }
      }
    },
    toggleProfile() {
      this.profileModel = !this.profileModel;
    },
  },

  computed: {
    ...mapGetters([
      "getLanding",
      "checkIsLoggedIn",
      "auth",
    ]),
    initialize: function() {
      return this.auth().currentUser.displayName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
    }
  },
  async created() {

    if (this.auth().currentUser) {
      this.$store.commit("setLoggedIn", true);
       this.$root.$emit('loggedIn');
    }
  }
};
</script>
<style scoped>

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
  .acronym {
    font-size: 95% !important;
  }
}
@import url("https://fonts.googleapis.com/css?family=Lexend+Exa|Oswald&display=swap");
.title {
  font-family: "Oswald", sans-serif !important;
  font-weight: lighter !important;
}
</style>

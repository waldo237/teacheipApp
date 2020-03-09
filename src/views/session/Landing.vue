<template>
  <v-layout
    row
    wrap
  >
    <!-- pendingForVerification dialog starts -->
    <v-dialog
      v-model="getLanding"
      fullscreen
      hide-overlay
      persistent
      scrollable
      transition="dialog-bottom-transition"
      v-if="checkIsLoggedIn"
    >
      <v-layout justify-center>
        <v-card
          min-width="100%"
          class="pb-5"
          color="grey lighten-3"
        >
          <v-toolbar
            color="grey lighten-5"
            dense
            app
          >
            <v-layout
              justify-center
              class="font-95"
            >
              <span
                class="acronym title"
              >Hola, {{ auth().currentUser.displayName }}. Gracias por visitar &nbsp;</span>
              <span />
              <span class="teach title acronym">Teach</span>
              <span class="acronym title">EIP</span>
            </v-layout>
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

            <Profile
              class="profile"
              v-if="profileModel"
              :show-edit-profile="true"
              @closeProfile="toggleProfile"
            />
          </v-toolbar>
          <v-layout justify-center>
            <v-img
              alt="Oh man! more waiting?"
              src="https://drive.google.com/uc?export=view&id=16-haIxcaeGT4gulJqqbYkjX95yosY8LX"
              lazy-src="https://drive.google.com/uc?export=view&id=16-haIxcaeGT4gulJqqbYkjX95yosY8LX"
              aspect-ratio="1"
              max-width="320"
              max-height="320"
            />
          </v-layout>

          <v-layout
            class="mx-3 mb-5 pa-3 px-2 pt-0 main-card"
            row
            justify-center
          >
            <!-- cards starts -->
            <v-card
              class="justify-center mx-1 grids grey lighten-2 elevation-17"
              raised
              max-width="400px"
            >
              <v-card-title
                dense
                class="black-blue justify-center py-1"
              >
                <h3 class="title white--text font-95">
                  Selecciona un rol para continuar
                </h3>
              </v-card-title>
              <v-card
                class="mx-3 grey lighten-2"
                flat
              >
                <v-layout
                  column
                  align-center
                >
                  <v-select
                    v-model="select"
                    :items="actors"
                    text="text"
                    value="value"
                    label="rol"
                    return-object
                  />
                  <!-- Submit button starts -->
                  <v-layout
                    row
                    justify-center
                    @click="show = true"
                  >
                    <v-tooltip
                      v-model="show"
                      right
                      v-if="select == ''"
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
                      round
                      @click="formTrigger"
                      :disabled="select == ''"
                      :class="(!select)?'': 'black-blue white--text'"
                    >
                      <v-icon small>
                        directions_walk
                      </v-icon>Entrar
                    </v-btn>
                  </v-layout>
                </v-layout>
              </v-card>
            </v-card>
            <!-- cards starts -->
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
        <Student @close-student="studentForm = false" />
      </v-dialog>

      <!-- teacher -->
      <v-dialog
        v-model="teacherForm"
        persistent
        :overlay="false"
        min-width="700px"
        transition="dialog-transition"
      >
        <Teacher @close-teacher="teacherForm = false" />
      </v-dialog>

      <!-- coordinator -->
      <v-dialog
        v-model="coordinatorForm"
        persistent
        :overlay="false"
        min-width="700px"
        transition="dialog-transition"
      >
        <Coordinator @close-coordinator="coordinatorForm = false" />
      </v-dialog>
      <!-- supervisor -->
      <v-dialog
        v-model="supervisorForm"
        persistent
        :overlay="false"
        min-width="700px"
        transition="dialog-transition"
      >
        <Supervisor @close-supervisor="supervisorForm = false" />
      </v-dialog>
      <!-- manager -->
      <v-dialog
        v-model="managerForm"
        persistent
        :overlay="false"
        min-width="700px"
        transition="dialog-transition"
      >
        <Manager @close-manager="managerForm = false" />
      </v-dialog>
      <!--  minimized menu ends-->
    </v-dialog>
    <!-- pendingForVerification dialog ends -->
  </v-layout>
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
    }
  },

  computed: {
    ...mapGetters(["getLanding", "checkIsLoggedIn", "auth"]),
    initialize: function() {
      return this.auth()
        .currentUser.displayName.split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
    }
  },
  async created() {
    if (this.auth().currentUser) {
      this.$store.commit("setLoggedIn", true);
      this.$root.$emit("loggedIn");
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

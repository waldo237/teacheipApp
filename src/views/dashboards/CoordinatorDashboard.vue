<template>
  <div width="100%">
    <!--############ CONTENT/ DASHBOARD ##############-->
    <!--############ ALERT ##############-->

    <!--############ ALERT END ##############-->
    <v-layout
      width="100%"
      justify-center
      class=" my-5 pt-0 pb-5"
    >
      <v-tabs
        vertical
        class=" pt-2"
        slider-color="#c6192a"
        dark
      >
        <v-tab>
          <v-icon color="black">
            apps
          </v-icon>Servicios
        </v-tab>
        <v-tab>
          <v-icon
            color="black"
            class="mr-2"
          />Solicitudes
        </v-tab>
        <!-- <v-tab> <v-icon color="black" />Centro </v-tab> -->

        <v-tab-item class="pb-5 mb-5">
          <!-- SERVICIOS RECURSOS -->
          <v-card class="round grey lighten-2 elevation-9">
            <v-card-title
              class="ma-auto title main-title"
              dense
            >
              <v-layout
                row
                wrap
                justify-center
                align-center
              >
                <v-icon
                  large
                  class="mx-2 "
                >
                  local_play
                </v-icon>SERVICIOS
              </v-layout>
            </v-card-title>
            <v-layout
              class=" round py-0 slidingMenu "
              wrap
            >
              <v-card
                flat
                class="ma-2  pa-0  background grey lighten-3"
                v-for="(item, i) in servicios"
                :key="i"
                min-width="360px"
              >
                <v-btn
                  x-large
                  :to="item.link"
                  outline
                  color="#135393"
                  class=" ma-0   elevation-4"
                  block
                >
                  <v-icon>{{ item.icon }}</v-icon>
                  <span class="title font-weight-medium">  {{ item.title }} </span>
                </v-btn>
              </v-card>
            </v-layout>
          </v-card>
          <!-- SERVICIOS ENDS -->
        </v-tab-item>

        <v-tab-item class="pb-5 mb-5">
          <!-- SOLICITUDES -->
          <v-card class="round grey lighten-2 elevation-9">
            <v-card-title
              class="ma-auto title main-title"
              dense
            >
              <v-layout
                row
                wrap
                justify-center
                align-center
              >
                <v-icon
                  large
                  class="mx-2 "
                >
                  hearing
                </v-icon>SOLICITUDES
              </v-layout>
            </v-card-title>
            <v-layout
              class=" round py-0 slidingMenu "
              wrap
            >
              <v-card
                flat
                class="ma-2  pa-0  background grey lighten-4"
                v-for="(item, i) in solicitudes"
                :key="i"
                min-width="360px"
              >
                <v-btn
                  x-large
                  :to="item.link"
                  
                  
                  class=" ma-0   "
                  block
                  outline
                >
                  <v-icon>{{ item.icon }}</v-icon>
                  <span class="title font-weight-medium">  {{ item.title }} </span>
                </v-btn>
              </v-card>
            </v-layout>
          </v-card>
          <!-- SOLICITUDES ENDS -->
        </v-tab-item>
      </v-tabs>
    </v-layout>
    <!-- </v-container> -->
    <!-- </v-content> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import session from "@/store/modules/session.js";
import { directive as onClickaway } from "vue-clickaway";
export default {
  name: "CoordinatorDashboard",
  // components: { Sidemenu },
  directives: {
    onClickaway: onClickaway
  },
  data: () => {
    return {
      interval: {},
      sugerenciasBody: "",
      dialog: false,
      drawer: true,
      studentMenu: false,
      teacherMenu: false,
      generalMenu: true,
      alert: true,
      announcement: true,

      announcementMessage: "",
      center: {
        name: "UASD CEDE"
      },

      studentOptions: [
        { title: "Grades", icon: "grid_on", color: "blue" },
        { title: "Attendance", icon: "wb_iridescent", color: "orange" },
        { title: "Permissions", icon: "directions_run", color: "yellow" },
        { title: "Dropouts", icon: "person_add_disabled", color: "#c6192a" }
      ],
      generalOptions: [
        { title: "General Report", icon: "adjust", color: "white" },
        { title: "General statistics", icon: "trending_up", color: "yellow" },
        { title: "Inventory", icon: "assignment_turned_in", color: "green" },
        { title: "Calendar", icon: "event_note", color: "blue" },
        { title: "Attendance", icon: "grid_on", color: "orange" }
      ],
      teacherOptions: [
        { title: "Add teacher", icon: "account_circle", color: "green" },
        { title: "Assign fingerprint", icon: "fingerprint", color: "white" },
        { title: "Permissions", icon: "directions_run", color: "yellow" },
        { title: "Records", icon: "save", color: "#c6192a" },
        { title: "Class Observations", icon: "check_circle", color: "orange" },
        { title: "Survey Results", icon: "grid_on", color: "blue" }
      ]
    };
  },
  methods: {
    closeStudent() {
      if (this.studentMenu) {
        this.studentMenu = !this.studentMenu;
      }
    },
    closeTeacher() {
      if (this.teacherMenu) {
        this.teacherMenu = !this.teacherMenu;
      }
    }
  },
  computed: {
    ...mapGetters([
      "getCoordinatorSideMenu",
      "checkIsLoggedIn",
      "auth",
      "validated",
      "servicios",
      "solicitudes"
    ])
  },
  beforeDestroy() {
  },
  async mounted() {
    await this.$store.commit("setCurrentRole", session.fetchRole());
    this.$store.commit("setLoggedIn", true);
  },

};
</script>
<style>
.slidingMenu {
  animation-duration: 0.3s;
  animation-name: slideInLeft;
  animation-timing-function: ease;
}
.fade {
  animation-duration: 9s;
  animation-name: fadeOut;
  animation-timing-function: ease-in-out;
}
.fade:start {
  animation-duration: 5s;
  animation-name: fadeIn;
  animation-timing-function: ease-in-out;
}
.actionButton:hover {
  background: gray;
}
.deep {
  background: #1488cc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2b32b2,
    #1488cc
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2b32b2,
    #1488cc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.background {
  width: 100%;
}
.rounding {
  border-radius: 30%;
}
</style>

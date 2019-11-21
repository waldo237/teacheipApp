<template>
  <div width="100%">
    <!--############ CONTENT/ DASHBOARD ##############-->
    <!--############ ALERT ##############-->
    <div>
      <v-alert
        v-model="alert"
        border="left"
        close-text="Close Alert"
        color="deep"
        dismissible
        class="mt-3 mb-0"
      >
        <v-card
          v-if="announcement"
          color="deep  white--text"
          class="fade ml-4"
          flat
          justify-center
        >
          {{ announcementMessage }}
        </v-card>
      </v-alert>
    </div>

    <!--############ ALERT END ##############-->
    <v-layout
      width="100%"
      justify-center
      :class="!alert ? 'mt-0  my-4 pb-5' : ' mt-0  mb-5 pb-5'"
    >
      <v-card width="100%" class="elevation-24 " wrap>
        <!-- <v-toolbar
          flat
          color="black-blue text-uppercase"
          dark
          dense
          justify-center
        >
          <v-toolbar-title class="mx-auto">
            {{ center.name }}
          </v-toolbar-title>
        </v-toolbar> -->
        <v-tabs vertical class="px-5" slider-color="#c6192a" light>
          <v-tab>
            <v-icon color="black">
              apps </v-icon
            >Servicios
          </v-tab>
          <v-tab>
            <v-icon color="black" class="mr-2"> </v-icon>Solicitudes
          </v-tab>
          <v-tab> <v-icon color="black"> </v-icon>Centro </v-tab>

          <v-tab-item class="pb-5">
            <!-- SERVICIOS RECURSOS -->
            <v-card hover exact dark class="rounding black my-5">
              <v-card-title class="mx-auto headline" dense>
                <v-layout row wrap justify-center>
                  <v-icon>local_play</v-icon>SERVICIOS
                </v-layout>
              </v-card-title>
              <v-layout class=" round py-0 slidingMenu background" wrap>
                <v-card
                  class="ma-2  pa-0 rounding background"
                  v-for="(item, i) in servicios"
                  :key="i"
                  min-width="360px"
                >
                  <v-btn
                    :to="item.link"
                    round
                    
                    class=" sign-in ma-0 py-1"
                    block
                  >
                    <v-icon>{{ item.icon }}</v-icon>
                    {{ item.title }}
                  </v-btn>
                </v-card>
              </v-layout>
            </v-card>
            <!-- SERVICIOS ENDS -->
          </v-tab-item>

          <v-tab-item class="pb-5">
            <!-- SOLICITUDES -->
            <v-card hover exact dark class="rounding black my-5">
              <v-card-title class="mx-auto headline">
                <v-layout row wrap justify-center>
                  <v-icon large>
                    hearing </v-icon
                  >SOLICITUDES
                </v-layout>
              </v-card-title>
              <v-layout
                dark
                class="black round py-0 slidingMenu background"
                wrap
                justify-center
              >
                <v-card
                  min-width="360px"
                  class="mx-auto ma-2 pa-0 black rounding background"
                  v-for="(item, i) in solicitudes"
                  :key="i"
                >
                  <v-btn round class=" sign-in my-0 ma-0 py-2" block>
                    <v-icon>{{ item.icon }}</v-icon>
                    {{ item.title }}
                  </v-btn>
                </v-card>
              </v-layout>
            </v-card>
            <!-- SOLICITUDES ENDS -->
          </v-tab-item>

          <v-tab-item class="mx-3 pb-5">
            <v-card flat class="my-5 black round" dark>
              <v-layout row wrap>
                <!-- GENERAL BUTTON -->
                <a
                  @click="
                    generalMenu = true;
                    studentMenu = false;
                    teacherMenu = false;
                  "
                >
                  <v-card
                    class="px-auto pt-2 mt-1 mx-3 actionButton rounding"
                    width="80px"
                    :dark="generalMenu ? true : false"
                  >
                    <img
                      src="https://drive.google.com/uc?export=view&id=1YBfq0jnYRiyYePSmYpVGgNuf0LN-LEQW"
                      lazy-src="https://drive.google.com/uc?export=view&id=1YBfq0jnYRiyYePSmYpVGgNuf0LN-LEQW"
                      alt
                      width="76px"
                      height="68px"
                      class="mx-1 mb-0"
                    />
                    <v-card-text class="px-auto py-0">General</v-card-text>
                    <v-icon class="mx-4" color="#c6192a" v-if="generalMenu"
                      >arrow_drop_down</v-icon
                    >
                  </v-card>
                </a>
                <!-- GENERAL BUTTON END -->

                <a
                  @click="
                    studentMenu = true;
                    teacherMenu = false;
                    generalMenu = false;
                  "
                >
                  <v-card
                    class="px-auto pt-2 mt-1 mx-3 actionButton round"
                    width="80px"
                    :dark="studentMenu ? true : false"
                  >
                    <img
                      lazy-src="https://drive.google.com/uc?export=view&id=1VvmPXB2mhGsbtcBhqBb4yG4m5lPoqo83"
                      src="https://drive.google.com/uc?export=view&id=1VvmPXB2mhGsbtcBhqBb4yG4m5lPoqo83"
                      alt
                      class="mx-2 mb-0"
                    />
                    <v-card-text class="px-auto py-0">Student</v-card-text>
                    <v-icon class="mx-4" color="#c6192a" v-if="studentMenu"
                      >arrow_drop_down</v-icon
                    >
                  </v-card>
                </a>
                <!-- TEACHER BUTTON -->
                <a
                  @click="
                    teacherMenu = true;
                    studentMenu = false;
                    generalMenu = false;
                  "
                >
                  <v-card
                    class="px-auto pt-2 mt-1 mx-3 actionButton round"
                    width="80px"
                    :dark="teacherMenu ? true : false"
                  >
                    <img
                      lazy-src="https://drive.google.com/uc?export=view&id=1QQOpEQuXqOqwysFcLnR3QwET-Sbc8lSK"
                      src="https://drive.google.com/uc?export=view&id=1QQOpEQuXqOqwysFcLnR3QwET-Sbc8lSK"
                      alt
                      width="78px"
                      height="68px"
                      class="mx-1 mb-0"
                    />
                    <v-card-text class="px-auto py-0">Teacher</v-card-text>
                    <v-icon class="mx-4" color="#c6192a" v-if="teacherMenu"
                      >arrow_drop_down</v-icon
                    >
                  </v-card>
                </a>
                <!-- TEACHER BUTTON -->
              </v-layout>
              <!-- ####### STUDENT OPTIONS #######-->

              <v-layout
                class="black round py-0 slidingMenu"
                wrap
                v-if="studentMenu"
              >
                <v-card
                  dark
                  class="black pa-0 pa-0 round"
                  v-for="(item, i) in studentOptions"
                  :key="i"
                >
                  <v-btn round class="mx-0 my-0" dense block>
                    <v-icon :color="item.color">
                      {{ item.icon }}
                    </v-icon>
                    {{ item.title }}
                  </v-btn>
                </v-card>
              </v-layout>

              <!-- ####### STUDENT OPTIONS END #######-->

              <!-- ####### TEACHER OPTIONS #######-->

              <v-layout
                class="black py-0 slidingMenu round"
                wrap
                v-if="teacherMenu"
              >
                <v-card
                  dark
                  class=" black pa-0 pa-0 round"
                  v-for="(item, i) in teacherOptions"
                  :key="i"
                >
                  <v-btn round class="mx-0 my-0 " dense block>
                    <v-icon :color="item.color">
                      {{ item.icon }}
                    </v-icon>
                    {{ item.title }}
                  </v-btn>
                </v-card>
              </v-layout>

              <!-- ####### TEACHER OPTIONS END #######-->
              <!-- ####### GENERAL OPTIONS #######-->

              <v-layout
                dark
                class="black round py-0 slidingMenu"
                wrap
                v-if="generalMenu"
              >
                <v-card
                  dark
                  flat
                  class="black pa-0 pa-0 round ma-0 "
                  v-for="(item, i) in generalOptions"
                  :key="i"
                >
                  <v-btn round class="elevation-20 my-0" block>
                    <v-icon :color="item.color">
                      {{ item.icon }}
                    </v-icon>
                    {{ item.title }}
                  </v-btn>
                </v-card>
              </v-layout>

              <!-- ####### GENERAL OPTIONS END #######-->
              <!-- ####### GRID #######-->

              <!-- ####### GRID END #######-->
              <v-card-text />
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
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
import Sidemenu from "@/components/RoleComponents/coordinatorComponents/CoordinatorSidemenu.vue";
export default {
  name: "CoordinatorDashboard",
  components: { Sidemenu },
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
      "solicitudes",
      "storage"
    ])
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    if (this.alert) {
      this.interval = setInterval(() => {
        this.announcement = !this.announcement;
      }, 3000);
    }
    this.$store.commit("setCurrentRole", session.fetchRole());
    this.$store.commit("setLoggedIn", true);
  },
  created() {
    this.announcementMessage = `Hola, ${
      this.auth().currentUser.displayName
    }. Nos place commpartir con ustedes que comenzaremos las clases el dia 13 de Enero 2020`;
    this.$store.commit("setFullScreen", false);
  }
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
.background{
   width:100%;
    background: linear-gradient( rgba(0, 0, 0, 0.582), rgba(0, 0, 0, 0.575) ),  url(https://trainingindustry.com/content/uploads/2019/08/Upskilling-for-the-Future-of-Work-8.7.19.jpg);
}
.rounding{
  border-radius: 30%
}
</style>

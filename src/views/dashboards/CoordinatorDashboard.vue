<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      v-if="checkIsLoggedIn && getCoordinatorSideMenu"
      v-on-clickaway="away"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile v-for="(child, i) in item.children" :key="i" :to="child.link">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!--############ CONTENT/ DASHBOARD ##############-->
    <!--############ ALERT ##############-->
    <div>
      <v-alert
        v-model="alert"
        border="left"
        close-text="Close Alert"
        color="deep-purple accent-4"
        dark
        dismissible
        class="mt-4 mb-0"
      >
        <v-card
          hover
          v-if="announcement"
          color="deep-purple accent-4"
          dark
          class="fade title ml-4"
          flat
        >{{announcementMessage}}</v-card>
      </v-alert>
    </div>

    <!--############ ALERT END ##############-->
    <v-layout justify-center :class="(!alert)?'px-5 mx-5 mt-0  my-5': 'px-5 mx-5 mt-0  mb-5'">
      <v-card class="elevation-24 round mx-1" wrap>
        <v-toolbar flat color="black-blue text-uppercase round" dark dense justify-center>
          <v-toolbar-title class="mx-auto">{{ center.name }}</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical class="px-5" slider-color="red" light>
          <v-tab>
            <v-icon color="black">account_balance</v-icon>Main
          </v-tab>
          <v-tab>
            <v-icon color="black">apps</v-icon>Solicitudes y Servicios
          </v-tab>
          <v-tab>
            <v-icon color="black" class="mr-2">school</v-icon>Academic
          </v-tab>

          <v-tab-item class="mx-3">
            <v-card flat>
              <v-layout row wrap>
                <!-- GENERAL BUTTON -->
                <a @click="generalMenu=true; studentMenu=false; teacherMenu=false">
                  <v-card
                    class="px-auto pt-2 mt-1 mx-3 actionButton round"
                    width="80px"
                    :dark="(generalMenu)? true : false"
                  >
                    <img
                      src="../../assets/dashboardImages/school.png"
                      alt
                      width="76px"
                      height="68px"
                      class="mx-1 mb-0"
                    />
                    <v-card-text class="px-auto py-0">General</v-card-text>
                    <v-icon class="mx-4" color="red" v-if="generalMenu">arrow_drop_down</v-icon>
                  </v-card>
                </a>
                <!-- GENERAL BUTTON END -->

                <a @click="studentMenu=true; teacherMenu=false; generalMenu=false">
                  <v-card
                    class="px-auto pt-2 mt-1 mx-3 actionButton round"
                    width="80px"
                    :dark="(studentMenu)? true : false"
                  >
                    <img src="../../assets/dashboardImages/student.png" alt class="mx-2 mb-0" />
                    <v-card-text class="px-auto py-0">Student</v-card-text>
                    <v-icon class="mx-4" color="red" v-if="studentMenu">arrow_drop_down</v-icon>
                  </v-card>
                </a>
                <!-- TEACHER BUTTON -->
                <a @click="teacherMenu=true; studentMenu=false; generalMenu=false;">
                  <v-card
                    class="px-auto pt-2 mt-1 mx-3 actionButton round"
                    width="80px"
                    :dark="(teacherMenu)? true : false"
                  >
                    <img
                      src="../../assets/dashboardImages/teacher.png"
                      alt
                      width="78px"
                      height="68px"
                      class="mx-1 mb-0"
                    />
                    <v-card-text class="px-auto py-0">Teacher</v-card-text>
                    <v-icon class="mx-4" color="red" v-if="teacherMenu">arrow_drop_down</v-icon>
                  </v-card>
                </a>
                <!-- TEACHER BUTTON -->
              </v-layout>
              <!-- ####### STUDENT OPTIONS #######-->

              <v-layout class="black round py-0 slidingMenu" wrap v-if="studentMenu">
                <v-card
                  dark
                  class="pa-0 mx-auto pa-0 round"
                  v-for="(item, i) in studentOptions"
                  :key="i"
                >
                  <v-btn class="mx-0 my-0 round" dense block>
                    <v-icon :color="item.color">{{item.icon}}</v-icon>
                    {{item.title}}
                  </v-btn>
                </v-card>
              </v-layout>

              <!-- ####### STUDENT OPTIONS END #######-->

              <!-- ####### TEACHER OPTIONS #######-->

              <v-layout class="black round py-0 slidingMenu" wrap v-if="teacherMenu">
                <v-card
                  dark
                  class="pa-0 mx-auto pa-0 round"
                  v-for="(item, i) in teacherOptions"
                  :key="i"
                >
                  <v-btn class="mx-0 my-0 round" dense block>
                    <v-icon :color="item.color">{{item.icon}}</v-icon>
                    {{item.title}}
                  </v-btn>
                </v-card>
              </v-layout>

              <!-- ####### TEACHER OPTIONS END #######-->
              <!-- ####### GENERAL OPTIONS #######-->

              <v-layout dark class="black round py-0 slidingMenu" wrap v-if="generalMenu">
                <v-card
                  dark
                  class="pa-0 mx-auto pa-0 round ma-0"
                  v-for="(item, i) in generalOptions"
                  :key="i"
                >
                  <v-btn class="elevation-20 my-0 round" dense block>
                    <v-icon :color="item.color">{{item.icon}}</v-icon>
                    {{item.title}}
                  </v-btn>
                </v-card>
              </v-layout>

              <!-- ####### GENERAL OPTIONS END #######-->
              <!-- ####### GRID #######-->

              <!-- ####### GRID END #######-->
              <v-card-text />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <!-- SOLICITUDES -->
            <v-card hover exact dark class="round">
              <v-card-title class="mx-auto headline">
                <v-layout row wrap justify-center>
                  <v-icon large>hearing</v-icon>SOLICITUDES
                </v-layout>
              </v-card-title>
              <v-layout dark class="black round py-0 slidingMenu" wrap>
                <v-card
                  class="mx-auto ma-1 elevation-24 round"
                  v-for="(item, i) in solicitudes"
                  :key="i"
                >
                  <v-btn class="elevation-20 elevation-12 round success my-0 ma-1" dense block>
                    <v-icon>{{item.icon}}</v-icon>
                    {{item.title}}
                  </v-btn>
                </v-card>
              </v-layout>
            </v-card>
            <!-- SOLICITUDES ENDS -->
            <!-- SERVICIOS RECURSOS -->
            <v-card hover exact dark class="round my-5">
              <v-card-title class="mx-auto headline" dense>
                <v-layout row wrap justify-center>
                  <v-icon>local_play</v-icon>SERVICIOS
                </v-layout>
              </v-card-title>
              <v-layout dark class="black round py-0 slidingMenu" wrap>
                <v-card
                  class="mx-auto ma-1 elevation-12 round"
                  v-for="(item, i) in servicios"
                  :key="i"
                >
                  <v-btn
                    :to="item.link"
                    class="elevation-20 elevation-12 round primary my-0 ma-1"
                    dense
                    block
                  >
                    <v-icon>{{item.icon}}</v-icon>
                    {{item.title}}
                  </v-btn>
                </v-card>
              </v-layout>
            </v-card>
            <!-- SERVICIOS ENDS -->
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-layout>
    <!-- </v-container> -->
    <!-- </v-content> -->
    <!-- ######### dialog ################ -->
    <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">Create contact</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
                <v-text-field placeholder="Name" />
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field prepend-icon="business" placeholder="Company" />
            </v-flex>
            <v-flex xs6>
              <v-text-field placeholder="Job title" />
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="mail" placeholder="Email" />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="notes" placeholder="Notes" />
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer />
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { directive as onClickaway } from "vue-clickaway";
export default {
  directives: {
    onClickaway: onClickaway
  },
  data: () => {
    return {
      interval: {},
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
      solicitudes: [
        { title: "solicitar copias de examenes" },
        { title: "solicitar permisos extensos" },
        { title: "solicitar materiales y mobiliarios" },
        { title: "solicitar libros" },
        { title: "solicitar carta para estudiante" },
        { title: "solicitar carta para empleado" }
      ],
      servicios: [
        { title: "Lesson Plans", link: "/lesson plans" },
        { title: "Resultados de Examen diagnostico" },
        { title: "Curriculum" },
        { title: "Calendario Academico" },
        { title: "Exam blueprints" },
        { title: "Estadandares de Competencias" },
        { title: "Mapas de Procedimientos" }
      ],
      studentOptions: [
        { title: "Grades", icon: "grid_on", color: "blue" },
        { title: "Attendance", icon: "wb_iridescent", color: "orange" },
        { title: "Permissions", icon: "directions_run", color: "yellow" },
        { title: "Dropouts", icon: "person_add_disabled", color: "red" }
      ],
      generalOptions: [
        { title: "General Report", icon: "adjust", color: "white" },
        { title: "General statistics", icon: "trending_up", color: "yellow" },
        { title: "Dossier", icon: "collections_bookmark", color: "red" },
        { title: "Inventory", icon: "assignment_turned_in", color: "green" },
        { title: "Calendar", icon: "event_note", color: "blue" },
        { title: "Attendance", icon: "grid_on", color: "orange" }
      ],
      teacherOptions: [
        { title: "Add teacher", icon: "account_circle", color: "green" },
        { title: "Assign fingerprint", icon: "fingerprint", color: "white" },
        { title: "Permissions", icon: "directions_run", color: "yellow" },
        { title: "Records", icon: "save", color: "red" },
        { title: "Class Observations", icon: "check_circle", color: "orange" },
        { title: "Survey Results", icon: "grid_on", color: "blue" }
      ],
      items: [
        { icon: "dashboard", text: "DASHBOARD" },

        {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          text: "ACADEMIC",
          model: false,
          children: [
            { text: "Lesson Plans", link: "/lesson plans/" },
            { text: "Other contacts" }
          ]
        }
      ]
    };
  },
  methods: {
    away: function() {
      if (this.getCoordinatorSideMenu) {
        this.$store.commit(
          "setCoordinatorSideMenu",
          !this.getCoordinatorSideMenu
        );
      }
    },
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
    ...mapGetters(["getCoordinatorSideMenu", "checkIsLoggedIn", "auth"])
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    if (this.alert) {
      this.interval =  setInterval(() => {
        this.announcement = !this.announcement;
      }, 3000);
    }
  },
  created() {
    this.announcementMessage = `Hola, ${
      this.auth().currentUser.displayName
    }. Nos place commpartir con ustedes que comenzaremos las clases el dia 15 de Enero 2020`;
    this.$store.commit("setFullScreen", false);
  }
};
</script>
<style >
.slidingMenu {
  animation-duration: 0.3s;
  animation-name: slideInLeft;
  animation-timing-function: ease;
}
.fade {
  animation-duration: 7s;
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
</style>
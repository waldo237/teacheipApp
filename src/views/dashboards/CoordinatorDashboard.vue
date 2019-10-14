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
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
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
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile
            v-else
            :key="item.text"
            @click
          >
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
    <!-- <v-content> -->
    <!-- <v-container  class="mx-5 px-auto"> -->
    <v-layout
      justify-center
      class="px-5 ma-5"
    >
      <v-card
        class="elevation-24 round mx-5"
        wrap
      >
        <v-toolbar
          flat
          color="sign-in text-uppercase round"
          dark
          dense
        >
          <v-toolbar-title>{{ center.name }}</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab>
            <v-icon color="red">
              account_balance
            </v-icon>Main
          </v-tab>
          <v-tab>
            <v-icon color="red">
              apps
            </v-icon>Processes
          </v-tab>
          <v-tab>
            <v-icon
              color="red"
              class="mr-2"
            >
              school
            </v-icon>Academic
          </v-tab>
          <v-tab>
            <v-icon
              color="red"
              class="mr-2"
            >
              business
            </v-icon>Administrative
          </v-tab>

          <v-tab-item class="mx-3">
            <v-card flat>
              <v-layout
                row
                wrap
              >
                <a @click="studentMenu=!studentMenu">
                  <v-card
                    class="px-auto pt-2 mt-1 mx-3 actionButton"
                    width="80px"
                  >
                    <img
                      src="../../assets/dashboardImages/student.png"
                      alt
                      class="mx-2 mb-2"
                    >
                    <v-card-text class="px-auto py-0">Student</v-card-text>
                  </v-card>
                </a>
                <a @click="teacherMenu=!teacherMenu">
                  <v-card
                    class="px-auto pt-2 mt-1 mx-3 actionButton"
                    width="80px"
                    height="108px"
                  >
                    <img
                      src="../../assets/dashboardImages/teacher.png"
                      alt
                      width="78px"
                      height="72px"
                      class="mx-1"
                    >
                    <v-card-text class="px-auto py-0">Teacher</v-card-text>
                  </v-card>
                </a>
              </v-layout>
              <!-- ####### STUDENT OPTIONS #######-->
              <v-list-tile
                dense
                v-if="studentMenu"
                v-on-clickaway="closeStudent"
              >
                <v-list-tile-action>
                  <v-card
                    class="studentMenu elevation-21"
                    width="200px"
                  >
                    <v-toolbar
                      dense
                      flat
                      color="white"
                      class="font-weight-black"
                    >
                      <v-spacer />Student options
                      <v-btn
                        icon
                        @click="studentMenu=!studentMenu"
                      >
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text
                      v-for="(item, i) in studentOptions"
                      :key="i"
                      class="px-auto py-1"
                    >
                      <v-btn
                        block
                        flat
                        class="py-1"
                      >
                        <v-icon
                          :color="item.color"
                          class="mr-2"
                        >
                          {{ item.icon }}
                        </v-icon>
                        <span>{{ item.title }}</span>
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-list-tile-action>
              </v-list-tile>
              <!-- ####### STUDENT OPTIONS END #######-->
                  
              <!-- ####### TEACHER OPTIONS #######-->
              <v-list-tile
                dense
                v-if="teacherMenu"
                v-on-clickaway="closeTeacher"
              >
                <v-list-tile-action>
                  <v-card
                    class="teacherMenu elevation-21 yellow lighten-4"
                    width="200px"
                  >
                    <v-toolbar
                      dense
                      flat
                      color="white"
                      class="font-weight-black"
                    >
                      <v-spacer />Teacher options
                      <v-btn
                        icon
                        @click="teacherMenu=!teacherMenu"
                      >
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text
                      v-for="(item, i) in teacherOptions"
                      :key="i"
                      class="px-auto py-1"
                    >
                      <v-btn
                        block
                        flat
                        class="py-1 yellow lighten-4 px-1"
                      >
                        <v-icon
                          :color="item.color"
                          class="mr-2"
                        >
                          {{ item.icon }}
                        </v-icon>
                        <span>{{ item.title }}</span>
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-list-tile-action>
              </v-list-tile>
              <!-- ####### TEACHER OPTIONS END #######-->
              <v-card-text />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                Here we will have a list of all procedures related to coordination
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item class="px-2">
            <v-card flat>
              <v-card-text>
                <p>Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.</p>

                <p
                  class="mb-0"
                >
                  Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-layout>
    <!-- </v-container> -->
    <!-- </v-content> -->
    <!-- ######### dialog ################ -->
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">
          Create contact
        </v-card-title>
        <v-container
          grid-list-sm
          class="pa-4"
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              xs12
              align-center
              justify-space-between
            >
              <v-layout align-center>
                <v-avatar
                  size="40px"
                  class="mr-3"
                >
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt
                  >
                </v-avatar>
                <v-text-field placeholder="Name" />
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              />
            </v-flex>
            <v-flex xs6>
              <v-text-field placeholder="Job title" />
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              />
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
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              />
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn
            flat
            color="primary"
          >
            More
          </v-btn>
          <v-spacer />
          <v-btn
            flat
            color="primary"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            flat
            @click="dialog = false"
          >
            Save
          </v-btn>
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
  data: () => ({
    dialog: false,
    drawer: true,
    studentMenu: false,
    teacherMenu: false,
    center: {
      name: "UASD CEDE"
    },
    studentOptions: [
      { title: "Add student", icon: "person_add", color: "green" },
      { title: "Assign fingerprint", icon: "fingerprint", color: "black" },
      { title: "Permissions", icon: "directions_run", color: "yellow" },
      { title: "Dropouts", icon: "person_add_disabled", color: "red" },
      { title: "Grades", icon: "grid_on", color: "blue" },
      { title: "Late Pass Report", icon: "wb_iridescent", color: "orange" }
    ],
    teacherOptions: [
      { title: "Add teacher", icon: "account_circle", color: "green" },
      { title: "Assign fingerprint", icon: "fingerprint", color: "black" },
      { title: "Permissions", icon: "directions_run", color: "yellow" },
      { title: "Records", icon: "save", color: "red" },
      { title: "Class Observations", icon: "check_circle", color: "orange" },
      { title: "Survey Results", icon: "grid_on", color: "blue" },
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
  }),
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
    },
  },
  computed: { ...mapGetters(["getCoordinatorSideMenu", "checkIsLoggedIn"]) },
  created() {
    this.$store.commit("setFullScreen", false);
  }
};
</script>
<style >
.studentMenu {
  z-index: 1;
  position: absolute;
  top: 2%;
  left: 0%;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: bounceInDown;
  animation-timing-function: ease-in-out;
  display: block;
}
.teacherMenu {
  z-index: 1;
  position: absolute;
  top: 0%;
  left: 12%;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: bounceInDown;
  animation-timing-function: ease-in-out;
  display: block;
}
.actionButton:hover {
  background: gray;
}
</style>
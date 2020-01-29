<template>
  <v-layout
    class="mx-3 mb-5 pa-3 px-2 pb-5 pt-1 main-card"
    wrap
  >
    <v-layout
      class="mx-2 px-1 justify-center"
      flat
      wrap
    >
      <!-- upcoming events starts -->
      <v-card
        class="justify-center mx-1 elevation-24 grids"
        raised
        max-height="350px"
        max-width="400px"
        min-width="380px"
      >
        <v-card-title
          primary-title
          class="justify-center orangish elevation-12 py-1"
        >
          <h3 class="title white--text text--accent-2">
            <v-icon
              color="white"
              medium
              class="mr-2"
            >
              alarm
            </v-icon>Upcoming events
          </h3>
        </v-card-title>
        <v-card-text class="title">
          {{ direccion.notification }}
        </v-card-text>
      </v-card>
      <!-- upcoming events ends -->
      <!-- intructions start -->
      <v-card
        class="justify-center mx-1 elevation-24 grids"
        raised
        max-height="350px"
        max-width="400px"
        min-width="380px"
      >
        <v-card-title
          primary-title
          class="instructions justify-center elevation-12 py-1"
        >
          <h3 class="title white--text text--accent-2">
            <v-icon
              color="white"
              medium
              class="mx-2"
            >
              sms
            </v-icon>Task Report
          </h3>
        </v-card-title>
        <v-card-text class="justify-center">
          <!-- date picker starts -->
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                class="mx-3 my-0"
                v-model="date"
                label="Today"
                prepend-icon="event"
                readonly
                v-on="on"
                disabled
              />
            </template>
            <v-date-picker
              v-model="date"
              no-title
              scrollable
            >
              <v-spacer />
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <!-- date picker ends -->
          <!-- textfield with name starts -->
          <v-text-field
            :label="auth().currentUser.displayName"
            class="mx-3 my-0"
            prepend-icon="person"
            disabled
          />
          <!-- textfield with name ends -->
          <!-- textarea starts -->
          <v-textarea
            height="40px"
            class="mx-2 mt-3"
            hint="Please give a small description of what you are working on today."
            name="input-7-4"
            label="What are you working on today?"
          />
          <!-- Submit button starts -->
          <v-layout class="justify-end">
            <v-btn
              class="justify-center mx-auto instructions font-weight-bold black--text elevation-24"
            >
              submit
            </v-btn>
            <!-- Submit button ends -->
          </v-layout>
        </v-card-text>
        <!-- textarea ends -->
      </v-card>
      <!-- intructions end -->

      <!-- centers starts -->
      <v-card
        class="justify-center mx-1 elevation-24 grids"
        raised
        max-height="350px"
        max-width="240px"
        min-width="240px"
        style="overflow:auto;"
      >
        <v-card-title
          primary-title
          class="justify-center centers darken-4 elevation-12 py-1"
        >
          <h3 class="title white--text text--accent-2">
            <v-icon
              color="white"
              medium
              class="mr-2 white--text"
            >
              location_city
            </v-icon>Centers
          </h3>
        </v-card-title>

        <div class="mb-2">
          <table class="mx-2">
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in centers"
                :key="item.name"
              >
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <td
                      class="text-truncate"
                      style="max-width:190px"
                    >
                      <v-btn
                        class="px-2 py-0 ma-0 caption"
                        flat
                        v-on="on"
                      >
                        {{ index+1 }} - {{ item.name }}
                      </v-btn>
                    </td>
                  </template>
                  <span>{{ item.name }}</span>
                </v-tooltip>
              </tr>
            </tbody>
          </table>
        </div>
      </v-card>
      <!-- centers ends -->
    </v-layout>
    <!-- statistics layout starts -->
    <v-layout
      class="mx-5 mb-5 pb-5"
      flat
      wrap
      justify-center
    >
      <!-- statistics starts -->
      <v-card
        class="mx-2 mt-2 elevation-24 grids statistics-card"
        min-width="500px"
      >
        <v-card-title
          primary-title
          class="justify-center statistics-right darken-4 elevation-12 py-1"
        >
          <h3 class="title white--text text--accent-2">
            <v-icon
              large
              class="mr-2 white--text"
            >
              equalizer
            </v-icon>Scores history in your centers
          </h3>
        </v-card-title>
        <div>
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="black"
            elevation="12"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="3"
              padding="16"
            />
          </v-sheet>
        </div>
      </v-card>
      <!-- statistics ends -->
      <!-- statistics starts -->
      <v-card
        class="mx-2 mt-2 elevation-24 grids statistics-card"
        max-height="170px"
        min-width="500px"
      >
        <v-card-title
          primary-title
          class="justify-center statistics darken-4 elevation-12 py-1"
        >
          <h3 class="title white--text text--accent-2">
            <v-icon
              large
              class="mr-2 white--text"
            >
              timeline
            </v-icon>Weekly Attendance in centers
          </h3>
        </v-card-title>
        <div
          style="overflow-x:auto;"
          class="mb-5"
        >
          <div>
            <v-sheet
              class="v-sheet--offset mx-auto"
              elevation="12"
            >
              <v-sparkline
                class="black--text"
                :labels="days"
                :value="attendance"
                line-width="3"
                padding="16"
              />
            </v-sheet>
          </div>
        </div>
      </v-card>
      <!-- statistics ends -->
    </v-layout>
    <!-- statistics layout ends -->
  </v-layout>
  <!-- </div> -->
</template>

<script>
import { mapGetters, mapActions, mapMutation } from "vuex";
import { directive as onClickaway } from "vue-clickaway";
import Sidemenu from "@/components/RoleComponents/supervisorComponents/SupervisorSidemenu.vue";
export default {
  name: "SupervisorDashboard",
  components: { Sidemenu },
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      direccion: {
        notification:
          "Zomnia and Giseh have set up a meeting  on Tuesday, August 27th at 9:00 am at Jean Piaget, Santiago."
      },
      centers: [
        { name: "Centro de Formación Integral de Clase (CEFORMA) " },
        { name: "Centro de Maimón Puerto Plata" },
        { name: "Centro Tecnológico Comunitario Juan López " },
        { name: "Centro Tecnológico Comunitario San Victor/ Moca " },
        { name: "Centro Tecnológico de Gaspar Hernández" },
        { name: "Centro Universitario Regional de Bonao " },
        { name: "Colegio Simón Bolívar" },
        { name: "Instituto de Inglés  ENCOM " },
        { name: "Jean Piaget " },
        { name: "Liceo Carmen Digna Evangelista, Dajabon " },
        { name: "Liceo Jorge Sterling Echavarría Mendoza, Stgo Rodriguez " },
        { name: "Liceo José Martí, Monte Cristi" },
        { name: "Liceo Juan Pablo Duarte, Monción" },
        { name: "UASD Santiago (CURSA)" }
      ],
      labels: [
        "Bc1-m",
        "Bc1-f",
        "Bc2-m",
        "Bc2-f",
        "In1-m",
        "In1-f",
        "In2-m",
        "In2-f",
        "Ad1-m",
        "Ad1-f"
      ],
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      value: [200, 675, 410, 390, 310, 460, 250, 240],
      attendance: [675, 500, 650, 675, 310]
    };
  },
  methods:{
     
  },
  computed: {
    ...mapGetters([
      "auth",
      "checkIsLoggedIn",
      "getSupervisorSideMenu",

    ])
  },

};
</script>
<style scoped>
.statistics-right {
  background: rgb(116, 49, 110);
  background: linear-gradient(90deg, rgb(153, 23, 0) 14%, rgb(0, 0, 0) 78%);
}
.statistics {
  background: rgb(116, 49, 110);
  background: linear-gradient(90deg, rgb(0, 0, 0) 20%, rgb(119, 128, 0) 78%);
}
.centers {
  background: linear-gradient(
    0deg,
    rgba(2, 2, 32, 1) 33%,
    rgba(88, 17, 254, 1) 100%
  );
}
.instructions {
  background: rgb(79, 177, 83) !important;
  background: linear-gradient(
    0deg,
    rgb(27, 117, 30) 42%,
    rgba(59, 200, 4, 0.904) 100%,
    rgb(28, 28, 218) 100%
  ) !important;
}
.orangish {
  background: linear-gradient(
    0deg,
    rgba(5, 69, 70, 1) 34%,
    rgba(218, 153, 13, 1) 100%
  ) !important;
}
.grids {
  border-radius: 5px !important;
}
.wrapper-div {
  border-radius: 5px !important;
}
.main-card {
  border-radius: 5px !important;
}
@media screen and (max-width: 960px) {
  .grids {
    margin-top: 5% !important;
  }
  .wrapper {
    margin: 0% !important;
    min-width: 520px !important;
    margin-top: 5% !important;
  }
  .statistics-card {
    min-width: 380px !important;
    margin: 0 !important;
    padding: 0% !important;
    margin-top: 5% !important;
  }
  .wrapper-div {
    padding: 0% !important;
    margin-top: 5% !important;
  }
}
@import url("https://fonts.googleapis.com/css?family=Lexend+Exa|Oswald&display=swap");
.title {
  font-family: "Oswald", sans-serif !important;
  font-weight: lighter !important;
}
</style>

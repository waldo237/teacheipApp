<template>
  <div class="mx-5 mb-5 pb-5 wrapper">
    <v-layout class="mx-5 py-1 mt-3 elevation-10 justify-center wrapper-div sign-up" wrap>
      <v-card class="display-1 sign-up" flat>
        <v-icon class="white--text mb-1" large>dashboard</v-icon>Dashboard
      </v-card>
    </v-layout>
    <v-layout class="mx-5 mb-5 pa-3 px-2 pb-5 pt-1 elevation-24 main-card" wrap>
      <v-layout class="mx-2 px-1 justify-center " flat wrap>
        <!-- upcoming events starts -->
        <v-card
          class="justify-center mx-1 elevation-24 grids"
          raised
          max-height="350px"
          max-width="400px"
          min-width="380px"
          >
          <v-card-title primary-title class="justify-center yellow darken-4 elevation-12 py-2">
            <h3 class="title white--text text--accent-2">
              <v-icon large class="mr-2">alarm</v-icon>Upcoming events
            </h3>
          </v-card-title>
          <v-card-text>May 6, 2010 - Note that this article is about creating rounded corners in Photoshop. ... (V), (CTRL+D) (CTRL+T), (CTRL+ENTER) you can get bloody quick at doing this ... The lazy radius problem occurs when your curve doesn't go a full 90 ...</v-card-text>
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
          <v-card-title primary-title class="instructions justify-center elevation-12 py-2">
            <h3 class="title white--text text--accent-2">
              <v-icon large class="mx-2">sms</v-icon>Task Report
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
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <!-- date picker ends -->
            <!-- textfield with name starts -->
            <v-text-field
              :label="getCurrentUser.displayName"
              class="mx-3 my-0"
              prepend-icon="person"
              disabled
            ></v-text-field>
            <!-- textfield with name ends -->
            <!-- textarea starts -->
            <v-textarea
              height="40px"
              class="mx-2 mt-3"
              hint="Please give a small description of what you are working on today."
              name="input-7-4"
              label="What are you working on today?"
            ></v-textarea>
            <!-- Submit button starts -->
            <v-layout class="justify-end">
              <v-btn
                class="justify-center mx-auto instructions font-weight-bold black--text elevation-24"
              >submit</v-btn>
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
          <v-card-title primary-title class="justify-center centers darken-4 elevation-12 py-2" >
            <h3 class="title white--text text--accent-2">
              <v-icon large class="mr-2 white--text">location_city</v-icon>Centers
            </h3>
          </v-card-title>
          
          <div class="mb-2">
            <table class="mx-2">
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in centers" :key="item.name">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <td class="text-truncate" style="max-width:190px">
                        <v-btn
                          class="px-2 py-0 ma-0 caption"
                          flat
                          v-on="on"
                        >{{index+1}} - {{ item.name }}</v-btn>
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
      <v-layout class="mx-5 mb-5  pb-5  justify-start " flat wrap>
   <!-- statistics starts -->
        <v-card
          class=" mr-2 mt-2 elevation-24 grids statistics-card"
          max-width="500px"
          min-width="500px"
        >
          <v-card-title primary-title class="justify-center statistics-right darken-4 elevation-12 py-2">
            <h3 class="title white--text text--accent-2">
              <v-icon large class="mr-2 white--text">location_city</v-icon>Scores history in your centers
            </h3>
          </v-card-title>
          <div>
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="black"
          elevation="12"
          
        >
          <v-sparkline
          style="
  transform: rotate(-90deg) ;
	transform-origin: left top ;"
            :labels="labels"
            :value="value"
            color="white"
            line-width="3"
            padding="16"

          ></v-sparkline>
        </v-sheet>


              </div>
            </v-card>
            <!-- statistics ends -->
            <!-- statistics starts -->
            <v-card
              class=" ml-2 mt-2 elevation-24 grids statistics-card"
              max-width="500px"
              min-width="500px"
            >
          <v-card-title primary-title class="justify-center statistics darken-4 elevation-12 py-2">
            <h3 class="title white--text text--accent-2">
              <v-icon large class="mr-2 white--text">location_city</v-icon>Weekly Attendance in centers
            </h3>
          </v-card-title>
          <div style="overflow-x:auto;" class="mb-5"></div>
        </v-card>
        <!-- statistics ends -->
      </v-layout>
   <!-- statistics layout ends -->
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutation } from "vuex";
let route = "";
export default {
  name: "dashboard",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
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
        'Basic 1-midterm',
        'Basic 1-final',
        'Basic 2-midterm',
        'Basic 2-final',
       'Intermediate 1-midterm',
        'Intermediate 1-final',
       'Intermediate 2-midterm',
        'Intermediate 2-final',
       'Advanced 1-midterm',
        'Advanced 1-final',
       
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
    };
  },
  methods: {
    ...mapActions(["fetchUsers", "setParams"])
  },
  computed: mapGetters(["getUsers", "getParams", "getCurrentUser"]),
  async created() {
    await this.$store.commit('setLoggedIn', true)
    await this.$store.commit("setParams", JSON.stringify(route));
    this.fetchUsers();
  },
  async beforeRouteEnter(to, from, next) {
    route = await to.params;
    next(route);
  }
};
</script>
<style scoped>
.statistics-right {
  background: rgb(116, 49, 110);
  background: linear-gradient(
    90deg,
    rgb(153, 23, 0) 14%,
    rgb(0, 0, 0) 78%
  );
}
.statistics {
  background: rgb(116, 49, 110);
  background: linear-gradient(
    90deg,
    rgb(247, 27, 100) 14%,
    rgb(206, 172, 19) 78%
  );
}
.centers {
  background: rgb(116, 49, 110);
  background: linear-gradient(
    90deg,
    rgba(116, 49, 110, 1) 14%,
    rgba(16, 16, 177, 1) 78%
  );
}
.instructions {
  background: rgb(79, 177, 83) !important;
  background: linear-gradient(
    90deg,
    rgba(79, 177, 83, 1) 42%,
    rgba(92, 250, 29, 0.904) 100%,
    rgb(28, 28, 218) 100%
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
    min-width: 400px !important;
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

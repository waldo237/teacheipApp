
<template>
  <v-container class="mb-5 pb-5">
    <!-- alternative circular loading starts -->
    <v-layout row wrap justify-center v-if="stillLoading" class="ma-5 pa-5">
      <loading />
    </v-layout>
    <!-- alternative circular loading endsd -->
    <v-content v-else class="mt-5">
      <v-layout column wrap justify-center class="mb-5 pb-5">
        <v-btn outline @click="goBack" round color="blue darken-4 mt-5">Volver atrás</v-btn>
        <!-- GENERAL INFORMATION STARTS-->
        <v-card min-width="360px" class="grey lighten-3" flat>
          <v-card-title
            primary-title
            class="sign-in title text-uppercase bigWords"
          ><v-layout row wrap justify-center>
            {{currentCenter.centro}}
          </v-layout></v-card-title>
          <v-layout column class="general-information">
            <v-layout row wrap justify-start class="ma-2">
              <span class="bigWords mx-1">Nombre del Centro:</span>
              {{ currentCenter.centro }}
            </v-layout>
            <v-layout row wrap justify-start class="ma-2">
              <span class="bigWords mx-1">Region:</span>
              {{ currentCenter.region }}
            </v-layout>
            <v-layout row wrap justify-start class="ma-2">
              <span class="bigWords mx-1">Provincia:</span>
              {{ currentCenter.provincia }}
            </v-layout>
            <v-layout row wrap justify-start class="ma-2">
              <span class="bigWords mx-1">municipio:</span>
              {{ currentCenter.municipio }}
            </v-layout>
            <v-layout row wrap justify-start class="ma-2">
              <span class="bigWords mx-1">Responsable:</span>
              {{ currentCenter.nameOfResponsible }}
            </v-layout>
            <v-layout row wrap justify-start class="ma-2">
              <span class="bigWords mx-1">Contacto:</span>
              <a :href="'tel:'+currentCenter.phone">{{ currentCenter.phone }}</a>
            </v-layout>
            <v-layout row wrap justify-start class="ma-2">
              <span class="bigWords mx-1">Email:</span>
              <a :href="'mailto:'+currentCenter.email">{{ currentCenter.email }}</a>
            </v-layout>
            <v-layout row wrap justify-start class="ma-2">
              <span class="bigWords mx-1">supervisor:</span>
              {{ currentCenter.supervisor }}
            </v-layout>
            <v-layout row wrap justify-start class="ma-2">
              <span class="bigWords mx-1">Serie de Libro:</span>
              {{ currentCenter.libro }}
            </v-layout>
          </v-layout>
        </v-card>
        <!-- GENERAL INFORMATION ENDS-->

        <!-- REPORTS STARTS-->
        <v-layout row wrap justify-space-around class="mt-3">
          <v-card class="grey lighten-3 elevation-18 mx-2" max-width="400px">
            <v-card-title primary-title width="300px" class="title">
              Ultimo reporte hecho por {{currentCenter.nameOfResponsible}}
              
            </v-card-title>
            <span class="body-1 mx-4">{{new Date()}}</span> 
            <v-layout row wrap justify-center align-center>
              <v-card
             
                flat
                class="grey lighten-3 pa-2 ma-2"
              >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</v-card>
            </v-layout>
          </v-card>
          <v-card class="grey lighten-3 pa-2 mx-2">
            <v-card-title primary-title min-width="300px" class="title">
              Reporte de supervisor
            </v-card-title>
             <span class="body-1">{{new Date()}}</span> 
              <v-textarea solo name="input-7-5" label="Escribir reporte"></v-textarea>
            <v-card-actions>
              <v-btn outline color="red" round small>Enviar al coordinador</v-btn>
              <v-btn outline color="enviar a correo electronico" round small>enviar por email</v-btn>
              <v-btn outline color="green" round small>guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
        <!-- REPORTS ENDS-->

        <!-- STATISTICS STARTS -->
        <v-layout class flat wrap justify-center>
          <v-card
            flat
            class="mx-2 mt-2 elevation-24 grids black statistics-card"
            min-width="500px"
            dark
          >
            <v-card-title class="statistics-right">
              <h3 class="title text--accent-2 py-2">
                <v-icon large class="mr-2 white--text">equalizer</v-icon>Historial de calificaciones
              </h3>
            </v-card-title>
            <div>
              <v-sheet class="v-sheet--offset mx-auto" color="black" elevation="12">
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

          <v-card
            class="mx-2 mt-2 elevation-24 grids statistics-card"
            max-height="210px"
            min-width="500px"
          >
            <v-card-title primary-title class="statistics darken-4 py-1 mb-2">
              <h3 class="title white--text text--accent-2 py-2">
                <v-icon large class="mr-2 white--text">timeline</v-icon>Asistencia semanal
              </h3>
            </v-card-title>
            <div style="overflow-x:auto;" class="mb-5">
              <div>
                <v-sheet class="v-sheet--offset mx-auto" flat>
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
        </v-layout>
      </v-layout>
      <!-- STATISTICS ENDS -->
    </v-content>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import loading from "@/components/loading.vue";
export default {
  components: { loading },
  data() {
    return {
      currentCenter: null,
      stillLoading: true,
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
  methods: {
    ...mapActions(["fetchCenters"]),
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    calculateTotal() {
      return !this.currentCenter
        ? 0
        : this.currentCenter.homework * 0.1 +
            this.currentCenter.classwork * 0.1 +
            this.currentCenter.pba * 0.3 +
            this.currentCenter.midterm * 0.25 +
            this.currentCenter.final * 0.25;
    },
    ...mapGetters(["superCenters"])
  },
  watch: {
    currentCenter() {
      this.stillLoading = false;
    }
  },
  async created() {
    await this.fetchCenters();
    this.$route.params.id;
    this.currentCenter = await this.superCenters.find(
      center => center.uuid == this.$route.params.id
    );
  }
};
</script>
<style scoped>
.bigWords {
  font-family: "Bebas Neue", serif !important;
}
.statistics-right {
  background: rgb(116, 49, 110);
  background: linear-gradient(90deg, rgb(153, 23, 0) 14%, rgb(0, 0, 0) 78%);
}
.statistics {
  background: rgb(116, 49, 110);
  background: linear-gradient(90deg, rgb(0, 0, 0) 20%, rgb(119, 128, 0) 78%);
}

@media screen and (max-width: 960px) {
  .general-information {
    font-size: 90% !important;
  }
  .grids {
    margin-top: 5% !important;
  }
  .statistics-card {
    min-width: 380px !important;
    margin: 0 !important;
    padding: 0% !important;
    margin-top: 5% !important;
  }
}
</style>
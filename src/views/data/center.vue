
<template>

  <v-container class="mb-5 pb-5">
       <!-- alternative circular loading starts -->
    <v-layout
      row
      wrap
      justify-center
      v-if="stillLoading"
      class="ma-5 pa-5"
    >
      <loading />
    </v-layout>
    <!-- alternative circular loading endsd -->
    <v-content v-else >
        <v-layout column wrap justify-center class="mb-5 pb-5">
           <v-btn outline @click="goBack" round color="blue darken-4 mt-5">Volver atrás</v-btn>
            <v-card min-width="360px" class="grey lighten-3" flat>
                <v-card-title primary-title class="sign-in title  text-uppercase bigWords">
                    información del centro
                </v-card-title>
                    <v-layout row wrap justify-start class="mx-3">
                        <span class="bigWords mx-1">Nombre del Centro:  </span>{{currentCenter.centro}} 
                    </v-layout>
                    <v-layout row wrap justify-start  class="mx-3">
                    <span class="bigWords  mx-1">Region: </span>  {{currentCenter.region}}
                    </v-layout>
                    <v-layout row wrap justify-start  class="mx-3">
                    <span class="bigWords  mx-1">Provincia:  </span>  {{currentCenter.provincia}}
                    </v-layout>
                    <v-layout row wrap justify-start  class="mx-3">
                    <span class="bigWords  mx-1">municipio:  </span>  {{currentCenter.municipio}}
                    </v-layout>
                    <v-layout row wrap justify-start  class="mx-3">
                    <span class="bigWords  mx-1">Responsable:  </span>  {{currentCenter.nameOfResponsible}}
                    </v-layout>
                    <v-layout row wrap justify-start  class="mx-3">
                    <span class="bigWords  mx-1">Contacto:  </span>  {{currentCenter.phone}}
                    </v-layout>
                    <v-layout row wrap justify-start  class="mx-3">
                    <span class="bigWords  mx-1">Email:  </span>  {{currentCenter.email}}
                    </v-layout>
                    <v-layout row wrap justify-start  class="mx-3">
                    <span class="bigWords  mx-1">supervisor:  </span>  {{currentCenter.supervisor}}
                    </v-layout>
                    <v-layout row wrap justify-start  class="mx-3">
                    <span class="bigWords  mx-1">Serie de Libro:  </span>  {{currentCenter.libro}}
                    </v-layout>
            </v-card>
          
            
        </v-layout>
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
    };
  },
  methods: {
    ...mapActions(["fetchCenters"]),
    goBack(){
        this.$router.go(-1)
    }

  },
  computed: {
          calculateTotal(){
            
     return (!this.currentCenter)? 0 :  (this.currentCenter.homework * 0.10)+
                  (this.currentCenter.classwork * 0.10) +
                  (this.currentCenter.pba * 0.30) +
                  (this.currentCenter.midterm * 0.25) +
                  (this.currentCenter.final * 0.25)
    },
    ...mapGetters(["superCenters"])
  },
watch:{
    currentCenter(){
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

.bigWords{
   font-family: "Bebas Neue", serif !important;
}
</style>
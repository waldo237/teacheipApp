<template>
  <div class="home">
    <!-- carousel starts -->
    <Carousel />
    <!-- carousel ends -->

    <v-layout class="justify-center mt-4 mb-5 pb-5" flat wrap>
      <v-card class="mx-2 justify-center elevation-5 mt-2" flat wrap min-width="80%">
        <v-layout class="justify-center" flat wrap>
                   <v-divider color=#135393 ></v-divider>  <v-divider color="#d13c34" vertical></v-divider>
 <v-card-title class="display-1 font-weight-bold my-0 text-xs-center">The English Immersion Program</v-card-title>   <v-divider color=#d13c34 vertical></v-divider>       <v-divider color=#135393></v-divider>

        </v-layout>
        <v-layout class="justify-center mb-2 pb-2" flat wrap>
          <!-- story starts -->
          <v-card
            class="justify-center mx-1 elevation-24 grids mt-2"
            raised
            max-height="350px"
            max-width="280px"
            min-width="280px"
            style="overflow:auto;"
          >
            <v-card-title
              primary-title
              class="justify-center the-program elevation-12 title py-2"
            >History of the Program</v-card-title>
            <v-card-text class="text-lg-justify text-md-justify text-sm-justify text-xs-justify" >
              The English Immersion for Competitiveness began in 2004 when the MESCyT, in conjunction with the 
              Center for Export and Investment of the Dominican Republic ( CEI- RD ), designed this English program aimed 
              at young Dominicans of scarce economic resources with the objective to increase the competitiveness of 
              the Dominican Republic in the international market through training of human resources, and thus raise 
              the quality of higher education in the country.</v-card-text>
          </v-card>
          <!-- story ends -->
          <!-- vision events starts -->
          <v-card
            class="justify-center mx-1 elevation-24 grids mt-2"
            max-height="350px"
            max-width="280px"
            min-width="280px"
          >
            <v-card-title
              primary-title
              class="justify-center the-program elevation-12 title py-2"
            >Vision</v-card-title>
            <v-card-text class="text-lg-justify text-md-justify text-sm-justify text-xs-justify">
              To provide foreign language learning opportunities to the Dominican university population, to improve their
              communication ability and increase their competitiveness level, allowing greater professional and cultural
              growth, and better chances of entering the labor market.
            </v-card-text>
          </v-card>
          <!-- upcoming events ends -->
          <!-- mission start -->
          <v-card
            class="justify-center mx-1 elevation-24 grids mt-2"
            raised
            max-height="350px"
            max-width="280px"
            min-width="280px"
          >
            <v-card-title
              primary-title
              class="justify-center the-program elevation-12 title py-2"
            >Mission</v-card-title>
            <v-card-text class="text-lg-justify text-md-justify text-sm-justify text-xs-justify">
              To Become the leader which propels the transformation of English teaching in the Dominican Republic. Achieve
              international accreditation, gain recognition nationally and internationally for the academic quality of its
              staff and achievement of its graduates.
            </v-card-text>
          </v-card>
          <!-- mission end -->
        </v-layout>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/carousel.vue";

export default {
  name: "home",
  components: {
    Carousel
  }
};
</script>
<style>
.the-program {
  background: #135393 !important;
  background: linear-gradient(90deg, #135393, #d13c34) !important;
  border-radius: 5px !important;
  color: white;
}
.grids {
  border-radius: 5px !important;
}
</style>


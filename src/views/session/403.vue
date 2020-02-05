<template functional>
  <v-layout
    class="absoluta"
    align-center
  >
    <v-card
      class="mx-auto  pa-5 absoluta grey darken-2"
      align-center
      dark
    >
      <v-layout
        row
        justify-center
      >
        <img
          src="https://drive.google.com/uc?export=view&id=1nmxv4xn--Mh_pSqyqB44KUzSRlDD8aLN"
          lazy-src="https://drive.google.com/uc?export=view&id=1nmxv4xn--Mh_pSqyqB44KUzSRlDD8aLN"
          alt
          width="300px"
          class="ma-0 pa-0"
        >
      </v-layout>
      <v-layout
        row
        wrap
        justify-center
        class="display-2 mx-auto text-uppercase  bigWords"
      >
        We are so sorry, friend!
        <v-card-text class="title mx-auto">
          <v-layout
            row
            justify-center
          >
            403. You're not authorized to access content!
          </v-layout>
        </v-card-text>
      </v-layout>
      <v-card-actions>
        <v-btn
          text
          block
          dark
          round
          class="info darken-3 white--text "
          to="/"
        >
          Back
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
export default {

    name: "NotFound",
    data(){
        return{
          
        }
    }, 
}
</script>
<style >
.absoluta {
  position: absolute;
height: 100% !important;
  width: 100% !important;
  z-index: 1;
}
.bigWords{
   font-family: "Bebas Neue", serif !important;
}
</style>
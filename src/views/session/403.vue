<template functional>
  <v-layout
    class="absoluta"
    align-center
  >
    <v-card
      class="mx-auto round pa-5 absoluta"
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
          width="400px"
          class="ma-0 pa-0"
        >
      </v-layout>
      <v-layout
        row
        wrap
        justify-center
        class="display-2 mx-auto text-uppercase"
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
          class="info darken-3 white--text round"
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
    async created() {
     
  },
 
}
</script>
<style >
.absoluta {
  position: absolute;
  top: 2%;
  width: 100% !important;
  z-index: 1;
}
</style>
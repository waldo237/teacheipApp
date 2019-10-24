<template functional>

      <v-layout
        class="absoluta "
        align-center
      >
        <v-card
          class="mx-auto round pa-5 absoluta"
          align-center
          dark
        >
            <v-layout row justify-center >
            <img
              src="../../assets/angry.gif"
              alt=""
              width="400px"
              class="ma-0 pa-0"
            >
              
            </v-layout>
          <v-layout row wrap justify-center  class="display-2 mx-auto text-uppercase">
         
            We are so sorry, friend! 
       
          <v-card-text class="title mx-auto ">
            <v-layout row justify-center>
              
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
export default {
    name: "NotFound",
    data(){
        return{

        }
    },
    async created() {
     this.$store.commit('setFullScreen',false);
  }
}
</script>
<style >
.absoluta{
  position:absolute;
  top: 2%;
  width: 100% !important;
  z-index: 1;
}
</style>
<template >

    <v-card
      class=" pa-5  absoluta grey lighten-2"
      height="100%"
       >
        <v-layout
          row
          justify-center
          class="mt-5"
        >
          <img
            src="https://drive.google.com/uc?export=view&id=1ArIdCiWqD27Pm87xMgNPB94IOVZoSd5G"
            lazy-src="https://drive.google.com/uc?export=view&id=1ArIdCiWqD27Pm87xMgNPB94IOVZoSd5G"
            alt=""
            width="300px"
          >
        </v-layout>
        <v-layout
          row
          justify-center
          class="display-2 mx-auto text-uppercase bigWords"
        >
          We are so sorry, friend! 
        </v-layout>
 
        <v-layout
          row
          justify-center
          class=" title bigWords"
        >
          404. There is no page here.
        </v-layout>
      <v-card-text class="body-2">
        <v-layout
          row
          justify-center
        >
          But hey! maybe one day we'll put something here!
        </v-layout>
      </v-card-text>

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
    </v-card>
</template>
<script>
export default {
    name: "NotFound",
    data(){
        return{

        }
    },
}
</script>
<style >
.absoluta{

  width: 100% !important;
  height: 100% !important;
  z-index: 1;
}
.bigWords{
   font-family: "Bebas Neue", serif !important;
}
</style>
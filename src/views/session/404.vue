<template functional>
  <v-layout
    class="absoluta my-5"
    justify-center
  >
    <v-card
      class="mx-auto round pa-5 absoluta"
      justify-center
    >
      <v-card-text>
        <v-layout
          row
          justify-center
        >
          <img
            src="https://drive.google.com/uc?export=view&id=1ArIdCiWqD27Pm87xMgNPB94IOVZoSd5G"
            lazy-src="https://drive.google.com/uc?export=view&id=1ArIdCiWqD27Pm87xMgNPB94IOVZoSd5G"
            alt=""
            width="400px"
          >
        </v-layout>
      </v-card-text>
      <v-card-text class="display-2 mx-auto text-uppercase">
        <v-layout
          row
          justify-center
        >
          We are so sorry, friend! 
        </v-layout>
      </v-card-text>
      <v-card-text class="display-2 mx-auto ">
        <v-layout
          row
          justify-center
        >
          404. There is no page here.
        </v-layout>
      </v-card-text>
      <v-card-text class="body-2 ml-5">
        <v-layout
          row
          justify-center
        >
          But hey! maybe one day we'll put something here!
        </v-layout>
      </v-card-text>
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
<template functional>
  <v-container>
    <v-layout>
      <v-layout
        cols="4"
        offset="4"
        class="mb-5 pb-5"
        align-center
      >
        <v-card
          class="mx-auto "
          align-center
        >
          <v-card-text>
            <img
              src="../../assets/done.gif"
              alt=""
              width="400px"
            >
          </v-card-text>
          <v-card-text class="display-2 mx-auto text-uppercase">
            We are so sorry, friend! 
          </v-card-text>
          <v-card-text class="display-2 mx-auto ">
            404. There is no page here.
          </v-card-text>
          <v-card-text class="body-2 ml-5">
            But hey! maybe one day we'll put something here!
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              block
              dark
              class="info darken-3 white--text"
              to="/"
            >
              Back
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
export default {
    name: "notFound",
    data(){
        return{

        }
    },
    async created() {
     this.$store.commit('setFullScreen',false);
  }
}
</script>
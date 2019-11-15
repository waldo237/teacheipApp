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
          src="https://www.petbarn.com.au/petspot/app/themes/the-marmalade-child/includes/images/dropdowns/dropdown_dog.gif"
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
        You are currently logged out!
        <v-card-text class="title mx-auto">
          <v-layout
            row
            justify-center
          >
            Please log again to continue with operation.
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
    methods:{
      doIt(){ console.log(`you're loggedout`);}
    },
    computed:{
      ...mapGetters(["auth"])
    },
    async created() {
     this.$store.commit('setFullScreen',false);
    
       this.auth()
        .signOut()
        .then(async () => {
          await this.$store.commit('setLoggedIn', false)
          await this.$store.commit('setValidated', {})
          await this.$store.commit('setAlert', false)
         
        })
        .catch((error)=>{console.log(`there was an issue logging out:${error}`)});
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
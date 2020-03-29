<template>
  <v-layout
    class="my-5 pb-5"
    align-center
  >
    <v-card
      class="mx-auto pa-5 grey darken-4"
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
          width="300px"
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
          
          
          class="info sign-up darken-3 white--text round"
          @click="toggleSU"
        >
          Sign In again
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "NotFound",
    methods:{
          ...mapActions(["toggleSU"]),
    },
    computed:{
      ...mapGetters(["auth"])
    },
    async created() {
       this.auth()
        .signOut()
        .then(async () => {
          await this.$store.commit('setLoggedIn', false)
          await this.$store.commit('setValidated', {})
          await this.$store.commit('setAlert', false)
          localStorage.removeItem('serverToken')
          localStorage.removeItem('permission')
          this.$emit('drawerRefresh');
        })
        .catch((error)=>{
          console.log(`there was an issue logging out`)
          // console.log(`there was an issue logging out:${error}`)
     });
  },
 
}
</script>
<style >

</style>
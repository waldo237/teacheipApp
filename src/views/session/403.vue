<template>
    <v-card
      class="mx-auto pa-5 grey darken-4"
      align-center
      dark
    >
    <v-card class="mb-5 pb-5 grey darken-4" align-center dark flat>
      <v-layout row justify-center>
        <img
          src="https://drive.google.com/uc?export=view&id=1nmxv4xn--Mh_pSqyqB44KUzSRlDD8aLN"
          lazy-src="https://drive.google.com/uc?export=view&id=1nmxv4xn--Mh_pSqyqB44KUzSRlDD8aLN"
          alt
          width="300px"
          class="ma-0 pa-0"
        />
      </v-layout>
      <v-layout row wrap justify-center class="display-2 mx-auto text-uppercase bigWords">
        Lo sentimos, querido usuario!
        <v-card-text class="title mx-auto">
          <v-layout row justify-center align-center>403. No es posible acceder a este contenido con la sesión actual!</v-layout>
        </v-card-text>
      </v-layout>
      <v-btn small block round class="sign-up darken-3 white--text" @click="toggleSU">Iniciar sesión</v-btn>
      <v-btn small block dark round class="  darken-3 white--text" to="/">Ir a pagina principal</v-btn>
    </v-card>

    </v-card>
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
.bigWords {
  font-family: "Bebas Neue", serif !important;
}
</style>
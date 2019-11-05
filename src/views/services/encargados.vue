<template>
  <v-container class="ma-5 pa-5" grid-list-xs>
    <v-layout justify-center>
  <v-card
          v-for="item in getEncargados"
          :key="item.name"
          max-width="380px"
          min-width="380px"
          dark
          class="my-2 mx-auto elevation-10 round justify-center mx-1 elevation-24 grids mt-2 hovering"
        >        
        <v-card-title  >
          <v-layout justify-center>
          <v-avatar
            size="90"
            color="red"
          >
            <img :src="item.photo" alt="alt">
          </v-avatar>
            
          </v-layout>
        </v-card-title>
        <v-card-text >
         
         <span class="title"> {{item.name}}</span><v-spacer/>
         <span > {{item.position}}</span><v-spacer/>
         <span> {{item.email}}</span><v-spacer/>
         <span>{{item.contact}}</span><v-spacer/>
         
          

        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import {mapActions, mapGetters} from "vuex"
export default {
  data(){
    return{

    }
  },
  methods:{
     ...mapActions(["fetchEncargados"]),
  },
  computed:{
        ...mapGetters(["getEncargados"]),

  },
  async created(){
    await this.fetchEncargados();
    this.getEncargados;
  }
}
</script>
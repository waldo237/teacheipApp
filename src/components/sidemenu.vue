
<template>
   <v-layout wrap justify-space-around> 
    <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
      open-on-hover
      :close-on-click="closeOnClick"
      :close-on-content-click="closeOnContentClick"
      :offset-x="offsetX"
      :offset-y="offsetY"
     
    >

      <template v-slot:activator="{ on }">
        <v-btn
         class="mt-5"
          color="info"
          dark
          v-on="on"
        >
         <v-icon>school</v-icon>ACADEMIC
        </v-btn>
      </template>
      <v-list v-for="(item, i) in getNavigation.privateNav"
          :key="i"
           
          >
          
        <v-list-tile
         >
             <router-link
            tag="v-btn"
            style="background-color:white"
            :to="item.link"
            :class="item.class"
          > <v-icon>{{item.icon}}</v-icon>{{ item.title }}</router-link>
        </v-list-tile>
      </v-list>
    </v-menu>

   </v-layout>

</template>
   
<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      disabled: false,
      absolute: false,
      openOnHover: false,
      value: false,
      closeOnClick: true,
      closeOnContentClick: true,
      offsetX: false,
      offsetY: true,
    }
  },
  computed: mapGetters(["getNavigation"]),
  created() {}
};
</script>

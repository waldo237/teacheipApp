<template>
  <div id="app" data-app>
      <v-layout id="masthead" align-center class="text-no-wrap text-center mt-5 ">
        <v-flex lg8 md6 sm3  ma-auto  class="d-flex align-center mt-5">
          <v-card flat class="text-center " >
            <v-flex lg5 md10 sm12 xs3 ma-auto class="d-flex align-center">
            <a href="https://teacheip.com/" rel="home">
               <v-img
                id="logo"
                alt="Direccion de Lenguas Extranjeras"
                src="https://eipschool.files.wordpress.com/2019/06/mescyt-revela-nueva-imagen-institucional.jpeg"
                lazy-src="https://eipschool.files.wordpress.com/2019/06/mescyt-revela-nueva-imagen-institucional.jpeg"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="200"
                max-height="150"
              ></v-img>
            </a>
            </v-flex>
            <v-card flat class="mx-auto ">
              <transition >
              <v-card-title xs10 class=" site-title display-3 page-title font-weight-bold">
                <a href="https://teacheip.com/" rel="home">
                  Direccion de Lenguas
                  Extranjeras
                </a>
              </v-card-title >
              </transition>
              <v-card-title
                class="title mx-auto page-title">
                An
                Academic Community for the English Immersion Program
              </v-card-title>
            </v-card>
            <!-- .site-branding-text -->
          </v-card>
          <!-- .site-branding -->
        </v-flex >
        <!-- .header-wrapper -->
       <Menu/>       
        <!-- .menu-wrapper -->
      </v-layout>
 
    <router-view />
    <Footer/>
  </div>
</template>
<style>

@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

@import url('https://fonts.googleapis.com/css?family=Karla&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');


html, body {
  font-family: 'Karla', sans-serif;
}

#app {
  font-family: 'Karla', sans-serif;
}
.page-title{
font-family: 'Roboto Slab', serif ;
font-weight:500
}

@media screen and (max-width: 800px) {
#logo{
width:96px;
height:75px;
background-color: black;
}

.page-title{
font-size: 98% !important;
padding: 2%;
font-family: 'Roboto Slab'
}


}
.site-title:hover{
  animation-duration: 1.5s;
  animation-name: rubberBand;
  animation-timing-function: ease-in-out;
  display: block;
  color: white;
}

a{
  text-decoration: none;
  color: black;
}
</style>


<script>
import 'vuetify/dist/vuetify.min.css'
import Menu from '@/components/menu.vue'
import Footer from '@/components/footer.vue';
export default {
 name: 'site-heade',
 data(){
   return{
   }
 },
 components: {
   Menu, 
   Footer
 },
   
 created(){
        
    },
}
</script>
<template>
  <div id="app" data-app >
      <v-layout id="masthead" align-center class="text-no-wrap text-center mt-4 ">
        <v-flex xl6 lg6 md8 sm6  ma-auto  class="d-flex align-center mt-5">
          <v-card flat class="text-center " id="logo" >
            <v-flex lg5 md8 sm12 xs3 ma-auto class="d-flex align-center">
            <a href="https://teacheip.com/" rel="home">
               <v-img
                
                alt="Direccion de Lenguas Extranjeras"
                src="https://eipschool.files.wordpress.com/2019/06/mescyt-revela-nueva-imagen-institucional.jpeg"
                lazy-src="https://eipschool.files.wordpress.com/2019/06/mescyt-revela-nueva-imagen-institucional.jpeg"
                aspect-ratio="1"
                id="img-mescyt"
                class="grey lighten-2 mx-auto"
                max-width="200"
                max-height="150"
              ></v-img>
            </a>
            </v-flex>
            <v-card flat >
              <transition >
              <v-card-title xs10 class=" titles display-2 font-weight-bold">
                <a href="https://teacheip.com/" rel="home" class="mx-auto site-title blue--text text--darken-4">
                  Direccion de Lenguas
                  Extranjeras
                </a>
                <div class="mx-auto">

                <v-card-text
                class="title page-title"
                xl8 lg5 >
                An
                Academic Community for the English Immersion Program
              </v-card-text>
                </div>
              </v-card-title>
              </transition>
              
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
@import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');

html, body {
  font-family: 'Karla', sans-serif;
}

#app {
  font-family: 'Karla', sans-serif;
}
.v-card-title{
font-family: 'Oswald', sans-serif;
}

@media screen and (max-width: 960px) {

#img-mescyt{
  width: 80% ;

 
}

.site-title{
font-size: 60% !important;
padding: 0%;
}
.page-title{
font-size: 30% !important;
padding: 0%;
}

}

.titles{
  font-family: 'Oswald', sans-serif !important;
}
.titles:hover{
  color: #d13c34;
  animation-duration: 1.5s;
  animation-name: rubberBand;
  animation-timing-function: ease-in-out;
  
}

a{
  text-decoration: none;
  
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
<template>
  <v-layout
      id="masthead"
      align-center
      class="text-no-wrap text-center mt-4"
      >
     
     <v-flex
        v-if="getFullScreen"
        xl6
        lg6
        md8
        sm6
        ma-auto
        class="d-flex align-center mt-5"
        v-cloak
        >
        <v-card
          flat
          class="text-center "
          id="logo"
        >
          <v-flex
            lg5
            md8
            sm12
            xs3
            ma-auto
            class="d-flex align-center"
          >
            <a
              href="https://teacheip.com/"
              rel="home"
            >
              <v-img
                
                alt="Direccion de Lenguas Extranjeras"
                src="https://drive.google.com/uc?export=view&id=1obnHAN71iuijto0gsL8TIpmPzO6SmXVF"
                lazy-src="https://drive.google.com/uc?export=view&id=1obnHAN71iuijto0gsL8TIpmPzO6SmXVF"
                aspect-ratio="1"
                id="img-mescyt"
                class="grey lighten-2 mx-auto"
                max-width="180"
                max-height="130"
              />
            </a>
          </v-flex>
          <v-card flat>
            <transition>
              <v-card-title
                xs10
                class=" titles display-2 font-weight-medium  pb-2"
              >
                <a
                  href="https://teacheip.com/"
                  rel="home"
                  class="mx-auto site-title "
                >
                  Direccion de Lenguas
                  Extranjeras
                </a>
                <div class="mx-auto">
                  <v-card-text
                    class="title page-title mb-0 py-1  font-italic font-weight-medium"
                    xl8
                    lg5 
                  >
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
      </v-flex>
          </v-layout>

</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        
    }
}
</script>
<template>
  <div id="carousel" >
    <v-carousel dark  >
        <div v-for="(item,i) in items"
        :key="i">
        <a :href="item.link " target="_blank">
          <v-carousel-item
            :src="item.src()"
            :lazy-src="item.src()"
            />
           
        </a>
          
        </div>
    </v-carousel>
  </div>
</template>

<style scoped>
.hero{
  background-color: rgba(0, 0, 0, 0.459);
height: 80%;}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Carousel",
  data () {
    return {
      items: [
        {
          src: function(){return"https://drive.google.com/uc?export=edit&id=1BOs7KLffSzYCmPvN03iK9CXM0Mqm3bCL"}, 
          link: '/lesson plans',
          title: 'Descarga los planes de clase'
        },
        {
          src: function(){return"https://drive.google.com/uc?export=edit&id=1l3O9eBNhPeZesBnsWiwMGKzvi3LzC6f7"}, 
          link: 'https://drive.google.com/uc?export=edit&id=1l3O9eBNhPeZesBnsWiwMGKzvi3LzC6f7',
          title:"",
        },
        {
          src: function(){return"https://drive.google.com/uc?export=edit&id=1K79L6ET5l_4U4qjkgIfJecSMy0loN_pX"},
         link: 'https://drive.google.com/uc?export=edit&id=1K79L6ET5l_4U4qjkgIfJecSMy0loN_pX',
          title:"",
        },
        {
          src: function(){return"https://drive.google.com/uc?export=edit&id=19CIkVZ4iwp54EQ3lk3--qCt3FMzzCvKl"},
         link: 'https://drive.google.com/uc?export=edit&id=19CIkVZ4iwp54EQ3lk3--qCt3FMzzCvKl',
          title:"",
        },
        {
          src: function(){return"https://drive.google.com/uc?export=edit&id=1E4W_8drQsiT4IaoXOTjLkN9Kiq8Uem2W"},
         link: 'http://certificadoingles.mescyt.gob.do/Home/Validate',
          title:"",
        }
      ]
    }
  },
  
};
</script>

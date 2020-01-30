<template>
  <div id="carousel"  class="mb-0 pt-2">
    <v-carousel   height="350px" >
        <div v-for="(item,i) in itemsWPhotos"
        :key="i">
        <a :href="item.link " target="_blank">
          <v-carousel-item
            :src="item.url"
            :lazy-src="item.url"
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
import { mapActions } from 'vuex'
import axios from 'axios';
export default {
  name: "Carousel",
  data () {
    return {
      itemsWPhotos:[],
      items: [
        {
          link: '/lesson plans',
          photo: 'downloadLP.jpg'
        },
        {
          link: '',
          photo:"graduacion 1.jpg",
        },
        {
         link: '',
          photo:"carousel1.jpeg",
        },
        {
         link: '',
          photo:"graduacion 3.jpg",
        },
        {
         link: 'http://certificadoingles.mescyt.gob.do/Home/Validate',
          photo:"carousel3.jpg",
        }
      ]
    }
  },
  methods:{
    ...mapActions([ "initializeFetch"]),
  },
 async created(){
          if(this.itemsWPhotos.length == 0){
     this.$store.commit('setArrayObjsWPhotos', this.items);
     this.itemsWPhotos = await this.initializeFetch();
   }
  }
};
</script>

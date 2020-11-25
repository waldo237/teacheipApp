<template>
  <div
    id="carousel"
    class="mb-0 pt-2"
  >
    <v-carousel height="350px" >
      <div
        v-for="(item,i) in itemsWPhotos"
        :key="i"
      >
        <a
          :href="item.link "
          target="_blank"
        >
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
import car1 from '../assets/photos/carousel1.jpg'
import car2 from '../assets/photos/graduacion 1.jpg'
import car3 from '../assets/photos/lp.png'
import car4 from '../assets/photos/cert.png'
export default {
  name: "Carousel",
  data () {
    return {
      itemsWPhotos:[
        { url:car3, link: '/lesson plans'},
      { url:car4,  link: 'http://certificadoingles.mescyt.gob.do/Home/Validate',},
      { url:car1},
      { url:car2},
      ],
 
    }
  },
  methods:{
    ...mapActions([ "initializeFetch"]),
  },
 async created(){
  //         if(this.itemsWPhotos.length == 0){
  //    this.$store.commit('setArrayObjsWPhotos', this.items);
  //    this.itemsWPhotos = await this.initializeFetch();
  //  }
  }
};
</script>

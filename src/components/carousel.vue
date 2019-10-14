<template>
  <div id="app mb-0">
    <v-carousel dark>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      />
    </v-carousel>
  </div>
</template>

<style scoped>
.hero{
  background-color: rgba(0, 0, 0, 0.459);
height: 80%;}
</style>

<script>
import graduation from '../assets/carousel/graduacion.jpg'
import certificate from '../assets/carousel/certificate.jpg'
import feria from '../assets/carousel/Feria.jpeg'
import congregation from '../assets/carousel/congregation.jpg'
export default {
  name: "Carousel",
  data () {
    return {
      items: [
        {
          src: graduation
        },
        {
          src: feria
        },
        {
          src: congregation
        },
        {
          src: certificate
        }
      ]
    }
  }
};
</script>

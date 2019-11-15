<template>
  <div id="app mb-0">
    <v-carousel dark>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        :lazy-src="item.src"
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
import { mapGetters } from 'vuex'
export default {
  name: "Carousel",
  data () {
    return {
      items: [
        {
          src:  "https://drive.google.com/uc?export=edit&id=1l3O9eBNhPeZesBnsWiwMGKzvi3LzC6f7"
        },
        {
          src: "https://drive.google.com/uc?export=edit&id=1K79L6ET5l_4U4qjkgIfJecSMy0loN_pX",
        },
        {
          src: "https://drive.google.com/uc?export=edit&id=19CIkVZ4iwp54EQ3lk3--qCt3FMzzCvKl",
        },
        {
          src: "https://drive.google.com/uc?export=edit&id=1E4W_8drQsiT4IaoXOTjLkN9Kiq8Uem2W",
        }
      ]
    }
  }
};
</script>

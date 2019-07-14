<template>
  <div class="home">
    <Carousel msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/carousel.vue'

export default {
  name: 'home',
  components: {
    Carousel
  },
}
</script>

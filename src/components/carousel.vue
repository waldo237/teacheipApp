<template>
<div id="app">
  <v-app id="inspire">
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </v-app>
</div>
<!--  
        <div class="hero">
          <div class="hero-area-wrapper">
            <div >Connect with other teachers, coordinators, supervisors, directors</div>
          <v-btn large href="https://join.slack.com/t/englishimmers-em06602/shared_invite/enQtNjgwNzUxMTkzMjk2LTJlZGU3OGViYjAzYTI4NWMzZGUwNjMyNWQ2MGMwNTIxYzk2YzFjYzYwN2QyZDUxM2Q2YzM5ZDU4NWU4ZjcxMTU" >Start</v-btn>

          
          </div>
        </div> -->
</template>

<style>
.hero{
  background-color: rgba(0, 0, 0, 0.459);
height: 80%;}
</style>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data () {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  }
};
</script>

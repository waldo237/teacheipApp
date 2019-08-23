<template>
<div id="app mb-0">
    <v-carousel dark >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      > </v-carousel-item>
    </v-carousel>
</div>

</template>

<style>
.hero{
  background-color: rgba(0, 0, 0, 0.459);
height: 80%;}
</style>

<script>

export default {
  name: "HelloWorld",
  data () {
    return {
      items: [
        {
          src: 'http://www.bachillere.com/wp-content/uploads/2018/11/Graduacion-Ingles-de-Inmersion-2018-Bachillere.jpg'
        },
        {
          src: 'https://oinvestigacion.com/wp-content/uploads/2019/05/6fc8d995-graduacion.jpg'
        },
        {
          src: 'https://ultimasnoticias.com.do/wp-content/uploads/2018/11/Feria-de-empleos.jpeg'
        },
        {
          src: 'https://eipschool.files.wordpress.com/2019/08/certificate-1.jpg'
        }
      ]
    }
  }
};
</script>

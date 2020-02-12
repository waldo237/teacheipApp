<template>
  <v-card class="mt-4 mb-4 mx-2 grey darken-4">
    <v-card
      class="card-offset mx-auto orange"
      elevation="12"
      max-width="calc(100% - 30px)"
    >
      <v-card-title>Recursos y Materiales</v-card-title>
    </v-card>
    <v-card
      class="scrollbar overflow grey darken-4 elevation-19"
      height="285px"
      max-width="300px"
    >
      <v-card-text
        v-for="(item, i) in servicios"
        :key="i"
        class="py-0 px-2"
      >
        <v-layout v-if="servicesForTeacher">
          <router-link
            tag="v-btn"
            small
            dark
            :to="item.link"
            class="my-1"
            v-if="item.class"
          >
            {{
              item.title
            }}
          </router-link>      
        </v-layout>
        <v-layout v-if="servicesForSupervisor">
          <router-link
            tag="v-btn"
            small
            dark
            :to="item.link"
            class="my-1 white--text grey darken-4"
          >
            {{
              item.title
            }}
          </router-link>      
        </v-layout>
      </v-card-text>
    </v-card>
  </v-card>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    props:['servicesForTeacher', 'servicesForSupervisor'],
    computed: {
    ...mapGetters(["servicios", "students"])
  }
}
</script>
<style>
.card-offset {
  top: -20px;
  position: relative;
}
.overflow {
  overflow-y: scroll;
  overflow-x: hidden;
  text-overflow: clip;
}
</style>
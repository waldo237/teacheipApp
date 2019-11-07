<template>
  <div>
      <v-layout  wrap justify-center>
        <div primary-title class="display-1 font-italic font-weight-black mt-5 pt-5 mx-4 px-1 ">
          Directores y Encargados de Departamentos
        </div>
      </v-layout>
    <v-layout row wrap justify-center v-if="stillLoading" class="mx-5 px-5  mb-5 pb-5 mt-0 pt-0">
      <loading />
    </v-layout>

    <v-layout v-else justify-center wrap class="mx-5 px-5  mb-5 pb-5 mt-0 pt-0">
      <v-card
        v-for="item in getEncargados"
        :key="item.name"
        max-width="280px"
        min-width="280px"
        class="my-5 mx-2 round elevation-24 move"
      >
        <v-card-title class="encargados elevation-24 mb-0 pb-0">
          <v-layout justify-center>
            <v-avatar size="90" >
              <img :src="item.photo" alt="alt" />
            </v-avatar>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <span class="title">{{item.name}}</span>
          <v-spacer />
          <span>{{item.position}}</span>
          <v-spacer />
          <span>{{item.email}}</span>
          <v-spacer />
          <span>{{item.contact}}</span>
          <v-spacer />
        </v-card-text>
      </v-card>
    </v-layout>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import loading from "@/components/loading.vue";
export default {
  components: { loading },
  data() {
    return {
      stillLoading: true
    };
  },
  methods: {
    ...mapActions(["fetchEncargados"])
  },
  watch: {
    getEncargados() {
      this.stillLoading = false;
    }
  },
  computed: {
    ...mapGetters(["getEncargados"])
  },
  async created() {
    await this.fetchEncargados();
    this.getEncargados;
    this.$store.commit("setFullScreen", false);
  }
};
</script>
<style scoped>
.encargados {
  clip-path: circle(50% 9%, 100% 0, 100% 75%, 50% 100%, 0% 75%, 0 0);
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  
}
.move:hover{
   animation-duration: 0.5s;
  animation-name: pulse;
  animation-timing-function: ease-in-out;
}
</style>
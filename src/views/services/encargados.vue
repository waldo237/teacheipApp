<template>
  <div>
    <v-layout
      wrap
      justify-center
    >
      <div
        primary-title
        class="display-1 font-weight-light  text-xs-center main-title mt-5 pt-5 mx-4 px-1 "
      >
        Directores y Encargados de Departamentos
      </div>
    </v-layout>
    <v-layout
      row
      wrap
      justify-center
      v-if="stillLoading"
      class="mx-5 px-5  mb-5 pb-5 mt-0 pt-0"
    >
      <loading />
    </v-layout>

    <v-layout
      v-else
      justify-center
      wrap
      class="mx-5 px-5  mb-5 pb-5 mt-0 pt-0"
    >
      <v-card
        v-for="item in getEncargados"
        :key="item.name"
        max-width="280px"
        min-width="280px"
        class="my-5 mx-2 round elevation-24 move grey lighten-1"
      >
        <v-card-title class="encargados mb-0 pb-0">
          <v-layout
            justify-center
            class="mb-0 pb-0"
          >
            <v-avatar
              size="90"
              class="mb-0 pb-0"
            >
              <img
                :src="item.photo"
                alt="alt"
              >
            </v-avatar>
          </v-layout>
        </v-card-title>
        <v-layout
          row
          width="100%"
          class="my-0 py-0"
        >
          <v-card
            color="#376092"
            class="blueCutSmall my-0 py-0"
            width="90%"
            height="50px"
          />
          <v-card
            id="red"
            color="sign-up"
            class=" redCutSmall my-0 py-0"
            width="60%"
            height="50px"
          />
        </v-layout>
        <v-card-text>
          <span class="title">{{ item.name }}</span>
          <v-spacer />
          <span>{{ item.position }}</span>
          <v-spacer />
          <span>{{ item.email }}</span>
          <v-spacer />
          <span>{{ item.contact }}</span>
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
  }
};
</script>
<style scoped>
.encargados {

}
.move:hover{
   animation-duration: 0.5s;
  animation-name: pulse;
  animation-timing-function: ease-in-out;
}
</style>
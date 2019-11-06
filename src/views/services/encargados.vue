<template>
<div>
   <v-layout
      row
      wrap
      justify-center
      v-if="stillLoading"
      class="ma-5 pa-5"
    >
      <loading />
    </v-layout>

      <v-layout v-else justify-center wrap class="ma-5 pb-5">
      <v-card
        v-for="item in getEncargados"
        :key="item.name"
        max-width="280px"
        min-width="280px"
        dark
        class="my-5 mx-2 round elevation-24 grids hovering"
       >
        <v-card-title class="ma-2 pa-1">
          <v-layout justify-center>
            <v-avatar size="90">
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
      stillLoading: true,

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
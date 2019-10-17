
 
<template>
  <div class="my-5 py-5">
    <v-layout row wrap justify-center v-if="stillLoading" class="ma-5 pa-5">
      <loading />
    </v-layout>
    <div v-else>
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        class="search"
      />
      <v-layout justify-center persistent>
        <v-data-table
          style="width: 80%"
          :headers="headers"
          :items="getEmployees"
          :search="search"
          class="elevation-20"
          dark
          dense
          mobile-breakpoint
          multi-sort
          show-group-by
        >
          <template v-slot:items="props">
            <td class="text-xs-left pa-3" id="name">{{ props.item.NOMBRE }}</td>
            <td class="text-xs-left mx-auto">{{ props.item.TELEFONO }}</td>
            <td class="text-xs-left">{{ props.item.GENERO }}</td>
            <td class="text-xs-left">{{ props.item.CARGO }}</td>
            <td class="text-xs-left">{{ props.item.CORREO }}</td>
            <td class="text-xs-left">{{ props.item.CARRERA }}</td>
            <td class="text-xs-left">{{ props.item.SUPERVISOR }}</td>
            <td class="text-xs-left mx-5">{{ props.item.CENTRO }}</td>
            <td class="text-xs-left">{{ props.item.REGION }}</td>
            <td class="text-xs-left">{{ props.item.PROVINCIA }}</td>
          </template>
        </v-data-table>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import loading from "@/components/loading.vue";
export default {
  components: { loading },
  data() {
    return {
      search: "",
      stillLoading: true,
      headers: [
        {
          text: "NOMBRE",
          align: "right",
          sortable: false,
          value: "NOMBRE"
        },
        { text: "TELEFONO", value: "TELEFONO" },
        { text: "GENERO", value: "GENERO" },
        { text: "CARGO", value: "CARGO" },
        { text: "CORREO", value: "CORREO" },
        { text: "CARRERA", value: "CARRERA" },
        { text: "SUPERVISOR", value: "SUPERVISOR" },
        { text: "CENTRO", value: "CENTRO" },
        { text: "REGION", value: "REGION" },
        { text: "PROVINCIA", value: "PROVINCIA" }
      ]
    };
  },
  watch: {
    getEmployees() {
      this.stillLoading = false;
    }
  },
  computed: mapGetters(["getEmployees"]),
  methods: {
    ...mapActions(["fetchEmployees"])
  },
  created: function() {
    this.fetchEmployees();
    this.$store.commit("setFullScreen", false);
  }
};
</script>
<style scoped>
.search {
  margin: 0 auto;
  width: 80%;
}
#name {
  min-width: 170px;
}
</style>

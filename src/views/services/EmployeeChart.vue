
 
<template>
  <div class="my-5 py-5">
    <v-layout
      justify-center
      row
      wrap
      primary-title
       class="display-1 font-weight-light  text-xs-center main-title mt-5 pt-5 mx-4 px-1 "
    >
      Maestros y Coordinadores
    </v-layout> 
    <v-layout
      row
      wrap
      justify-center
      v-if="stillLoading"
      class="my-5 py-5 mx-0 px-0"
    >
      <loading />
    </v-layout>
    <div v-else class="mb-5 pb-5">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar Maestros y Coordinadores"
        single-line
        hide-details
        class="search mt-2 pt-2"
        color="#c6192a"
      />
      <v-layout
        justify-center
        persistent
      >
        <v-data-table
          style="width: 98%"
          :headers="headers"
          :items="getEmployees"
          :search="search"
          class="elevation-24"
          dark
          mobile-breakpoint
          show-group-by
        >
          <template v-slot:items="props">
            <td
              class="text-xs-right px-0 pr-4"
              id="name"
            >
              {{ props.item.NOMBRE }}
            </td>
            <td class="text-xs-left  px-auto">
              {{ props.item.TELEFONO }}
            </td>
            <td class="text-xs-left  px-auto">
              {{ props.item.GENERO }}
            </td>
            <td class="text-xs-left px-auto">
              {{ props.item.CARGO }}
            </td>
            <td class="text-xs-left  px-auto">
              {{ props.item.CORREO }}
            </td>
            <td class="text-xs-left  px-auto">
              {{ props.item.CARRERA }}
            </td>
            <td class="text-xs-left  px-auto">
              {{ props.item.SUPERVISOR }}
            </td>
            <td class="text-xs-left px-0 mx-1">
              {{ props.item.CENTRO }}
            </td>
            <td class="text-xs-left  px-auto">
              {{ props.item.REGION }}
            </td>
            <td class="text-xs-left  px-auto">
              {{ props.item.PROVINCIA }}
            </td>
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
  }
};
</script>
<style scoped>
.search {
  margin:  30px auto ;
  width: 95%;
}
#name {
  min-width: 170px;
}
</style>

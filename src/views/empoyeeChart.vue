

<template>
  <div>
 <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details class="search"></v-text-field>
    <v-layout justify-center persistent>
      <v-data-table
        style="width: 80%"
        :headers="headers"
        :items="getEmployees"
        :search="search" 
        class="elevation-2"
      >
        <template v-slot:items="props">
          <td class="text-xs-left" id="name">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.center }}</td>
          <td class="text-xs-left">{{ props.item.pronvince }}</td>
          <td class="text-xs-left">{{ props.item.posicion }}</td>
        </template>
      </v-data-table>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "nombre",
          align: "right",
          sortable: false,
          value: "name"
        },
        { text: "Email", value: "email" },
        { text: "Center", value: "center" },
        { text: "Province", value: "province" },
        { text: "Position", value: "position" }
      ]
    };
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
<style>
.search{
     margin: 0 auto;
     width: 80%; 
}
#name{
    min-width: 170px;
}

</style>


<template>
  <!--side-menu starts-->
  <v-list class="list">
    <v-list-tile-title>
        <v-icon>dashboard</v-icon>DASHBOARD
    </v-list-tile-title>
        {{getNavigation()}}

    <v-list-tile v-for="item in getNavigation.publicNav" :key="item.class">
      <v-list-tile-action>
        <v-icon>{{item.icon}}</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>{{item.title}}</v-list-tile-title>
    </v-list-tile>
  </v-list>
  <!--side-menu ends-->
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: mapGetters(["getNavigation"]),
  created(){
   
  }
};
</script>

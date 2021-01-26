<template>
  <v-navigation-drawer
    app
    disable-resize-watcher
    class="grey lighten-2"
    v-model="isCoordinator"
  >
    <v-list dense>
      <template v-for="item in items">
        <v-layout
          v-if="item.heading"
          :key="item.heading"
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          :key="item.title"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.link"
          >
            <!-- <v-list-tile-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-tile-action> -->
            <v-list-tile-content>
              <v-list-tile-title>{{ child.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile
          v-else
          :key="item.title"
          @click
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import {mapGetters} from "vuex";
export default {
  props:['isCoordinator'],
  data() {
    return {
      items: [
        { icon: "dashboard", title: "DASHBOARD" },
        {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          title: "SERVICIOS",
          model: false,
          children: [
          ]
        },
        {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          title: "SOLICITUDES",
          model: false,
          children: [
          ]
        },
      ]
    };
  },
  created(){
    this.items[1].children.push(...this.servicios)
    this.items[2].children.push(...this.solicitudes)
  },
  computed:{
    ...mapGetters(["solicitudes","servicios"])
  }
};
</script>
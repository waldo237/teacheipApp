<template>
  <v-card class="mx-auto" width="300">
    <v-list>
      <v-list-tile class="mt-4 mb-3">
        <v-icon color="rgb(209, 60, 52)" medium class="mr-2 mt-2 font-weight-bold">device_hub</v-icon>
        <v-list-tile-title class="headline font-weight-bold">WORKSTATION</v-list-tile-title>
      </v-list-tile>
      <!-- ACADEMIC starts -->
      <v-list-group value="true">
        <template v-slot:activator>
          <v-list-tile-title class="ml-4">
            <v-icon color="rgb(209, 60, 52)" class="mr-2">school</v-icon>Academic
          </v-list-tile-title>
        </template>
        <v-list-tile
          v-for="(item, i) in getNavigation.academic"
          :key="i"
          :to="item.link"
          class="list"
        >
          <v-list-tile-content class="list-item ml-4" v-if="!getNavigation.academic.subfolders">
            <v-list-tile-title class="font-weight-bold caption">
              <v-icon color="rgb(19,83,147)" small class="mr-2">{{item.icon}}</v-icon>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
          <!-- subfolders -->
          <v-list-group value="true" v-if="getNavigation.academic.subfolders">
            <template v-slot:activator>
              <v-list-tile-title class="ml-4">
                <v-icon color="rgb(19,83,147)" small class="mr-2">{{item.icon}}</v-icon>
                {{ item.title }}
              </v-list-tile-title>
            </template>
            <v-list-tile
              v-for="(item, i) in getNavigation.academic.subfolders"
              :key="i"
              :to="item.link"
              class="list"
            >
              <v-list-tile-content class="list-item ml-4">
                <v-list-tile-title class="font-weight-bold caption">{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <!-- ACADEMIC ends -->

    <!-- ADMINISTRATIVE starts -->
    <v-list>
      <!-- ACADEMIC starts -->
      <v-list-group value="true">
        <template v-slot:activator>
          <v-list-tile-title class="ml-4">
            <v-icon color="rgb(209, 60, 52)" class="mr-2">workk</v-icon>Administrative
          </v-list-tile-title>
        </template>
        <v-list-tile
          v-for="(item, i) in getNavigation.administrative"
          :key="i"
          :to="item.link"
          class="list"
        >
          <v-list-tile-content class="list-item ml-4" v-if="!item.subfolders">
            <v-list-tile-title class="font-weight-bold caption">
              <v-icon color="rgb(19,83,147)" small class="mr-2">{{item.icon}}</v-icon>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
          <!-- subfolders -->
          <v-expansion-panel v-else class="sub mt-4 font-weight-bold caption text--lighten-1">
            <v-expansion-panel-content>
              <div slot="header" class=" ml-1 "><v-icon color="rgb(19,83,147)" small class="mr-2">{{item.icon}}</v-icon>
              {{ item.title }}</div>
              <v-list-tile
                v-for="(item, i) in item.subfolders"
                :key="i"
                :to="item.link"
                class="list"
                tag="li"
              >
                <v-list-tile-content class="list-item ml-2">
                  <v-list-tile-title class="font-weight-bold caption">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- <v-list-group no-action sub-group value="true" v-if="item.subfolders" >
            <template v-slot:activator subgroup >
              <v-list-tile-title class="mr-5">
                <v-icon color="rgb(19,83,147)" small class="mr-2">{{item.icon}}</v-icon>
                {{ item.title }}
              </v-list-tile-title>
            </template>
            <v-list-tile
              v-for="(item, i) in item.subfolders"
              :key="i"
              :to="item.link"
              class="list"
            >
              <v-list-tile-content class="list-item ml-4">
                <v-list-tile-title class="font-weight-bold caption">{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>-->
        </v-list-tile>
      </v-list-group>
    </v-list>
    <!-- ADMINISTRATIVE ends -->
  </v-card>
</template>


  <!-- <v-layout wrap justify-space-around>
    <v-list-tile-title class="font-weight-bold headlne mt-5 grey--text">
      <v-icon class="mr-2 font-weight-bold ">device_hub</v-icon>WORKSTATION
    </v-list-tile-title>
    <v-btn
      depressed
      fab
      color="white"
      class="avatar-button"
      @click="profileModel = !profileModel"
      v-if="checkIsLoggedIn"
    >
      <v-avatar>
        <img :src="getCurrentUser.photoURL" alt="Waldo" />
      </v-avatar>
    </v-btn>
    <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
      open-on-hover
      :close-on-click="closeOnClick"
      :close-on-content-click="closeOnContentClick"
      :offset-x="offsetX"
      :offset-y="offsetY"
    >
      <template v-slot:activator="{ on }">
        <v-btn class="mt-5" color="info" dark v-on="on">
          <v-icon>school</v-icon>ACADEMIC
        </v-btn>
      </template>
      <v-list v-for="(item, i) in getNavigation.privateNav" :key="i">
        <v-list-tile>
          <router-link
            v-if="item.field == 'academic'"
            tag="v-btn"
            style="background-color:white"
            :to="item.link"
            :class="item.class"
          >
            <v-icon class="mr-1">{{item.icon}}</v-icon>
            {{ item.title }}
          </router-link>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-layout> -->
<style scoped>
.sub {
  width: 100%;
  z-index: 1;
  position: relative;
  background-color: white;
  
}
.list-item {
  color: rgba(0, 0, 0, 0.699) !important;
}
.list:hover {
  background-color: rgb(209, 60, 52);
  animation-duration: 0.1s;
  animation-name: pulse;
  animation-timing-function: ease-in-out;
  display: block;
  font-size: 40px;
}
.list-item:hover {
  text-decoration-style: none !important;
  color: white !important;
}
</style>

   
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      disabled: false,
      absolute: false,
      openOnHover: false,
      value: false,
      closeOnClick: true,
      closeOnContentClick: true,
      offsetX: false,
      offsetY: true,
      profileModel: false,
      admins: [["Management", "people_outline"], ["Settings", "settings"]],
      cruds: [
        ["Create", "add"],
        ["Read", "insert_drive_file"],
        ["Update", "update"],
        ["Delete", "delete"]
      ]
    };
  },
  computed: mapGetters(["getNavigation", "checkIsLoggedIn"]),
  created() {}
};
</script>

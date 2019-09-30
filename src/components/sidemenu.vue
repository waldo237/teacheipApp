<template>
  <v-card
    class="mx-auto"
    width="300"
  >
    <v-list>
      <v-list-tile class="mt-4 mb-3">
        <v-icon
          color="rgb(209, 60, 52)"
          medium
          class="mr-2 mt-2 font-weight-bold"
        >
          device_hub
        </v-icon>
        <v-list-tile-title class="headline font-weight-bold">
          WORKSTATION
        </v-list-tile-title>
      </v-list-tile>
      <!-- ACADEMIC starts -->
      <v-list-group value="true">
        <template v-slot:activator>
          <v-list-tile-title class="ml-4">
            <v-icon
              color="rgb(209, 60, 52)"
              class="mr-2"
            >
              school
            </v-icon>Academic
          </v-list-tile-title>
        </template>
        <v-list-tile
          v-for="(item, i) in getNavigation.academic"
          :key="i"
          class="list"
        >
          <v-list-tile
            v-if="!item.subfolders"
            :to="item.link"
            style="width: 100%"
          >
            <v-list-tile-title class="font-weight-bold caption ml-2">
              <v-icon
                color="rgb(19,83,147)"
                small
                class="mr-2"
              >
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile>
          <!-- subfolders -->
          <v-expansion-panel
            accordion
            focusable
            v-else
            class="sub my-auto font-weight-bold caption elevation-0"
          >
            <v-expansion-panel-content>
              <div
                slot="header"
                class="mr-4"
              >
                <v-icon
                  color="rgb(19,83,147)"
                  small
                  class="mr-2"
                >
                  {{ item.icon }}
                </v-icon>
                {{ item.title }}
              </div>
              <v-list-tile
              
                v-for="(item, i) in item.subfolders"
                :key="i"
                :to="item.link"
                class="list"
              >
                <v-list-tile-content class="list-item ml-5">
                  <v-list-tile-title class="font-weight-bold caption">
                    {{ item.title }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <!-- ACADEMIC ends -->

    <!-- ADMINISTRATIVE starts -->
    <v-list>
      <v-list-group value="true">
        <template v-slot:activator>
          <v-list-tile-title class="ml-4">
            <v-icon
              color="rgb(209, 60, 52)"
              class="mr-2"
            >
              work
            </v-icon>Administrative
          </v-list-tile-title>
        </template>
        <v-list-tile
          v-for="(item, i) in getNavigation.administrative"
          :key="i"
          class="list"
        >
          <v-list-tile
            v-if="!item.subfolders"
            :to="item.link"
            style="width: 100%"
          >
            <v-list-tile-title class="font-weight-bold caption ml-2">
              <v-icon
                color="rgb(19,83,147)"
                small
                class="mr-2"
              >
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile>
          <!-- subfolders -->
          <v-expansion-panel
            accordion
            focusable
            v-else
            class="sub my-auto font-weight-bold caption elevation-0"
          >
            <v-expansion-panel-content>
              <div
                slot="header"
                class="mr-4"
              >
                <v-icon
                  color="rgb(19,83,147)"
                  small
                  class="mr-2"
                >
                  {{ item.icon }}
                </v-icon>
                {{ item.title }}
              </div>
              <v-list-tile
              
                v-for="(item, i) in item.subfolders"
                :key="i"
                :to="item.link"
                class="list"
              >
                <v-list-tile-content class="list-item ml-5">
                  <v-list-tile-title class="font-weight-bold caption">
                    {{ item.title }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <!-- ADMINISTRATIVE ends -->
  </v-card>
</template>


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
/* .list:hover {
  background-color: rgb(206, 206, 206);
  animation-duration: 0.1s;
  animation-name: pulse;
  animation-timing-function: ease-in-out;
  display: block;
  font-size: 40px;
} */

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

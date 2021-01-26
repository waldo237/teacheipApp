<template>
  <v-navigation-drawer
    app
    disable-resize-watcher
    class="grey lighten-2"
    v-model="isSupervisor"
  >
    <v-card
      class="mx-auto"
      width="300"
    >
      <div>
        <v-list>
          <v-list-tile class="mt-4 mb-3">
            <v-icon
              color="rgb(209, 60, 52)"
              medium
              class="mr-2 mt-2 font-weight-bold"
            >
              device_hub
            </v-icon>
            <v-list-tile-title class=" font-weight-bold">
              <router-link to="/supervisorDashboard">
                Supervisor's Dashboard
              </router-link> 
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
                </v-icon>Académico
              </v-list-tile-title>
            </template>
            <v-list-tile
              v-for="(item, i) in servicios"
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
                </v-icon>Administrativo
              </v-list-tile-title>
            </template>
            <v-list-tile
              v-for="(item, i) in solicitudes"
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
      </div>
    </v-card>
  </v-navigation-drawer>
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
</style>
   
<script>
import { mapGetters } from "vuex";
export default {
  props:["isSupervisor"],
  data() {
    return {
      value: false,     
    };
  },
  computed: mapGetters(["getNavigation", "checkIsLoggedIn", "servicios", "solicitudes"]),
};
</script>

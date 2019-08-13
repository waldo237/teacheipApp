<template>
  <v-treeview
    :items="getNavigation.administrative"
    activatable
  shaped
  dense
  >
    <template v-slot:prepend="{ item, subfolders }">
    <v-list-tile-content class="list-item ml-4">
            <v-list-tile-title class="font-weight-bold caption">
              <v-icon color="rgb(19,83,147)" small class="mr-2">{{item.icon}}</v-icon>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
    </template>
  </v-treeview>
</template>

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

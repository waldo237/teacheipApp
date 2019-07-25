<template>
  <div id="app">
    <v-app>
      <v-layout row class="dashboard">
        <v-flex xs10 sm7 offset-sm3>
          <v-card>
            <v-toolbar class="sign-in">
              <v-avatar>
                <img
                  src="https://lh3.googleusercontent.com/a-/AAuE7mAscdoJabqX9smH2RyVSYxyLt0FKzhNEtvnjHVmgW8=s96"
                  alt="Waldo"
                />
              </v-avatar>
              <v-toolbar-title>Hello, {{getCurrentUser.displayName}}. Welcome to your workstation.</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list two-line subheader>
              <v-subheader inset>Folders</v-subheader>

              <v-list-tile v-for="item in items" :key="item.title" avatar @click>
                <v-list-tile-avatar>
                  <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

              <v-divider inset></v-divider>

              <v-subheader inset>Files</v-subheader>

              <v-list-tile v-for="item in items2" :key="item.title" avatar @click>
                <v-list-tile-avatar>
                  <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutation } from "vuex";
let route = "";
export default {
  name: "dashboard",
  data() {
    return {
      items: [
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Photos",
          subtitle: "Jan 9, 2014"
        },
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Recipes",
          subtitle: "Jan 17, 2014"
        },
        {
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: "Work",
          subtitle: "Jan 28, 2014"
        }
      ],
      items2: [
        {
          icon: "assignment",
          iconClass: "blue white--text",
          title: "Vacation itinerary",
          subtitle: "Jan 20, 2014"
        },
        {
          icon: "call_to_action",
          iconClass: "amber white--text",
          title: "Kitchen remodel",
          subtitle: "Jan 10, 2014"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["fetchUsers", "setParams"])
  },
  computed: mapGetters(["getUsers", "getParams",'getCurrentUser' ]),
  async created() {
    await this.$store.commit("setParams", JSON.stringify(route));
    this.fetchUsers();
  },
  async beforeRouteEnter(to, from, next) {
    route = await to.params;
    next(route);
  }
};
</script>
<style scoped>
.dashboard{
  margin-left: 5%;
  margin-right: 7%;
  
}
</style>

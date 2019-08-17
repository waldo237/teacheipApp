<template>
  <div class="mx-5 mb-5 pb-5 wrapper">
    <v-layout class="mx-5 py-1 mt-3 elevation-10 justify-center wrapper-div sign-up" wrap>
      <v-card class="display-1 sign-up" flat>
        <v-icon class="white--text mb-1" large>dashboard</v-icon>Dashboard
      </v-card>
    </v-layout>
    <v-layout class="mx-5 mb-5 pa-3 pb-5 elevation-24 justify-center main-card" wrap>
      <!-- intructions start -->
      <v-card
        class="justify-center mx-2 elevation-24 grids"
        raised
        max-width="500px"
        min-width="400px"
      >
        <v-card-title  primary-title class=" instructions justify-center elevation-12">
          <h3 class="headline white--text text--accent-2">
            <v-icon large class="mx-2">comment</v-icon>Brief Report
          </h3>
        </v-card-title>
    <v-card-text class="justify-center">
        <!-- date picker starts -->
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="mx-3 my-0"
              v-model="date"
              label="Today"
              prepend-icon="event"
              readonly
              v-on="on"
              disabled
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <!-- date picker ends -->
        <!-- textfield with name starts -->
        <v-text-field
          v-model="label"
          :label="getCurrentUser.displayName"
          class="mx-3 my-0"
          prepend-icon="person"
          disabled
        ></v-text-field>
        <!-- textfield with name ends -->
    <!-- textarea starts -->
          <v-textarea 
          height=40px
          class="mx-2 mt-3"
          hint="Please give a small description of what you are working on today."
           name="input-7-4" label="What are you working on today?"></v-textarea>
        <!-- Submit button starts -->
        <v-layout class="justify-end">
          <v-btn class=" justify-center mx-auto instructions font-weight-bold black--text elevation-24">submit</v-btn>
        <!-- Submit button ends -->
        </v-layout>
        </v-card-text>
      </v-card>
    <!-- textarea ends -->

      <!-- intructions end -->

      <!-- upcoming events starts -->
      <v-card
        class="justify-center mx-2 elevation-24 grids"
        raised
        max-width="500px"
        min-width="400px"
      >
        <v-card-title primary-title class="justify-center yellow darken-4 elevation-12">
          <h3 class="headline white--text text--accent-2">
            <v-icon large class="mr-2">alarm</v-icon>Upcoming events
          </h3>
        </v-card-title>
        <v-card-text>May 6, 2010 - Note that this article is about creating rounded corners in Photoshop. ... (V), (CTRL+D) (CTRL+T), (CTRL+ENTER) you can get bloody quick at doing this ... The lazy radius problem occurs when your curve doesn't go a full 90 ...</v-card-text>
      </v-card>
      <!-- upcoming events ends -->
    </v-layout>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapMutation } from "vuex";
let route = "";
export default {
  name: "dashboard",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false
    };
  },
  methods: {
    ...mapActions(["fetchUsers", "setParams"])
  },
  computed: mapGetters(["getUsers", "getParams", "getCurrentUser"]),
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
.instructions {
  background: rgb(79, 177, 83) !important;
  background: linear-gradient(
    90deg,
    rgba(79, 177, 83, 1) 42%,
    rgba(92, 250, 29, 0.904) 100%,
    rgb(28, 28, 218) 100%
  ) !important;
}
.grids {
  border-radius: 10px !important;
}
.wrapper-div {
  border-radius: 5px !important;
}
.main-card {
  border-radius: 5px !important;
}
@media screen and (max-width: 960px) {
  .grids {
    margin-top: 5% !important;
  }
  .wrapper {
    margin: 0% !important;
    min-width: 520px !important;
    margin-top: 5% !important;
  }
  .wrapper-div {
    padding: 0% !important;
    margin-top: 5% !important;
  }
}
</style>

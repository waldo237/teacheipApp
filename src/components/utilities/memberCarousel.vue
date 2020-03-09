<template>
  <!-- members starts -->
  <div>
    <v-layout
      row
      wrap
      class="mx-1 px-3 mb-0 pb-0"
      justify-center
    >
      <v-card-title
        class="title my-0 font-weight-light main-title"
      >
        Miembros de nuestra comunidad
      </v-card-title>
    </v-layout>
    <v-layout
      row
      wrap
      class="mx-5 px-3"
      justify-center
    >
      <v-text-field
        light
        class="mx-4 mt-0"
        label="A quien conoces?"
        single-line
        prepend-icon="search"
        color="#c6192a"
        clearable
        v-model="searchTerms"
      />
    </v-layout>
    <v-layout
      row
      wrap
      class="mx-1 px-3"
      justify-center
    >
      <v-layout class="memberCarousel mx-5 px-2">
        <v-card
          v-for="item in displayMembers()"
          :key="item._id"
          class="ma-2 pa-2 grey darken-4"
          width="110px"
        >
          <router-link
            class="white--text"
            :to="'/member/'+ item._id"
          >
            <v-layout justify-center>
              <v-avatar v-if="item.photoURL">
                <v-img
                  :src="item.photoURL"
                  :lazy-src="item.photoURL"
                />
              </v-avatar>
              <v-avatar
                v-else
                class="display-1 white--text"
                :color="randColors[Math.floor(Math.random() * 280)]"
              >
                {{ item.firstName.split(' ')
                  .map(n => n[0])
                  .join("")
                  .toUpperCase() }}
              </v-avatar>
            </v-layout>
            <br>
            <v-layout class="mx-2">
              {{ item.firstName }} {{ item.lastName }}
            </v-layout>
          </router-link>
        </v-card>
      </v-layout>
    </v-layout>
  </div>
  <!-- members ends -->
</template>

<script>
import { mapActions } from "vuex";
import colors from "@/assets/colors/colors.js";

export default {
  data() {
    return {
      members: [],
      randColors: colors,
      searchTerms: ""
    };
  },
  methods: {
    ...mapActions(["getMembers"]),
    displayMembers() {
      if (this.searchTerms) {
        return this.members.filter(item => {
          return item.firstName
            .toLowerCase()
            .match(this.searchTerms.toLowerCase());
        });
      } else {
        return this.members;
      }
    }
  },
  watch: {
    searchTerms() {
      this.displayMembers();
    }
  },
  async created() {
    //  if the user is logged in, he will see the members
    if (localStorage.getItem("serverToken"))
      this.members = await this.getMembers();
  }
};
</script>
<style scoped>
</style>
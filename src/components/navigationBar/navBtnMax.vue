<template>
          <v-toolbar-items class="hidden-sm-and-down mx-auto">
        <v-btn
          class="black-blue"
          dark
          v-if="checkIsLoggedIn"
          @click="$emit('rolePath')"
          @mouseenter="tip = true"
          @mouseleave="tip = false"
        >
          <span v-if="tip">
            DASHBOARD
          </span>
          <v-icon color="white" class="mr-0">
            dashboard
          </v-icon>
        </v-btn>
        <v-toolbar-items class="hidden-sm-and-down">
          <router-link
            tag="v-btn"
            style="background-color:white"
            v-for="item in getNavigation.publicNav"
            :key="item.icon"
            :to="item.link"
            :class="item.class"
          >
            {{ item.title }}
          </router-link>
        </v-toolbar-items>
        <v-btn @click="toggleSU" class="sign-up" v-if="!checkIsLoggedIn">
          SIGN IN
        </v-btn>

        <!-- profile avatar starts -->
        <v-btn
          depressed
          fab
          color="white"
          class="avatar-button"
           @click="$emit('toggleProfile')"
          v-if="checkIsLoggedIn"
        >
          <v-avatar v-if="auth().currentUser.photoURL">
            <img
              :src="auth().currentUser.photoURL"
              :alt="auth().currentUser.displayName"
            />
          </v-avatar>
          <v-avatar :color="colorize" v-else>
            <span class="white--text headline">{{ initialize }}</span>
          </v-avatar>
        </v-btn>
        <!-- profile avatar ends -->
      </v-toolbar-items>
</template>
<script>
import { directive as onClickaway } from "vue-clickaway";
import { mapActions, mapGetters } from "vuex";
export default {
  directives: {
    onClickaway: onClickaway
  },
  props: ["sandwich"],
  data() {
    return {
        tip: false,
    };
  },
  methods: {
    ...mapActions(["toggleSU"]),
    hideMenu(){this.$emit('hideMenu')}
  },
  computed: {
    ...mapGetters(["checkIsLoggedIn", "getNavigation", "auth"]),
    initialize() {
      return this.auth()
        .currentUser.displayName.split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
    }
  }
};
</script>

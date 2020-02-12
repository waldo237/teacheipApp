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
      <v-icon
        color="white"
        class="mr-0"
      >
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
    <v-btn
      @click="toggleSU"
      class="sign-up"
      v-if="!checkIsLoggedIn"
    >
      SIGN IN
    </v-btn>

    <!-- notification starts -->
    <v-btn
      v-if="checkIsLoggedIn"
      color="white"
      @click="$store.commit('setNotiFeeds', true)"
    >
      <v-badge
        color="#c6192a"
        width="100%"
        overlap
        v-model="tem"
      >
        <template v-slot:badge>
          <span style="font-size: 70%; font-weight: bold"> {{ feedNum }}</span>
        </template>
        <v-icon size="28">
          notifications
        </v-icon>
      </v-badge>
    </v-btn>
    <!-- notification ends -->
    <!-- profile avatar starts -->
    <v-btn
      depressed
      fab
      color="white"
      class="avatar-button"
      @click="$emit('toggleProfile')"
      v-if="checkIsLoggedIn"
    >
      <v-avatar v-if="photoURL">
        <img
          :src="photoURL"
          :alt="auth().currentUser.displayName"
        >
      </v-avatar>
      <v-avatar
        :color="colorize"
        v-else
      >
        <span class="white--text headline">{{ initialize }}</span>
      </v-avatar>
    </v-btn>
    <!-- profile avatar ends -->
  </v-toolbar-items>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import colors from "@/assets/colors/colors.js";
export default {

  props: ["sandwich"],
  data() {
    return {
        tip: false,
        feedNum: null,
        tem: false,
        photoURL: '',
    };
  },
  methods: {
    ...mapActions(["toggleSU"]),
    hideMenu(){this.$emit('hideMenu')},
  },
  computed: {
     colorize() {
      return colors[Math.floor(Math.random() * 280)];
    },
    ...mapGetters(["checkIsLoggedIn", "getNavigation", "auth",  "feeds","haveNotRead"]),
    initialize() {
      return this.auth()
        .currentUser.displayName.split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
    },
  },
 async mounted(){
    if(this.checkIsLoggedIn){
       this.photoURL = await this.auth().currentUser.photoURL;
      this.$store.commit("setCUEmail", this.auth().currentUser.email);
       await this.$store.dispatch('fetchFeeds');
      this.feedNum = await this.haveNotRead.num.length;
      this.tem = await this.haveNotRead.read.haveNotRead;
        if(this.feedNum== 0){
        this.tem = false
      }
      
    }
  },
 
 async created(){
  
  this.$root.$on('changedPhoto',async ()=>{
       this.photoURL = await this.auth().currentUser.photoURL;
    })
  this.$root.$on('loggedIn',async ()=>{
       this.photoURL = await this.auth().currentUser.photoURL;
    })

     this.$root.$on('removeBadget', ()=>{
       this.tem = false;
     })
  }
};
</script>

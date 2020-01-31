<template>
  <v-layout row v-if="notiFeeds" v-on-clickaway="closeNotification">
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="feeds mt-4" lazy>
        <v-list tw0-line >
          <v-layout v-for="(item, index) in items" :key="index" column>
            <v-list-tile avatar @click="markIt"  class="py-1" :class="(items[0].alreadyRead)? 'white': doneReading ">
              <v-list-tile-avatar>
                <img :src="item.avatar" />
              </v-list-tile-avatar>
              <a :href="item.link" target="_blank">
                <v-list-tile-content>
                  <v-list-tile-title >  {{item.title}}</v-list-tile-title>
                  <v-list-tile-sub-title
                    v-html="item.body"
                  ></v-list-tile-sub-title>
                  <span class="body-2"><span class="black--text">{{item.name}}</span>  | {{moment(item.date)}}</span>
                </v-list-tile-content>
              </a>
            </v-list-tile>
            <v-divider></v-divider>
          </v-layout>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { directive as onClickaway } from "vue-clickaway";
import moment from 'moment'
export default {
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      items: [],
      doneReading: 'grey'
    };
  },
  methods: {
    closeNotification() {
      if (this.notiFeeds) this.$store.commit("setNotiFeeds", false);
    },
    markIt(){
      this.doneReading = 'white'
      this.markAsRead();
      this.$store.commit('setFeeds', []);
    },
    moment(date){
      return moment(date).fromNow();
    },
    ...mapActions(["fetchFeeds", "markAsRead"])
  },
  computed: {
    ...mapGetters(["feeds", "auth", "notiFeeds"])
  },
  async created() {
   this.$store.commit("setCUEmail", this.auth().currentUser.email);
    await this.$store.dispatch('fetchFeeds');
    this.items = this.feeds;
     this.closeNotification();
  }
};
</script>
}
<style>

.feeds {
  width: 400px;
  height: 400px;
  z-index: 2;
  position: fixed;
   overflow-y:scroll;
   overflow-x:hidden;
  text-overflow: clip;
  top: 25px;
  right: 10px;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: slideInDown;
  animation-timing-function: ease-in-out;
  display: block;
}
</style>

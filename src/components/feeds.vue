<template>
  <v-layout row v-if="feeds" v-on-clickaway="closeNotification">
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="feeds mt-4" lazy>
        <v-list three-line>
          <v-layout v-for="(item, index) in items" :key="index" column>
            <v-list-tile avatar @click="">
              <v-list-tile-avatar>
                <img :src="item.avatar" />
              </v-list-tile-avatar>
              <a :href="item.link" target="_blank">
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title
                    v-html="item.body"
                  ></v-list-tile-sub-title>
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
export default {
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    closeNotification() {
      if (this.feeds) this.$store.commit("setFeeds", false);
    },
    ...mapActions(["fetchFeeds", "markAsRead"])
  },
  computed: {
    ...mapGetters(["feeds", "auth"])
  },
  async created() {
    this.$store.commit("setCUEmail", this.auth().currentUser.email);
    await this.fetchFeeds();
    this.items = this.feeds;
  }
};
</script>
}
<style>
.feeds {
  width: 400px;
  z-index: 2;
  position: fixed;
  top: 25px;
  right: 10px;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: slideInDown;
  animation-timing-function: ease-in-out;
  display: block;
}
</style>

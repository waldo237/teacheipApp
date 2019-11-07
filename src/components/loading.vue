<template>
  <v-progress-circular
    class="mb-5 pb-5"
    :rotate="-90"
    :size="200"
    :width="20"
    :value="percent"
    color="#c6192a"
  >
    <v-spacer />coming right up...
    <span class="font-weight-bold title">{{ percent }}</span>
  </v-progress-circular>
</template>
<script>
export default {
  data() {
    return {
      interval: {},
      percent: 0
    };
  }, 
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.percent === 100) {
        return (this.percent = 0);
      }
      this.percent += 10;
    }, 800);
  }
};
</script>
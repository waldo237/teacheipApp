<template>
  <!-- pendingForVerification dialog starts -->
  <v-dialog v-model="loadingFull" fullscreen persistent hide-overlay>
    <v-card>
      <v-layout justify-center align-center column>
        <v-toolbar color="white" flat class="pt-5">
          <v-layout justify-center>

            <span class="teach display-1">Teach</span>
            <span class="acronym display-1">EIP</span>
          </v-layout></v-toolbar
        > <img
        class="m-0"
          width="360px"
          src="https://icomputerdenver.files.wordpress.com/2015/08/4fd523_9bb0c9c2bd924426a37b810f7174c133.gif"
          alt=""
        />
  
        <v-btn block flat class="sign-up">
        <span class="font-weight-bold display-1  py-4  px-5"
          >coming right up...{{ percent }}
        </span>

        </v-btn>
   
       
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // props:['loadingFull'],
  data() {
    return {
      interval: {},
      loadingFull: true,
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
    }, 1200);
  }
};
</script>

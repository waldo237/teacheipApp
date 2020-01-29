<template>
  <!-- pendingForVerification dialog starts -->
  <v-dialog v-model="loadingFull" fullscreen persistent hide-overlay >
      
    <v-card leave-active-class='out'>
      <v-layout justify-center align-center column>
        <v-toolbar color="white" flat class="pt-5">
          <v-layout justify-center>
            <span class="teach display-1">Teach</span>
            <span class="acronym display-1">EIP</span>
          </v-layout>
          </v-toolbar>
        <!-- loading starts -->
        <v-layout justify-center align-center column v-if="!tookTooLong" class="slideRight">
          <v-img
            class="m-0"
            width="400px"
            :src="loadingImg()"
            :lazy-src="loadingImg()"
          />

            <v-btn block  class="sign-up elevation-9" round>
            <span class="font-weight-bold display-1  py-3  ">
              coming right up... {{ percent }}
            </span>
          </v-btn>
        </v-layout>
        <!-- loading ends -->
        <!-- took too long starts -->
        <v-layout justify-center align-center column v-else width="100%" class="slideDown">
          <span class="font-weight-bold   py-3 mx-5 ">
              We are sorry the logging took too long. Apparently your connection is too slow or there was an issue with our system.
            </span>
          <v-img
            width="400px"
            :src="brokenImg()"
            :lazy-src="brokenImg()"
            alt="It took too long to load"
             
          />
          <v-btn block  class="sign-in elevation-9" round @click="goBack">
            <span class="font-weight-bold display-1  py-3  ">
              go back and start again
            </span>
          </v-btn>
        </v-layout>
        <!-- took too long ends -->
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props:['loadingFull'],
  data() {
    return {
      interval: {},
      timeOut: {},
      percent: 0,
      tookTooLong: false,
    };
  },
  methods: {
    brokenImg() {
      return "https://drive.google.com/uc?export=view&id=1j_UEjqNqaDSjdvck5cCn-lMTP1qqkkKc";
    },
    loadingImg() {
      return "https://drive.google.com/uc?export=view&id=1Bmch-kZsXPbvpAw25c0Lo9sQ3IwiahGC";
    },
    goBack(){
        this.loadingFull  = false;
    }
  },
  watch:{
      loadingFull(){
      if(this.loadingFull==true){
              this.interval = setInterval(() => {
                if (this.percent === 100) {
                    return (this.percent = 0);
                }
                this.percent += 1;
                }, 180);

          this.timeOut = setTimeout(() => {
            this.tookTooLong = true;
            clearInterval(this.interval);
            clearTimeout(this.timeOut);
            }, 260*60);
      }else{
           this.tookTooLong = false;
            clearInterval(this.interval);
            clearTimeout(this.timeOut);
      }      
     },
  },
  beforeDestroy() {
    clearInterval(this.interval);
    clearTimeout(this.timeOut);
  },
  mounted() {

  }
};
</script>
<style>
.slideRight{
       animation-duration: 0.60s;
  animation-name: bounceInLeft;
  animation-timing-function: ease-in-out;
}
.slideDown{
       animation-duration: 1s;
  animation-name: bounceInDown;
  animation-timing-function: ease-in-out;
}

</style>
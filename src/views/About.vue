<template>
<div>
  <v-layout
    id="inspire"
    row
    justify-center
   >
    <div class="px-5  content mb-0 pb-0">
      <div class="elevation-24 mx-5  mt-5 mb-0 pb-0 round">
        <v-layout justify-space-around class=" mb-0 pb-0">
          <v-flex xs10 class=" mb-0 pb-0">
            <v-card
              flat
              column
              class="round  mb-0 pb-0"
            >
              <v-img
                :src="gify"
                alt="We bring change!"
                :lazy-src="gify"
                
                id="we-bring-change"
                class="grey lighten-2 mx-auto mt-3 "
                max-width="580"
              />
            </v-card>
          </v-flex>
        </v-layout>

        <v-card
          flat
          xs8
          class="pa-4 big-words  sign-in white--text text-justify  pb-0"
        >
          The English Immersion Program has had an
          exponential
          growth since its creation in 2004. It operates nationwide even in very remote areas. This platform allows
          Administrators and teachers to find resources and share ideas. Thus, it helps us maintain consistency, and
          standardization.
        </v-card>
      </div>
    </div>
  </v-layout>
  <v-layout row  width="100%" class="mt-0 pt-0">
  <v-card color="#376092" class="mb-5 blueCut mt-0 pt-0" width="90%"  height="500px">

  </v-card>
    <v-card id="red" color="#ff0000" class="mb-5 redCut mt-0 pt-0" width="60%" height="500px">

  </v-card>
    
  </v-layout>
</div>

</template>
<script>

export default {
data(){
  return{
    gify: "https://drive.google.com/uc?export=edit&id=15f32pnOCMq0pq_pjOl5Z_NN1MXcb8rDT",
  }
},
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lexend+Exa|Oswald&display=swap");
.big-words {
  font-family: "Oswald", sans-serif;
  font-family: "Lexend Exa", sans-serif;
  font-weight: lighter !important;
  text-align: initial;
}
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
.img {
  filter: brightness(50%);
  box-shadow: 0 14px 20px 0 rgba(0, 0, 0, 0.425),
    0 18px 34px 0 rgba(0, 0, 0, 0.48);
}
.img:active {
  animation-duration: 4s;
  animation-name: hinge;
}
@media screen and (max-width: 960px) {
  .content {
    padding: 0% !important;
    margin: 0% !important;
    margin-bottom: 10% !important;
  }
}

/* The animation code */

.para:hover {
  animation-duration: 1s;
  animation-name: pulse;
  display: block;
  font-size: 40px;
  color: white;
}
</style>

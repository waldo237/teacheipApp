<template>
  <div>
    <v-layout
      wrap
      justify-center
    >
      <div
        primary-title
        class="display-1 font-weight-light  text-xs-center main-title mt-5 pt-5 mx-4 px-1 "
      >
        assessment guides
      </div>
    </v-layout>
 
    <v-layout
      column
      wrap
      justify-center
      class=" mx-auto"
    >
      <v-layout
        wrap
        justify-center
      >
        <div
          primary-title
          class="title font-weight-light  text-xs-center main-title "
        >
          assessment guide Basic 1
        </div>
      </v-layout>
      <object
        data="https://drive.google.com/file/d/1Wa4wdYgKSV4nBavrsY6Xn3VgU60Nv6z0/preview"
        type="application/pdf"
        height="800px"
        class="mx-5 "
      >
        <embed
          class="round"
          src="https://drive.google.com/file/d/1Wa4wdYgKSV4nBavrsY6Xn3VgU60Nv6z0/preview"
          type="application/pdf"
        >
      </object>
    </v-layout>
  </div>
</template> 
<script>
export default {
  created(){

  }
}
</script>
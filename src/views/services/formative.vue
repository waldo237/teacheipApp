<template>
  <v-layout
    row
    wrap
    class="ma-5 pa-5"
  >
     <v-layout
      justify-center
      row
      wrap
      primary-title
      class="display-1 font-weight-light  text-xs-center main-title mt-4 pt-4 mx-4 px-1 "
    >
      Collection of Formative Assessments
    </v-layout>
    <div
      class="column round elevation-24 sign-in "
    >
      <blockquote
        class="pa-3"
        justify-space-around
      >
        <i class="white--text ">
          "Teachers use formative assessment to check student learning BEFORE a
          summative assessment. Formative assessment is very important because
          teachers should know if students are learning the material before a
          major summative assessment. Formative assessment should happen during
          every lesson. If the lesson is long, formative assessment should
          happen many times during the class. It is part of the teaching
          process. For formative assessment to work well, teachers need to be
          clear about the learning outcomes in the course. What should students
          be able to do by the end of the course? What do they need to get
          there?"
        </i>
        <br>
        <v-layout
          row
          wrap
          justify-end
        >
          <q
            class="my-1 white--text"
          ><small>(Janine Sepulveda, 2019)</small></q>
        </v-layout>
      </blockquote>
    </div>
    <!-- these are the flex boxes for the content -->
    <v-layout
      row
      wrap
      justify-center
      class="mb-5 pb-5"
    >
      <a 
        class="move"
        style="text-decoration:none;"
        href="https://www.wabisabilearning.com/blog/15-assessment-activities-fast-formative"
        target="_blank"
      >
        <div
          class="column"
          style="flex-grow:1;flex-shrink:1;flex-basis:0;text-align:center;background-color:rgb(19,83,147);box-shadow:0 10px 16px 0 rgba(0,0,0,0.425), 0 14px 30px 0 rgba(0,0,0,0.356);margin:10px;padding:10px;border-radius:15%;"
        >
          <small style="color:white;"> Collection 1</small><br>
          <img
            src="https://png.pngtree.com/svg/20170620/d1dbd7379c.png"
            alt="Formative assessment repository"
            style="width:100px;height:100px;"
          >
        </div>
      </a>
      <!-- second item -->
      <a
        class="move"
        style="text-decoration:none;"
        href="https://drive.google.com/file/d/0B-Zl4c43xZjTSXZKdGhnSUFtUEFQR0RJTWNnWFR6RzhpTE9r/view?usp=sharing"
        target="_blank"
      >
        <div
          class="column"
          style="flex-grow:1;flex-shrink:1;flex-basis:0;text-align:center;background-color:rgb(19,83,147);box-shadow:0 10px 16px 0 rgba(0,0,0,0.425), 0 14px 30px 0 rgba(0,0,0,0.356);margin:10px;padding:10px;border-radius:15%;"
        >
          <small style="color:white;"> Collection 2</small><br>
          <img
            src="https://png.pngtree.com/svg/20170620/d1dbd7379c.png"
            alt="Formative assessment repository"
            style="width:100px;height:100px;"
          >
        </div>
      </a>
      <!-- third item -->
      <a
        class="move"
        style="text-decoration:none;"
        href="https://drive.google.com/file/d/0B-Zl4c43xZjTYVkwcXVmMnJsQnVIcDNyT1J4SGEtb2E2czBJ/view?usp=sharing"
        target="_blank"
      >
        <div
          class="column"
          style="flex-grow:1;flex-shrink:1;flex-basis:0;text-align:center;background-color:rgb(19,83,147);box-shadow:0 10px 16px 0 rgba(0,0,0,0.425), 0 14px 30px 0 rgba(0,0,0,0.356);margin:10px;padding:10px;border-radius:15%;"
        >
          <small style="color:white;"> Collection 3</small><br>
          <img
            src="https://png.pngtree.com/svg/20170620/d1dbd7379c.png"
            alt="Formative assessment repository"
            style="width:100px;height:100px;"
          >
        </div>
      </a>
    </v-layout>
  </v-layout>
</template>
<script>
export default {

}
</script>
<style  scoped>
.move:hover{
   animation-duration: 0.5s;
  animation-name: pulse;
  animation-timing-function: ease-in-out;
}
</style>
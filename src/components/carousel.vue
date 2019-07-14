<template>
  <div>
    <b-carousel
      id="carousel-no-animation"
      style="text-shadow: 0px 0px 2px #000"
      no-animation
      indicators
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide caption="" img-src="https://picsum.photos/1024/480/?image=13">
        <div class="hero">
          <div class="hero-area-wrapper">
            <div >Connect with other teachers, coordinators, supervisors, directors</div>
          <v-btn large href="https://join.slack.com/t/englishimmers-em06602/shared_invite/enQtNjgwNzUxMTkzMjk2LTJlZGU3OGViYjAzYTI4NWMzZGUwNjMyNWQ2MGMwNTIxYzk2YzFjYzYwN2QyZDUxM2Q2YzM5ZDU4NWU4ZjcxMTU" >Start</v-btn>

          
          </div>
          <!-- .hero-area-wrapper -->
        </div>
      </b-carousel-slide>
      <b-carousel-slide caption="Second Slide" img-src="https://picsum.photos/1024/480/?image=12"></b-carousel-slide>
      <b-carousel-slide caption="Third Slide" img-src="https://picsum.photos/1024/480/?image=22"></b-carousel-slide>
      <b-carousel-slide caption="Fourth Slide" img-src="https://picsum.photos/1024/480/?image=23"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<style>
.hero{
  background-color: rgba(0, 0, 0, 0.459);
height: 80%;}
</style>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

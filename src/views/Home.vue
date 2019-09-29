<template>
  <div class="home">
    <!-- carousel starts -->
    <Carousel />
    <!-- carousel ends -->

    <v-layout class="justify-center mt-4 mb-5 pb-5" flat wrap>
      <v-card class="mx-2 justify-center elevation-5 mt-2 grids" flat wrap min-width="80%">
        <v-layout class="justify-center" flat wrap>
          <v-card-title
            class="display-1 font-weight-bold my-0 text-xs-center main-title"
          >The English Immersion Program</v-card-title>
        </v-layout>
        <v-layout class="justify-center mb-2 pb-2" flat wrap>
          <!-- story starts -->
          <v-card
            class="justify-center mx-1 elevation-2 grids mt-2"
            raised
            max-height="350px"
            max-width="320px"
            min-width="320px"
            style="overflow:auto;"
          >
            <v-card-title
              primary-title
              class="justify-center the-program elevation-12 title py-2"
            >History of the Program</v-card-title>
            <v-card-text class="text-lg-justify text-md-justify text-sm-justify text-xs-justify">
              The English Immersion for Competitiveness began in 2004 when the MESCyT, in conjunction with the
              Center for Export and Investment of the Dominican Republic ( CEI- RD ), designed this English program aimed
              at young Dominicans of scarce economic resources with the objective to increase the competitiveness of
              the Dominican Republic in the international market through training of human resources, and thus raise
              the quality of higher education in the country.
            </v-card-text>
          </v-card>
          <!-- story ends -->
          <!-- vision events starts -->
          <v-card
            class="justify-center mx-1 elevation-20 grids mt-2"
            max-height="350px"
          max-width="320px"
            min-width="320px"
          >
            <v-card-title
              primary-title
              class="justify-center the-program elevation-12 title py-2"
            >Vision</v-card-title>
            <v-card-text class="text-lg-justify text-md-justify text-sm-justify text-xs-justify">
              To provide foreign language learning opportunities to the Dominican university population, to improve their
              communication ability and increase their competitiveness level, allowing greater professional and cultural
              growth, and better chances of entering the labor market.
            </v-card-text>
          </v-card>
          <!-- upcoming events ends -->
          <!-- mission start -->
          <v-card
            class="justify-center mx-1 elevation-2 grids mt-2"
            raised
            max-height="350px"
          max-width="320px"
            min-width="320px"
          >
            <v-card-title
              primary-title
              class="justify-center the-program elevation-12 title py-2"
            >Mission</v-card-title>
            <v-card-text class="text-lg-justify text-md-justify text-sm-justify text-xs-justify">
              To Become the leader which propels the transformation of English teaching in the Dominican Republic. Achieve
              international accreditation, gain recognition nationally and internationally for the academic quality of its
              staff and achievement of its graduates.
            </v-card-text>
          </v-card>
          <!-- mission end -->
        </v-layout>
      <!-- Testimonials starts -->
        <v-layout justify-center flat>
          <v-card-title
            class="display-1 font-weight-bold my-0 text-xs-center main-title"
          >Their experiences</v-card-title>
        </v-layout>
        <v-layout justify-center wrap>
      
          <!-- testimony 1 starts -->
          <!-- testimony 1 ends -->
          <v-card
          v-for="item in testimonies" :key="item.name"
            class="justify-center ma-3 elevation-12 grids"
            raised
            max-width="300px"
            min-width="300px"
          >
            <v-card-title class="blue-cards elevation-24">
              <v-layout justify-center>
                <v-avatar size="150" class="ma-1">
                  <img
                    :src="item.photo"
                    alt="testimony"
                  />
                </v-avatar>
              </v-layout>
              <v-layout justify-center class="testimony-text px-5">{{item.name}}</v-layout>

              <v-layout justify-center class="testimony-text px-5">
                <b>{{item.position}}</b>
              </v-layout>
            </v-card-title>

            <v-card-text class="testimony-text">
              <v-icon color="#d13c34" medium class="flip">format_quote</v-icon>
             <div  v-html="item.testimony"></div>
              <v-icon color="#d13c34" medium>format_quote</v-icon>
            </v-card-text>
          </v-card>
        </v-layout>
      <!-- Testimonials ends -->
      </v-card>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/carousel.vue";

export default {
  name: "home",
  components: {
    Carousel
  },
  data() {
    return {
      testimonies: [
        {
          photo: "http://www.collegescholarships.org/images/dominican-student-scholarships.jpg",
          name: "Jennifer Tavarez",
          position: "Student",
          testimony:
            "It is so encouraging to see how many graduates are here today: of all different ages, status, and with different goals. However, we are all linked by personal and professional growth. <br> Learning a new language is not an easy task; in the beginning, we surely met some classmates that knew very little English aside from 'hello', 'goodbye', and some numbers, but now, they can easily have a conversation with a native English speaker. I have seen it happen in a matter of months, and I can say that being a witness of this process has been amazing."
        },
        {
          photo: "http://3.bp.blogspot.com/-yeuMCFya2tY/UyteIA1qK2I/AAAAAAAAACY/sQWz-W_xOeI/s1600/20140319_183609.jpg",
          name: "Roberto Alcantara",
          position: "Coordinator",
          testimony:
            "When I started this program, one of the things that called my attention was the teachers. I have always had this general idea of teaching as a career where people were not enough motivated about what they were doing. The first day of classes in the E.I.P., I saw these people being so energetic, organized and willing to give the best of them to make us learn. I am not going to lie, I was amazed,  happy and with high expectations since that day. I am the type of person who appreciates teaching and when is done with effort. I think that a good teacher can have a huge influence on his/her students. This was what happened in the English Immersion Program: part of the discipline we put into this was a consequence teachers’ effort. Now, many of us have cultivated the motivation to become teachers, as well."
        },
        {
          photo: "https://eipschool.files.wordpress.com/2019/08/aaa.png",
          name: "Esther Leonela Rodríguez",
          position: "Teacher",
          testimony:
            `Seeing my classmates working so hard to take advantage of every lesson, or something as simple as receiving WhatsApp messages from them exclusively in English, or the mere fact that many of them used to use their English dictionaries outside class time inspired me a lot, and I know that many of you feel the same. <br>10 months have passed, and I can say without any doubt that each of you did not see this program as another normal, or perhaps "boring" university course or subject, it was more than that. We met different people and we got involved with them 5 days a week for almost one year, and after all this time, we feel that we that we are like family. Sharing with every classmate was an experience per se, and learning with them has been a wonderful part of our lives and a meaningful memory to keep.`
        },
      ]
    };
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Francois+One&display=swap");
.the-program {
  background: #135393 !important;
  background: linear-gradient(50deg, #135393, #d13c34) !important;
  border-radius: 5px !important;
  color: white;
}
.grids {
  border-radius: 8px !important;
}
.main-title {
  font-family: "Francois One", serif !important;
  /* font-style: italic !important; */
  color:#135393
}
.testimony-text {
  font-style: italic !important;
  text-align: justify !important;
}
.flip {
  transform: rotate(180deg) scaleX(1) !important;
}
.blue-cards{
  background: linear-gradient(0deg, rgba(3,15,27,1) 33%, rgb(20, 91, 161) 100%);
  color: white;
  
}
</style>


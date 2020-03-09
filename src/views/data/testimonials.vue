<template>
  <v-container class="mb-4 pb-5 grey lighten-3">
    <v-content class="my-4 py-5">
      <header>
        <v-card-title class="justify-center display-1 font-weight-light main-title">
          testimonials
        </v-card-title>
      </header>
      <section>
        <v-layout
          row
          wrap
          justify-center
          align-start
        >
          <v-card
            v-for="(item) in testimonies"
            :key="item.name"
            class="justify-center ma-3 elevation-24 grids hovering grey darken-4 white--text"
            raised
            max-width="300px"
            min-width="300px"
          >
            <v-card-title class="round pb-0">
              <v-layout justify-center>
                <v-avatar
                  size="80"
                  class="ma-1"
                >
                  <v-img
                    :src="item.url"
                    alt="testimony"
                  />
                </v-avatar>
              </v-layout>
              <v-layout
                justify-center
                class="testimony-text px-5"
              >
                {{ item.name }}
              </v-layout>

              <v-layout
                justify-center
                class="testimony-text px-5 my-0"
              >
                <b>{{ item.position }}</b>
              </v-layout>
            </v-card-title>

            <v-card-text class="testimony-text">
              <v-icon
                color="#d13c34"
                medium
                class="flip"
              >
                format_quote
              </v-icon>
              <div v-html="item.testimony" />
              <v-icon
                color="#d13c34"
                medium
              >
                format_quote
              </v-icon>
            </v-card-text>
          </v-card>
        </v-layout>
      </section>
    </v-content>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      testimonies: [
        {
          photo: "testimony1.jpg",
          name: "Jennifer Tavarez",
          position: "Student",
          testimony:
            "It is so encouraging to see how many graduates are here today: of all different ages, status, and with different goals. However, we are all linked by personal and professional growth. <br> Learning a new language is not an easy task; in the beginning, we surely met some classmates that knew very little English aside from 'hello', 'goodbye', and some numbers, but now, they can easily have a conversation with a native English speaker. I have seen it happen in a matter of months, and I can say that being a witness of this process has been amazing."
        },
        {
          photo: "testimony2.jpg",
          name: "Roberto Alcantara",
          position: "Coordinator",
          testimony:
            "When I started this program, one of the things that called my attention was the teachers. I have always had this general idea of teaching as a career where people were not enough motivated about what they were doing. The first day of classes in the E.I.P., I saw these people being so energetic, organized and willing to give the best of them to make us learn. I am not going to lie, I was amazed,  happy and with high expectations since that day. I am the type of person who appreciates teaching and when is done with effort. I think that a good teacher can have a huge influence on his/her students. This was what happened in the English Immersion Program: part of the discipline we put into this was a consequence teachers’ effort. Now, many of us have cultivated the motivation to become teachers, as well."
        },
        {
          photo: "testimony3.jfif",
          name: "Luisa M. Rodríguez",
          position: "Teacher",
          testimony: `Seeing my classmates working so hard to take advantage of every lesson, or something as simple as receiving WhatsApp messages from them exclusively in English, or the mere fact that many of them used to use their English dictionaries outside class time inspired me a lot, and I know that many of you feel the same. <br>10 months have passed, and I can say without any doubt that each of you did not see this program as another normal, or perhaps "boring" university course or subject, it was more than that. We met different people and we got involved with them 5 days a week for almost one year, and after all this time, we feel that we that we are like family. Sharing with every classmate was an experience per se, and learning with them has been a wonderful part of our lives and a meaningful memory to keep.`
        }
      ]
    };
  }
};
</script>
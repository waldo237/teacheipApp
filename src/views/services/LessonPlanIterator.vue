<template>
  <div class="grey lighten-5">
    <v-layout
      justify-center
      row
      wrap
      primary-title
      class="display-1 font-weight-light  text-xs-center main-title mt-5 pt-5 mx-4 px-1 grey lighten-5"
    >
      Lesson Plans
    </v-layout>
    <!-- alternative circular loading starts -->
    <v-layout
      row
      wrap
      justify-center
      v-if="stillLoading"
      class="ma-5 pa-5 grey lighten-5"
    >
      <loading />
    </v-layout>
    <!-- alternative circular loading endsd -->
    <v-container
      v-else
      fluid
      grid-list-md
      class="py-5"
    >
      <v-layout
        wrap
        class="mx-5 px-5 round"
        justify-center
        color=" lighten-5 "
      >
        <v-text-field
          class="mx-4 mt-3"
          label="Go ahead! find your lesson plan"
          single-line
          prepend-icon="search"
          color="#c6192a"
          clearable
          v-model="searchTerms"
        />
      </v-layout>
      <v-layout
        row
        wrap
        align-center
        justify-center
        class="mx-3 grey lighten-5"
      >
        <v-overflow-btn
          class=" px-auto mx-5 grey lighten-5 round"
          :items="series"
          label="Select a Series"
          color="#c6192a"
          prepend-icon="book"
          solo
          flat
          v-model="dropdownSeries"
        />
        <v-overflow-btn
          class=" px-auto mx-5 grey lighten-5 "
          :items="level"
          label="Select a Level"
          color="#c6192a"
          prepend-icon="trending_up"
          solo
          flat
          v-model="dropdownLevel"
        />
        <v-overflow-btn
          class=" px-auto mx-5 grey lighten-5 "
          :items="unit"
          label="Select a Unit"
          prepend-icon="format_list_numbered_rtl"
          color="#c6192a"
          solo
          flat
          v-model="dropdownUnit"
        />
      </v-layout>

      <v-layout
        wrap
        class="mx-3 px-4"
        justify-center
      >
        <v-card
          v-for="item in displayedLessonPlans"
          :key="item.download"
          max-width="350px"
          min-width="350px"
         
          class="my-2 mx-auto elevation-10 round justify-center mx-1 elevation-24 grids mt-2 hovered grey lighten-3"
          :class="(is2020(item.LastUpdated)? 'turnwhite': 'grey--text')"
        >
          <v-card-title
            class="py-1"
            :class="(is2020(item.LastUpdated)?'subtitle-1 deep font-weight-bold white--text': 'subtitle-1 blue-cards font-weight-bold white--text')"
          >
            <v-badge 
              color="#c6192a"
              width="100%"
            >
              <template
                v-slot:badge
                v-if="is2020(item.LastUpdated)"
              >
                <span style="font-size: 70%; font-weight: bold"> New</span>
              </template>
              <v-icon
                medium
                v-if="is2020(item.LastUpdated)"
              >
                star
              </v-icon>
              <span>{{ item.parents }}</span>
            </v-badge>
          </v-card-title>

          <v-card-text>
            <span class="font-weight-bold">Book Series </span> {{ item.Name }}
            <br>
            <span class="font-weight-bold">Level: </span> {{ item.level }}
            <br><span class="font-weight-bold">Type:</span> {{ item.Type }}
            <br><span class="font-weight-bold">Size: </span>{{ item.Size }}
            <br><span class="font-weight-bold">Last Updated: </span>{{ ago(item.LastUpdated) }} <br><span
              class="font-weight-bold"
            >Posted by:
            </span>
            {{ item.Owner }}
          </v-card-text>
          <v-card-actions class="mx-4">
            <a
              :href="item.Link"
              target="blank"
            >
              <v-icon color="#c6192a">open_in_new</v-icon><span :class="(is2020(item.LastUpdated))? 'black--text ':'white--text'"> View online</span></a>
            <v-spacer /><a :href="item.download">
              <span :class="(is2020(item.LastUpdated))? 'black--text':'white--text'"> download</span>
              <v-icon color="#c6192a">get_app</v-icon></a>
          </v-card-actions>
        </v-card>
      </v-layout>
      <v-layout
        align-center
        class="mb-5 pb-5 mx-auto px-auto"
      >
        <v-pagination
          class="mx-auto px-auto"
          v-model="page"
          :length="pages.length"
          color="#c6192a"
          circle
        />
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import loading from "@/components/loading.vue";
import _ from "lodash";

export default {
  components: { loading },
  data: () => ({
    newFormat: {
      id: "15fTIx93wAkKTC-HfLk9aDGqCEZ19Qb2zXtTwMOGIctU",
      link:
        "https://docs.google.com/document/d/15fTIx93wAkKTC-HfLk9aDGqCEZ19Qb2zXtTwMOGIctU/view?usp=drivesdk",
      download:
        "https://docs.google.com/uc?export=download&confirm=no_antivirus&id=15fTIx93wAkKTC-HfLk9aDGqCEZ19Qb2zXtTwMOGIctU"
    },
    stillLoading: true,
    newPlan:true,
    page: 1,
    perPage: 9,
    pages: [],
    lPs: [],
    searchTerms: "",
    dropdownSeries: "",
    dropdownLevel: "",
    dropdownUnit: "",
    filterDir: "asc",
    search: "",

    series: ["Interchange", "Double Click", "Passages", "World Link"],
    level: [
      "Basic 1",
      "Basic 2",
      "Intermediate 1",
      "Intermediate 2",
      "Advanced 1"
    ],
    unit: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16"
    ]
  }),
  computed: {
    ...mapGetters(["getLessonPlans"]),

    displayedLessonPlans() {
      return this.paginate(this.lPs);
    }
  },
  methods: {
    frame(url) {
      return `https://drive.google.com/thumbnail?authuser=0&sz=w180& z=h140&id=${url}`;
    },
    ...mapActions(["fetchLessonPlans"]),
    setReady() {
      this.stillLoading = false;
    },
    ago(time) {
      return moment(time, "YYYYMMDD").fromNow();
    },
    is2020(time){
      return new Date(time).getFullYear() == 2020
    },
    // set the number of pages based on the result of the calculation
    setPages() {
      let numberOfPages = Math.ceil(this.lPs.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    // calculate based on the lesson Plans and return
    // a copy with the narrowed search
    paginate(lPs) {
      //  dropdowns
      if (this.dropdownSeries || this.dropdownLevel || this.dropdownUnit) {
        return this.lPs.filter(
          function(item) {
            return (
              item.Name.toLowerCase().match(
                this.dropdownSeries.toLowerCase()
              ) &&
              item.level
                .toLowerCase()
                .match(this.dropdownLevel.toLowerCase()) &&
              item.parents.toLowerCase().match(this.dropdownUnit.toLowerCase())
            );
          }.bind(this)
        );
      }
      //  searching
      if (this.searchTerms) {
        return this.lPs.filter(
          function(item) {
            return (
              item.Name.toLowerCase().match(this.searchTerms.toLowerCase()) ||
              item.level.toLowerCase().match(this.searchTerms.toLowerCase()) ||
              item.parents.toLowerCase().match(this.searchTerms.toLowerCase())
            );
          }.bind(this)
        );
      }
      // pagination
      const page = this.page;
      const perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return lPs.slice(from, to);
    }
  },
  watch: {
    // check if the state of lPs changes to trigger function
    lPs() {
      this.setPages();
      this.setReady();
    },
    searchTerms() {
      this.dropdownSeries = "";
      this.dropdownLevel = "";
      this.dropdownUnit = "";
    }
  },

  async created() {
    await this.fetchLessonPlans();
    // set the value of local lPs
    this.lPs = this.getLessonPlans;
  }
};
</script>
<style>
.deepy {
  background-image: radial-gradient(
    circle 592px at 48.2% 50%,
    rgba(255, 255, 249, 0.6) 0%,
    rgb(140, 144, 151) 74.6%
  );
}
.turnwhite:hover{
  color: rgba(255, 255, 249, 0.6) 0%,
}
.hovered:hover {
  background: #51647c !important;
  animation-duration: 0.1s;
  animation-name: pulse;
  animation-timing-function: ease-in-out;
}
.deep {
  background: #1488cc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2b32b2,
    #1488cc
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2b32b2,
    #1488cc
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>

<template>
  <v-container fluid grid-list-md>
    <v-layout wrap class="mx-5 px-5" align-content-center>
          <v-text-field
          class="mx-4"
            label="Go ahead! find your lesson plan"
            single-line
            prepend-icon="search"
            color="red"
            clearable
            v-model="searchTerms"
          ></v-text-field>
    </v-layout>
    <v-layout wrap class="mx-5 px-5" align-content-center>
        <v-overflow-btn
          class=" px-auto mx-5 grey lighten-5 "
          :items="series"
          label="Select a Series"
          color="red"
          solo
          flat
          v-model="dropdownSeries"
          
        ></v-overflow-btn>
        <v-overflow-btn
          class=" px-auto mx-5 grey lighten-5 "
          :items="level"
          label="Select a Level"
          color="red"
          solo
          flat
           v-model="dropdownLevel"
        ></v-overflow-btn>
        <v-overflow-btn
          class=" px-auto mx-5 grey lighten-5 "
          :items="unit"
          label="Select a Unit"
          color="red"
          solo
          flat
       v-model="dropdownUnit"
        ></v-overflow-btn>
        
     
    </v-layout>
        
    <v-layout wrap class="ma-3 pa-4" align-content-center>
        
      <v-card v-for="item in displayedLessonPlans" :key="item.download"
      max-width="380px"
      min-width="380px"
      class="my-2 mx-auto elevation-24 round"
      
      >
        <v-card-title primary-title class="subtitle-1 blue-grey darken-4 font-weight-bold white--text"> Document Name: {{item.parents}}</v-card-title>
        <v-card-text>
           <span class="font-weight-bold">Book Series </span> {{item.Name}}
          <br/> <span class="font-weight-bold">Level: </span> {{item.level}}
           <br/><span class="font-weight-bold">Type:</span> {{ item.Type }}
           <br/><span class="font-weight-bold">Size: </span>{{ item.Size }}
           <br/><span class="font-weight-bold">Last Updated: </span>{{ ago(item["Last Updated"]) }} 
           <br/><span class="font-weight-bold">Posted by: </span> {{item.Owner}}
        </v-card-text>
        <v-card-actions class="mx-5">
             <a :href="item.Link" target="blank" > <v-icon>open_in_new</v-icon> View online</a>
           <v-spacer/><a :href="item.download">  download <v-icon>get_app</v-icon></a> 
        </v-card-actions>
      </v-card>
     
    </v-layout>
    <v-layout align-center class="mb-5 pb-5 mx-auto px-auto">
      <v-pagination
      class="mx-auto px-auto"
      v-model="page"
      :length="pages.length"
      color="red"
      circle
    ></v-pagination>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';
import _ from 'lodash';

export default {
  data: () => ({
    page: 1,
    perPage: 9,
    pages: [],
    lPs:[],
      searchTerms: "",
      dropdownSeries: "",
      dropdownLevel: "",
      dropdownUnit: "",
      filterDir: 'asc',
      search:"",
    
      series: ["Interchange", "Double Click", "Passages", "World Link"],
      level: ["Basic 1", "Basic 2", "Intermediate 1", "Intermediate 2", "Advanced 1"],
      unit: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],
  }),
  computed: {
    ...mapGetters(["getLessonPlans"]),
   
     displayedLessonPlans () {
       
      return this.paginate(this.lPs);
     },
    
    // searchedLPs: function() {
    //   return this.getLessonPlans.filter(function(item) {
        
    // if(this.item && this.searchTerms) return (
    //       (item.Name.toLowerCase().match(this.searchTerms.toLowerCase())) ||
    //       (item.level.toLowerCase().match(this.searchTerms.toLowerCase())) ||
    //       (item.parents.toLowerCase().match(this.searchTerms.toLowerCase()))
    //     )
    //   }.bind(this));
    // }, //searchedApts

    // filteredLPs: function() {
    //   return _.orderBy(this.searchedLPs, function(item) {
    //     return item[this.dropdownSeries].toLowerCase();
    //   }.bind(this), this.filterDir);
    // } //filteredApts
  },
  methods: {
    selectMenu(){
// TODO
    },
  
    ...mapActions(["fetchLessonPlans"]),
    ago(time){ return  moment(time,"YYYYMMDD").fromNow()},
    // set the number of pages based on the result of the calculation
    setPages () {
      let numberOfPages = Math.ceil(this.lPs.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    // calculate based on the lesson Plans and return
    // a copy with the narrowed search
     paginate (lPs) {
      //  dropdowns
     if (this.dropdownSeries || this.dropdownLevel || this.dropdownUnit) {
           return this.lPs.filter(function(item) {
           return (
          (item.Name.toLowerCase().match(this.dropdownSeries.toLowerCase())) &&
          (item.level.toLowerCase().match(this.dropdownLevel.toLowerCase())) &&
          (item.parents.toLowerCase().match(this.dropdownUnit.toLowerCase()))
        )
      }.bind(this));
     }
    //  searching
        if (this.searchTerms) {
           return this.lPs.filter(function(item) {
           return (
          (item.Name.toLowerCase().match(this.searchTerms.toLowerCase())) ||
          (item.level.toLowerCase().match(this.searchTerms.toLowerCase())) ||
          (item.parents.toLowerCase().match(this.searchTerms.toLowerCase()))
        )
      }.bind(this));
     }
// pagination
      const page = this.page;
      const perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  lPs.slice(from, to);
     
    }
  },
  watch:{
    // check if the state of lPs changes to trigger function
    lPs () {
      this.setPages();
    },
  },
  async created() {
    await this.fetchLessonPlans();
    // set the value of local lPs
    this.lPs = this.getLessonPlans;
  }
};
</script>
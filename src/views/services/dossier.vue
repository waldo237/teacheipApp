<template>
  <div>
    <!-- alternative circular loading starts -->
    <v-layout
      row
      wrap
      justify-center
      v-if="stillLoading"
      class="ma-5 pa-5"
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
        color="#c6192a lighten-5 "
      >
        <v-text-field
          class="mx-4 mt-3"
          label="Need a form? Look it up!"
          single-line
          prepend-icon="search"
          color="#c6192a"
          clearable
          v-model="searchTerms"
        />
      </v-layout>

      <v-layout
        wrap
        class="mx-3 px-4"
        justify-center
      >
        <v-card
          v-for="item in lPs"
          :key="item.download"
          max-width="380px"
          min-width="380px"
          class="my-2 mx-auto elevation-10 round justify-center mx-1 elevation-24 grids mt-2 hovering"
        >
          <v-card-title
            primary-title
            
            class="subtitle-1 gradient font-weight-bold white--text py-2 my-0"
          >
            Document Name: {{ item.name.split('.')[0] }}
          </v-card-title>
          <v-card-text class="my-0 py-0">
            <br><span class="font-weight-bold">Type:</span> {{ item.name.split('.')[1] }}
            <br><span class="font-weight-bold">Size: </span>{{ item.size }}
            <br><span class="font-weight-bold">Last Updated: </span>{{ ago(item["date"]) }} 
            <br><span class="font-weight-bold">Posted by: </span> {{ item.Owner }}
             <v-layout row wrap justify-center>
               <img :src="frame(item.id)" :alt="item.name" max-height="200px" class="round"/>
             </v-layout> 


          </v-card-text>
          <v-card-actions class="mx-5">
            <a
              :href="item.Link"
              target="blank"
            > <v-icon color="#c6192a">open_in_new</v-icon><span class="white--text"> View online</span></a>
            <v-spacer /><a :href="item.download"> <span class="white--text"> download</span>  <v-icon color="#c6192a">get_app</v-icon></a> 
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
import moment from 'moment';
import loading from '@/components/loading.vue'
import _ from 'lodash';

export default {
  components:{loading},
  data: () => ({
   
    stillLoading: true,
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
    ...mapGetters(["getDossier"]),
   
     displayedLessonPlans () {
       
      return this.paginate(this.lPs);
     },
  },
  methods: {
frame(url){
return `https://drive.google.com/thumbnail?authuser=0&sz=w280&id=${url}`
},
    ...mapActions(["fetchDossier"]),
    setReady(){
      this.stillLoading = false;
    },
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
          (item.name.toLowerCase().match(this.dropdownSeries.toLowerCase())) &&
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
      this.setReady();
    },
    searchTerms(){
      this.dropdownSeries = '';
      this.dropdownLevel = '';
      this.dropdownUnit = '';
    }
  },

  async created() {
    await this.fetchDossier();
    // set the value of local lPs
    this.lPs = this.getDossier;
   this.$store.commit("setFullScreen", false);
  }
};
</script>
<style  scoped>
.gradient{
background: linear-gradient(to right, #ad5389, #3c1053);
}
</style>
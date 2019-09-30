<template>
  <div class="px-5 pb-5 pt-1 mx-4 mb-5 mt-1  contain">
    <v-card class="px-3 elevation-24 contain text-xs-center text-lg-center">
      <div>
        <v-card-text class="display-1 mx-auto">
          Lesson plan repository
        </v-card-text>
      </div>

      <!-- search engine -->
      <form
        id="search"
        class="form-inline"
      >
        <i aria-hidden="true" />
        <v-text-field
          @keyup="searching"
          v-model="searcher"
          class="form-control mt-1 pt-1"
          type="text"
          append-icon="search"
          placeholder=" Go ahead!   Search Lesson Plans..."
          aria-label="Search"
        />
      </form>
      <!--Blue select-->
      <v-flex
        align-center
        class="select-menus mb-5 title"
      >
        <!-- loading image starts -->
        <v-img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
          v-if="loading"
          alt="loading"
          style="height: 70px; width: 70px;"
          class="mx-auto"
        />
            
        <!-- loading image ends -->
        <!-- snackbar for communicating with user  starts-->
        <v-snackbar
          class="error"
          v-model="snackbar"
          color
          multi-line
          :timeout="6000"
          top="top"
        >
          "Please select both fields to continue using the filter"
          <v-btn
            dark
            text
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
                
        <!-- snackbar for communicating with user ends-->
        <!-- dropdown menus to find info starts -->
        <select
          id="level"
          class="sign-up elevation-24 pa-2 mt-3 mx-5"
          @change="selectMenu"
        >
          <option selected>
            <span>select Level</span>
          </option>
          <!-- <option  v-for="item in getLessonPlans" :key="item.download" > <span v-show="filterLP(item.level)">{{item.level}}</span> </option> -->
        </select>
        <select
          @change="selectMenu"
          id="series"
          class="sign-up elevation-24 pa-2 mt-3 mx-5"
          data-toggle="tooltip"
          data-html="true"
          title="Please select all fields"
        >
          <option selected>
            select series
          </option>
          <option>Interchange</option>
          <option>Double Click</option>
          <option>Passages</option>
        </select>
        <!-- dropdown menus to find info ends -->
      </v-flex>
      <!-- table starts-->
      <div
        style="overflow-x:auto;"
        class="mb-5"
      >
        <table
          id="tblReportResultsDemographics"
          class="table table-striped mb-5 pb-3 "
          cellspacing="2" 
        >
          <thead>
            <tr class="subtitle-1">
              <th>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  Series
                </v-layout>
              </th>
              <th>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  File
                </v-layout>
              </th>
              <th>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  Level
                </v-layout>
              </th>
              <th>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  Download
                </v-layout>
              </th>
              <th>
                <v-layout class="mx-2">
                  Type
                </v-layout>
              </th>
              <th>
                <v-layout
                  class="mx-auto"
                  justify-right
                >
                  Size
                </v-layout>
              </th>
              <th>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  Link
                </v-layout>
              </th>
              <th>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  Last Udated
                </v-layout>
              </th>
              <th>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  Owner
                </v-layout>
              </th>
            </tr>
          </thead>
          <tbody
            v-for="item in getLessonPlans"
            :key="item.download"
            class="tBody"
            @loadstart="populateLevel(getLessonPlans)"
          >
            <tr
              class="lessonPlan"
              @readystatechange="loading = false"
            >
              <td>
                <v-layout
                  class="mx-2 "
                  justify-right
                >
                  {{ item.Name }}
                </v-layout>
              </td>
              <td>
                <v-flex
                  class="ma-2 text-truncate"
                  style="max-width:150px"
                >
                  {{ item.parents }}
                </v-flex>
              </td>
              <td>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  {{ item.level }}
                </v-layout>
              </td>
              <td>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  <a :href="item.download">download</a>
                </v-layout>
              </td>
              <td>
                <v-layout
                  class="mx-auto"
                  justify-right
                  style="max-width:50px"
                >
                  {{ item.Type }}
                </v-layout>
              </td>
              <td>
                <v-layout
                  class="mx-auto"
                  justify-right
                >
                  {{ item.Size }}
                </v-layout>
              </td>
              <td>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  <a :href="item.Link">Link</a>
                </v-layout>
              </td>
              <td>
                <v-layout
                  class="mx-2"
                  justify-right
                  style="min-width:100px"
                >
                  {{ ago(item["Last Updated"]) }}
                </v-layout>
              </td>
              <td>
                <v-layout
                  class="mx-2"
                  justify-right
                >
                  {{ item.Owner }}
                </v-layout>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-card>
  </div>
  <!-- table ends-->
</template>

<style scoped>
@media screen  and (max-width: 960px)  {
 .table{
    font-size: 85% !important;
  }
 .select-menus{
    font-size: 85% !important;
  }
  .contain{
    margin: 2% !important;
    padding: 2% !important;
  }
}
@media screen  and (min-width: 1264px)  {
 .table{
    margin: auto !important;
  }
}
</style>

<script>
/**
 * TODO
 * make loading image disappear when data is done loading
  */
import $ from 'jquery';
import moment from 'moment'
import {mapActions, mapGetters} from 'vuex'
import { setTimeout } from 'timers';
export default {
  name: "Site",
  data(){
    return{
      searcher:"",
      snackbar: false,
      loading: true,
    }
  },
 computed: mapGetters(['getLessonPlans']),
  methods: {
    ...mapActions(['fetchLessonPlans']),
    filterLP(level){
      const series = document.querySelector("#level");
     return (!series.textContent.includes(level))
    },
  /**
   * ago
   * converts dates into how long ago
   * @param {Date} time
   * @returns {String}
   */
    ago(time){ return  moment(time,"YYYYMMDD").fromNow()},

  /**
   * populateLevel
   * populates the 'level' dropdowns
   * @param {Date} time
   * @returns {String}
   */
    populateLevel(lp) {
       lp.forEach(async function(datarow) {
          for (const property in datarow) {
            if (property === "level") {
              const option = await document.createElement("option");
              const series = document.querySelector("#level");
              option.textContent = datarow[property];
              if (!series.textContent.includes(option.textContent)) {
                series.appendChild(option);
              }
            }
          }
        });
        return true;
    },
// triggers an error if both dropdowns are not selected
eventTrigger(){
this.$emit('done');
},
   showError() {
     const series = $("#series")
       .val()
       .toLocaleLowerCase();
     const level = $("#level")
       .val()
       .toLocaleLowerCase();

     if (series === "select series" || level === "select level") {
      this.snackbar= true;
     } else {
      this.snackbar= false;
     }
   },
  //  showError ends

// excludes the data that are not selected in dropdown menu
    selectMenu: function(){
        this.showError();
        const series = $("#series")
          .val()
          .toLocaleLowerCase();
  
        $(".lessonPlan").filter(function() {
          const cells = $(this)
            .text()
            .toLowerCase();
          if (!cells.includes( $("#level")
          .val()
          .toLowerCase()) || !cells.includes(series)) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
     
        this.showError();
        const level = $("#level")
          .val()
          .toLocaleLowerCase();

        $(".lessonPlan").filter(function() {
          const cells = $(this)
            .text()
            .toLowerCase();
          if (!cells.includes(  $("#series")
          .val()
          .toLowerCase()) || !cells.includes(level)) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
    },
    // select menu ends
    async  searching() {
        let word = await this.searcher;
       const done =await $(".lessonPlan").filter(function() {
          $(this).toggle(
            $(this)
              .text()
              .toLowerCase()
              .indexOf(word) > -1
          );
        });
    },
    
  },
  // methods ends
  async created() {
    await this.fetchLessonPlans();
    this.populateLevel(this.getLessonPlans);
  },
  watch: {
    'getLessonPlans': function (val, oldVal) {
      this.loading = false;
 
},
    }
};
</script>

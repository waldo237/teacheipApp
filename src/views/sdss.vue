<template>
  <div class="px-5 pb-5 pt-1 mx-4 mb-5 mt-1  contain">
    <v-card class="px-3 elevation-24 contain text-xs-center text-lg-center">
     <div>
          <v-card-text class="display-1 mx-auto">Lesson plan repository</v-card-text>

     </div>

          <!-- search engine -->
          <img
            src="../assets/loading.gif"
            id="loading"
            alt="loading"
            style="height: 70px; width: 70px;"
          />
          <form   id="search" class="form-inline">
              
            <i  aria-hidden="true"></i>
            <v-text-field
            class="input-search form-control mt-1 pt-1"
              v-model="search"
              type="text"
              append-icon="search"
              placeholder=" Go ahead!   Search Lesson Plans..."
              aria-label="Search"
            ></v-text-field>
          </form>
          <!--Blue select-->
          <v-flex align-center class="select-menus mb-5 title">
            <div class="error"></div>
            <select id="level" class="custom-select-md mt-3 mx-5">
              <option selected>
                <span>select Level</span>
              </option>
            </select>
            <select
              id="series"
              class="custom-select-md mt-3 mx-5"
              data-toggle="tooltip"
              data-html="true"
              title="Please select all fields"
            >
              <option selected>select series</option>
              <option>Interchange</option>
              <option>Double Click</option>
              <option>Passages</option>
            </select>
          </v-flex>
          <!--/Blue select-->
          <!-- table-->
            <div style="overflow-x:auto;">

        	<table id="tblReportResultsDemographics" class="table table-striped"
										cellspacing="2" >
                  <thead >
                  <tr class="subtitle-1">
                    <th><v-layout class="mx-2" justify-right>Series</v-layout></th>
                    <th><v-layout class="mx-2" justify-right>File</v-layout></th>
                    <th><v-layout class="mx-2" justify-right>Level</v-layout></th>
                    <th><v-layout class="mx-2" justify-right>Download</v-layout></th>
                    <th><v-layout class="mx-auto">Type</v-layout></th>
                    <th><v-layout class="mx-auto" justify-right>Size</v-layout></th>
                    <th><v-layout class="mx-2" justify-right>Link</v-layout></th>
                    <th><v-layout class="mx-2" justify-right>Last Udated</v-layout></th>
                    <th><v-layout class="mx-2" justify-right>Owner</v-layout></th>
                  </tr>
                </thead>
                <tbody v-for="item in getLessonPlans" :key="item.download" class="tBody">
                  <tr class="lessonPlan" v-if="exclude">
                  <td ><v-layout class="mx-2 " justify-right>{{ item.Name }}</v-layout> </td>
                  <td ><v-flex class="ma-2 text-truncate" style="max-width:150px">{{ item.parents }}</v-flex> </td>
                    <td><v-layout class="mx-2" justify-right>{{ item.level }}</v-layout> </td>
                    <td ><v-layout class="mx-2" justify-right><a :href="item.download">download</a></v-layout>  </td>
                    <td><v-layout class="mx-auto" justify-right>{{ item.Type }}</v-layout> </td>
                    <td><v-layout class="mx-auto" justify-right>{{ item.Size }}</v-layout> </td>
                    <td ><v-layout class="mx-2" justify-right><a :href="item.Link">Link</a></v-layout>  </td>
                    <td><v-layout class="mx-2" justify-right style="min-width:100px">{{ago(item["Last Updated"])}}</v-layout> </td>
                    <td><v-layout class="mx-2" justify-right>{{ item.Owner }}</v-layout> </td>
                  </tr>
                </tbody >
            </table>
            </div>
           
      <!-- #main -->
    </v-card>
    <!-- #primary -->
    <aside class="widget-area ma-5 pa-5">
      <div class="widget-wrapper">
        <div class="widget-column footer-widget-1">
          <section id="custom_html-5" class="widget_text widget widget_custom_html">
            <div class="textwidget custom-html-widget">
              <!-- start -->
              <br />
              <a
                style="text-decoration:none;"
                href="https://join.slack.com/t/englishimmers-em06602/shared_invite/enQtNjgwNzUxMTkzMjk2LTJlZGU3OGViYjAzYTI4NWMzZGUwNjMyNWQ2MGMwNTIxYzk2YzFjYzYwN2QyZDUxM2Q2YzM5ZDU4NWU4ZjcxMTU"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  class="communitywidget"
                  style="flex-grow:1;flex-shrink:1;flex-basis:0;text-align:center;margin:5%;border:solid 1px rgb(19,83,147);box-shadow:0 10px 16px 0 rgba(0,0,0,0.425), 0 14px 30px 0 rgba(0,0,0,0.356);margin:10px;padding:10px;border-radius:5%;"
                >
                  <b style="color:black;font-size:100%;">Join our community</b>
                  <br />
                  <img
                    src="../assets/5cb480cd5f1b6d3fbadece79.png"
                    alt="Our community on Slack"
                    style="width:100px;height:100px;"
                  />
                  <img
                    src="../assets/mescyt-1024x878.png"
                    alt="Our community on Slack"
                    style="width:120px;height:120px;"
                  />
                </div>
              </a>
              <!-- finish -->
            </div>
          </section>
        </div>
      </div>
    </aside>
    <!-- #secondary -->
  </div>
  <!-- #content -->
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

</style>
<script>
import $ from "jquery";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "site",
  data(){
    return {
search: "",
exclude: true,

    }
  },
  computed: mapGetters(["getLessonPlans"]),
  methods: {
    ...mapActions(["fetchLessonPlans"]),
 ago(time){ return  moment(time,"YYYYMMDD").fromNow()},
    table(lp) {
      $(document).ready(async function() {
        $("#tblReportResultsDemographics").hide();
        $("#search").hide();
        $("#level").hide();
        $("#series").hide();
        const jres = lp;
        let ready = false;
        ready = await interset(jres);
        if (ready) {
          $("#loading").fadeOut();
          $("#tblReportResultsDemographics").fadeIn();
          $("#search").fadeIn();
          $("#level").fadeIn();
          $("#series").fadeIn();
        }
      });

      const interset = async function(jres) {
        const table = document.querySelector("#tblReportResultsDemographics");
        await jres.forEach(async function(datarow) {
          const newRow = await document.createElement("tr");
          const Rowdiv = await document.createElement("div");
          newRow.setAttribute("class", "rows-employees mx-3 ");
          newRow.setAttribute("scope", "row");
          for (const property in datarow) {
            if (
              datarow.hasOwnProperty(property) &&
              property.toLocaleLowerCase() !== "created at"
            ) {
              let cell = await document.createElement("td");
              if (property === "download") {
                const p = await document.createElement("p");
                p.textContent = "download";
                const alink = await document.createElement("a");
                await alink.setAttribute("href", datarow[property]);
                alink.appendChild(p);
                cell.appendChild(alink);
              } else if (property === "Link") {
                const p = await document.createElement("p");
                p.textContent = "Link";
                const alink = await document.createElement("a");
                await alink.setAttribute("href", datarow[property]);
                alink.setAttribute("target", "blank");
                alink.appendChild(p);
                cell.appendChild(alink);
              } else if (property === "Last Updated") {
                cell.textContent = moment(
                  datarow[property],
                  "YYYYMMDD"
                ).fromNow();
              } else {
                cell.textContent = datarow[property];
              }
              cell.setAttribute("class","mx-5");
              cell.setAttribute(
                "style",
                ""
              );

              newRow.appendChild(cell);
              Rowdiv.setAttribute("class", "flex-lg-wrap");
              Rowdiv.appendChild(newRow);
            }

            if (property === "level") {
              const option = await document.createElement("option");
              const series = document.querySelector("#level");
              option.textContent = datarow[property];

              if (!series.textContent.includes(option.textContent)) {
                series.appendChild(option);
              }
            }
          }
          table.appendChild(newRow);
        });
        return true;
      };
    },
    searcher: function() {
      // const lessonPlan = document.querySelector('#lessonPlan');
      // if (lessonPlan.textContent.toUpperCase().includes( this.search.toUpperCase())){
      //    this.exclude =false;
      //  }
      $(document).ready(async function() {
        $(".input-search").keyup(function() {
          const value = $(this)
            .val()
            .toLowerCase();
          $(".lessonPlan").filter(function() {
            $(this).toggle(
              $(this)
                .text()
                .toLowerCase()
                .indexOf(value) > -1
            );
          });
        });
      });
    },
    selectMenu: function() {
      $(document).ready(async function() {
        const showError = function() {
          const series = $("#series")
            .val()
            .toLocaleLowerCase();
          const level = $("#level")
            .val()
            .toLocaleLowerCase();
          const error = document.querySelector(".error");
          error.setAttribute("style", "color: red");
          error.textContent =
            "Please select all fields to continue using the filter";

          if (series === "select series" || level === "select level") {
            $(".error").show();
          } else {
            $(".error").hide();
          }
        };

        $("#level").on("change", function() {
          showError();
          const series = $("#series")
            .val()
            .toLocaleLowerCase();
          const value = $(this)
            .val()
            .toLowerCase();
          $(".rows-employees").filter(function() {
            const cells = $(this)
              .text()
              .toLowerCase();
            if (!cells.includes(value) || !cells.includes(series)) {
              $(this).hide();
            } else {
              $(this).show();
            }
          });
        });
        $("#series").on("change", function() {
          showError();
          const level = $("#level")
            .val()
            .toLocaleLowerCase();
          const value = $(this)
            .val()
            .toLowerCase();
          $(".rows-employees").filter(function() {
            const cells = $(this)
              .text()
              .toLowerCase();
            if (!cells.includes(value) || !cells.includes(level)) {
              $(this).hide();
            } else {
              $(this).show();
            }
          });
        });
      });
    }
  },
  async created() {
    await this.fetchLessonPlans();
 this.searcher();

    this.selectMenu();
  }
};
</script>

<template>
  <div class="pa-5 ma-5">
    <v-card class="px-5 elevation-24">
      <main id="main" class="site-main">
          <v-card-title class="title mx-auto">Lesson plan repository</v-card-title>
          <!-- search engine -->
          <img
            src="../assets/loading.gif"
            id="loading"
            alt="loading"
            style="height: 70px; width: 70px;position: relative; left: 50%;"
          />
          <form id="search" class="form-inline">
            <i class="fasfa-search" aria-hidden="true"></i>
            <v-text-field
              class="form-control"
              type="text"
              append-icon="search"
              placeholder=" Go ahead!   Search Lesson Plans..."
              aria-label="Search"
            ></v-text-field>
          </form>
          <!--Blue select-->
          <v-flex align-center class="select-menus mb-5 title">
            <div class="error"></div>
            <select id="level" class="custom-select-md mt-4 mx-5">
              <option selected>
                <span>select Level</span>
              </option>
            </select>
            <select
              id="series"
              class="custom-select-md mt-4 mx-5"
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
          <v-data-table
              :headers="headers"
              :items="getLessonPlans"
              class="elevation-1"
            ></v-data-table> 
            <!-- <v-simple-table lg2>
              <thead >
                <tr>
                  <th><v-layout class="mx-2" justify-right>Series</v-layout></th>
                  <th><v-layout class="mx-2" justify-right>File</v-layout></th>
                  <th><v-layout class="mx-2" justify-right>Level</v-layout></th>
                  <th><v-layout class="mx-2" justify-right>Type</v-layout></th>
                  <th><v-layout class="mx-2" justify-right>Download</v-layout></th>
                  <th><v-layout class="mx-2" justify-right>Size</v-layout></th>
                  <th><v-layout class="mx-2" justify-right>Link</v-layout></th>
                  <th><v-layout class="mx-2" justify-right>Last Udated</v-layout></th>
                  <th><v-layout class="mx-2" justify-right>Owner</v-layout></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in getLessonPlans" :key="item.download">

                 <td ><v-layout class="mx-2" justify-right>{{ item.Name }}</v-layout> </td>
                 <td ><v-layout class="mx-2" justify-right>{{ item.parents }}</v-layout> </td>
                  <td><v-layout class="mx-2" justify-right>{{ item.level }}</v-layout> </td>
                  <td><v-layout class="mx-2" justify-right>{{ item.Type }}</v-layout> </td>
                  <td ><v-layout class="mx-2" justify-right><a :href="item.download">download</a></v-layout>  </td>
                  <td><v-layout class="mx-2" justify-right>{{ item.Size }}</v-layout> </td>
                  <td ><v-layout class="mx-2" justify-right><a :href="item.Link">Link</a></v-layout>  </td>
                  <td><v-layout class="mx-2" justify-right>{{ago(item["Last Updated"])}}</v-layout> </td>
                  <td><v-layout class="mx-2" justify-right>{{ item.Owner }}</v-layout> </td>
                </tr>
              </tbody>
            </v-simple-table> -->
            <!-- <table id="tblReportResultsDemographics" class="mx-auto">
              <thead>
                <tr class="mx-5 text-right">
                  <th >Series</th>
                  <th >File</th>
                  <th>Level</th>
                  <th >Type</th>
                  <th>Download</th>
                  <th >Size</th>
                  <th >Link</th>
                  <th >Last Udated</th>
                  <th >Owner</th>
                </tr>
              </thead>
              <tbody class="tBody mx-2"></tbody>
            </table>-->
      </main>
      <!-- #main -->
    </v-card>
    <!-- #primary -->
    <aside class="widget-area">
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
<style>
</style>
<script>
import $ from "jquery";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "site",
  data(){
    return{
headers: [
          { text: 'File', value: 'parents' },
          { text: 'Level', value: 'Level' },
          { text: 'Type', value: 'Type', },
          { text: 'Download', value: 'download' },
          { text: 'Size', value: 'Size' },
          { text: 'Link', value: 'Link' },
          { text: 'Last Udated', value: 'Last Udated' },
          { text: 'Owner', value: 'Owner' },
        ],
    }
  },
  computed: mapGetters(["getLessonPlans"]),
  methods: {
    ...mapActions(["fetchLessonPlans"]),
 ago(time){ return  moment(time,"YYYYMMDD").fromNow()},
    // table(lp) {
    //   $(document).ready(async function() {
    //     $("#tblReportResultsDemographics").hide();
    //     $("#search").hide();
    //     $("#level").hide();
    //     $("#series").hide();
    //     const jres = lp;
    //     let ready = false;
    //     ready = await interset(jres);
    //     if (ready) {
    //       $("#loading").fadeOut();
    //       $("#tblReportResultsDemographics").fadeIn();
    //       $("#search").fadeIn();
    //       $("#level").fadeIn();
    //       $("#series").fadeIn();
    //     }
    //   });

    //   const interset = async function(jres) {
    //     const table = document.querySelector("#tblReportResultsDemographics");
    //     await jres.forEach(async function(datarow) {
    //       const newRow = await document.createElement("tr");
    //       const Rowdiv = await document.createElement("div");
    //       newRow.setAttribute("class", "rows-employees mx-3 ");
    //       newRow.setAttribute("scope", "row");
    //       for (const property in datarow) {
    //         if (
    //           datarow.hasOwnProperty(property) &&
    //           property.toLocaleLowerCase() !== "created at"
    //         ) {
    //           let cell = await document.createElement("td");
    //           if (property === "download") {
    //             const p = await document.createElement("p");
    //             p.textContent = "download";
    //             const alink = await document.createElement("a");
    //             await alink.setAttribute("href", datarow[property]);
    //             alink.appendChild(p);
    //             cell.appendChild(alink);
    //           } else if (property === "Link") {
    //             const p = await document.createElement("p");
    //             p.textContent = "Link";
    //             const alink = await document.createElement("a");
    //             await alink.setAttribute("href", datarow[property]);
    //             alink.setAttribute("target", "blank");
    //             alink.appendChild(p);
    //             cell.appendChild(alink);
    //           } else if (property === "Last Updated") {
    //             cell.textContent = moment(
    //               datarow[property],
    //               "YYYYMMDD"
    //             ).fromNow();
    //           } else {
    //             cell.textContent = datarow[property];
    //           }
    //           cell.setAttribute("class","mx-5");
    //           cell.setAttribute(
    //             "style",
    //             ""
    //           );

    //           newRow.appendChild(cell);
    //           Rowdiv.setAttribute("class", "flex-lg-wrap");
    //           Rowdiv.appendChild(newRow);
    //         }

    //         if (property === "level") {
    //           const option = await document.createElement("option");
    //           const series = document.querySelector("#level");
    //           option.textContent = datarow[property];

    //           if (!series.textContent.includes(option.textContent)) {
    //             series.appendChild(option);
    //           }
    //         }
    //       }
    //       table.appendChild(newRow);
    //     });
    //     return true;
    //   };
    // },
    search: function() {
      $(document).ready(async function() {
        $(".form-control").keyup(function() {
          const value = $(this)
            .val()
            .toLowerCase();
          $(".rows-employees").filter(function() {
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
    // this.table(this.getLessonPlans);
    this.search();
    this.selectMenu();
  }
};
</script>

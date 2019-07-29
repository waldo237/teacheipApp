<template>
  <div id="page" class="site">
    <div id="content" class="site-content" style="display: inline-block;   width: 90%;">
      <div id="primary" class="content-area">
        <main id="main" class="site-main">
          <div class="entry-content">
            <h1 class="display-2" style="text-align:center; margin-left: 15%;">Lesson plan repository</h1>
            <!-- search engine -->
            <form
              id="search"
              class="form-inline md-form form-sm active-cyan active-cyan-2 mt-2"
              style="margin:1%;font-size: 200%; width: 120%;"
            >
              <i class="fas fa-search" aria-hidden="true"></i>
              <input
                class="form-control form-control-sm w-100"
                type="text"
                placeholder=" Go ahead!   Search Lesson Plans..."
                aria-label="Search"
                style="padding: 3%; font-size: 50%"
              />
            </form>
            <!--Blue select-->
            <div
              class="select-menus"
              style="display: inline-block;   width: 100%; justify-content: center"
            >
              <div class="error"></div>
              <select
                id="level"
                class="custom-select-md mt-2"
                style="float:left; margin:1%; margin-right:10px; font-size: 100%; width: 40%; border-radius: 5%; font-family: inherit;"
              >
                <option selected>select Level</option>
              </select>
              <select
                id="series"
                class="custom-select-md mt-2"
                style="float:left; margin:1%;font-size: 100%; width: 40%; border-radius: 5%; font-family: inherit;"
                data-toggle="tooltip"
                data-html="true"
                title="Please select all fields"
              >
                <option selected>select series</option>
                <option>Interchange</option>
                <option>Double Click</option>
                <option>Passages</option>
              </select>
            </div>
            <!--/Blue select-->
            <img
              src="../assets/loading.gif"
              id="loading"
              alt="loading"
              style="height: 80px; width: 80px;position: relative; left: 50%;"
            />
            <!-- table-->
            <div
              class="container"
              style="font-size: 70%; width: 120%; box-shadow:0 8px 16px 0 rgba(0,0,0,0.281), 0 12px 30px 0 rgba(0,0,0,0.281);margin:10px;text-align:justify;line-height:1.3;"
            >
             <section>
								<div id="display" class="table-responsive-xl">
									<table id="tblReportResultsDemographics" class="table table-striped"
										cellspacing="2" >
                      
											<thead>
												<tr  class="justify-content-xl-start" scope="row">
													<th class="" scope="col">Series</th>
													<th class="" scope="col">File</th>
													<th class="" scope="col">Level</th>
													<th class="" scope="col">Type</th>
													<th class="" scope="col">Download</th>
													<th class="" scope="col">Size</th>
													<th class="" scope="col">Link</th>
													<th class="" scope="col">Last Udated</th>
													<th class="" scope="col">Owner</th>
												</tr>
											</thead>
										<tbody class="tBody"></tbody>
									</table>
								</div>
							</section>
            </div>
          </div>
        </main>
        <!-- #main -->
      </div>
    </div>
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
.custom-logo {
  height: 151px;
  max-height: 900px;
  max-width: 1200px;
  width: 186px;
}
</style>
<script>
import $ from 'jquery';
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "site",
 computed: mapGetters(['getLessonPlans']),
  methods: {
    ...mapActions(['fetchLessonPlans']),
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
          newRow.setAttribute("class", "rows-employees");
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
              cell.setAttribute('class', 'align-content-xl-end');
              cell.setAttribute('style', 'word-wrap: break-word;max-width: 150px;');
                    
              newRow.appendChild(cell);
              Rowdiv.setAttribute('class', 'd-flex flex-wrap-reverse');
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
    selectMenu: function(){
      $(document).ready(async function(){
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
    this.table(this.getLessonPlans);
    this.search();
    this.selectMenu();
  }
};
</script>

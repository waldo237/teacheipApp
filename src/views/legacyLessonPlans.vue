
<script>
/**
 * todo
 * legacy code to analize how to toggle elements after data is loaded
 * 
 */
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
   
  },
  
};
</script>

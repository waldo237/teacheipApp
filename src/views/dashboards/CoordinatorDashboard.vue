<template>
<div class="grey lighten-3">
  <v-container class="mb-5 pb-5 grey lighten-3">
    <v-content class="mb-5 pb-5 ">
      <!-- TITLE STARTS -->
      <v-layout wrap justify-center class="pt-3">
        <div
          class="display-1 font-weight-light text-xs-center main-title my-1 py-1 mx-4 px-1"
        >Coordinator's dashboard</div>
      </v-layout>
      <!-- TITLE ENDS -->
      <!-- FIRST ROW STARTS-->
      <v-layout row wrap justify-space-around>
        <servicesScreen :services-for-supervisor="servicesForSupervisor" />
        <solicitudesScreen :allSolicitudes="allSolicitudes" />
        <Tasks class="mb-2"/>
      </v-layout>
      <v-layout row wrap justify-space-around class="mx-5 px-5" >
          <v-card max-width="1000px" flat  dark class="grey lighten-1 elevation-24">
           <memberCarousel />
            
          </v-card>
          
      </v-layout>
      <!-- FIRST ROW ENDS-->
    </v-content>
  </v-container>

</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import session from "@/store/modules/session.js";
import servicesScreen from "@/components/utilities/servicesScreen.vue";
import solicitudesScreen from "@/components/utilities/solicitudesScreen.vue";
import Tasks from "@/components/utilities/tasks.vue";
import memberCarousel from "@/components/utilities/memberCarousel.vue";

export default {
  name: "CoordinatorDashboard",
  components: {
    servicesScreen,
    solicitudesScreen,
    Tasks,
    memberCarousel
  },
  data: () => {
    return {
      alert: true,
      servicesForSupervisor: true,
      allSolicitudes: true,
      studentOptions: [
        { title: "Grades", icon: "grid_on", color: "blue" },
        { title: "Attendance", icon: "wb_iridescent", color: "orange" },
        { title: "Permissions", icon: "directions_run", color: "yellow" },
        { title: "Dropouts", icon: "person_add_disabled", color: "#c6192a" }
      ],
      generalOptions: [
        { title: "General Report", icon: "adjust", color: "white" },
        { title: "General statistics", icon: "trending_up", color: "yellow" },
        { title: "Inventory", icon: "assignment_turned_in", color: "green" },
        { title: "Calendar", icon: "event_note", color: "blue" },
        { title: "Attendance", icon: "grid_on", color: "orange" }
      ],
      teacherOptions: [
        { title: "Add teacher", icon: "account_circle", color: "green" },
        { title: "Assign fingerprint", icon: "fingerprint", color: "white" },
        { title: "Permissions", icon: "directions_run", color: "yellow" },
        { title: "Records", icon: "save", color: "#c6192a" },
        { title: "Class Observations", icon: "check_circle", color: "orange" },
        { title: "Survey Results", icon: "grid_on", color: "blue" }
      ]
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["solicitudes"])
  },
  beforeDestroy() {},
  async mounted() {
    await this.$store.commit("setCurrentRole", session.fetchRole());
    this.$store.commit("setLoggedIn", true);
  }
};
</script>

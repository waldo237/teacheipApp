<template>
  <v-layout class="my-5 px-2 py-5 grey lighten-2" wrap>
    <v-layout class="mx-2 px-1 justify-center" flat wrap>
      <!-- upcoming events starts -->
      <v-card
        class="justify-center mx-1 elevation-24 grids grey lighten-4"
        raised
        max-height="350px"
        max-width="400px"
        min-width="380px"
      >
        <v-card-title primary-title class="justify-center orangish py-1 white--text">
          <v-icon color="white" class="mr-2">alarm</v-icon>Publicar notificación para coordinadores y maestros
        </v-card-title>
        <v-card-text>
          <SendNotification />
        </v-card-text>
      </v-card>
      <!-- upcoming events ends -->
      <!-- intructions start -->
      <v-card
        class="justify-center mx-1 elevation-24 grids grey lighten-4"
        raised
        max-height="390"
        max-width="400px"
        min-width="380px"
      >
        <v-card-title
          primary-title
          class="instructions justify-center elevation-12 py-1 white--text"
        >
          <v-icon color="white" class="mx-2">sms</v-icon>Administrador de Tareas
        </v-card-title>

        <!-- date picker starts -->
        <v-layout row>
          <v-text-field
            class="mx-3 my-0"
            v-model="date"
            label="Hoy"
            prepend-icon="event"
            readonly
            disabled
          />

          <!-- date picker ends -->
          <!-- textfield with name starts -->
          <v-text-field
            :label="auth().currentUser.displayName"
            class="mx-3 my-0"
            prepend-icon="person"
            disabled
          />
        </v-layout>
        <!-- textfield with name ends -->
        <!-- textarea starts -->

        <v-layout row wrap align-center>
          <v-text-field
            class="mx-2 my-0"
            hint="Escribe tu itinerario"
            label="En que estas trabajando hoy?"
            v-model="taskInput"
            @keydown.enter="addTask"
          />
          <v-btn @click="addTask" prepend-icon="add" flat fab>
            <v-icon>add</v-icon>
          </v-btn>
        </v-layout>
        <!-- TASKS DISPLAY STARTS -->
        <v-layout row wrap v-if="tasks.length > 0">
          <v-card width="100%" max-height="135px" flat style="overflow:auto;" class="scrollbar">
            <v-layout column v-for="(task, i) in tasks" :key="i">
              <v-layout row wrap justify-start align-center class="ml-2 my-0 py-0">
                <span>{{i+1}}-</span>
                <!-- <div @click="$emit('checkbox', task)"> -->
                <v-checkbox
                  v-model="task.done"
                  color="green"
                  hide-details
                  class="shrink mr-0 mt-0 mb-0"
                  @change="editTask"
                ></v-checkbox>
                <!-- </div> -->
                <v-tooltip  left>
                  <template v-slot:activator="{ on }">
                    
               <span v-on="on">{{task.message}}</span> 
                  </template>
                  <span> creado el {{moment(task.date)}} </span>
                </v-tooltip>
                <v-btn @click="removeTask(task)" flat small fab class="ma-0 pa-0">
                  <v-icon small color="red">delete</v-icon>
                </v-btn>
              </v-layout>
            </v-layout>
          </v-card>
        </v-layout>
        <!-- TASKS DISPLAY ENDS -->
        <!-- Submit button starts -->
        <v-layout column justify-center>
          <v-switch class="my-0 py-0 mx-2" v-model="private" color="green" label="Privado"></v-switch>
          <v-btn
            round
            @click="saveTasks"
            small
            class="mx-auto instructions white--text elevation-24"
          >Guardar</v-btn>
          <!-- Submit button ends -->
        </v-layout>
        <!-- textarea ends -->
      </v-card>
      <!-- intructions end -->

      <!--******** services starts ********-->
      <servicesScreen :services-for-supervisor="servicesForSupervisor" />
      <!--******** services ends ********-->

      <v-layout row wrap justify-space-around class="mx-5 px-2 mb-5 pb-5" align-end>
        <!-- centers starts -->
        <v-card
          class="justify-center mx-1 elevation-24 grids"
          raised
          max-height="350px"
          max-width="240px"
          min-width="240px"
        >
          <v-card-title
            primary-title
            class="justify-center centers darken-4 elevation-12 py-1 white--text"
          >
            <v-icon color="white" class="mr-2 white--text">location_city</v-icon>Mis centros
          </v-card-title>

          <v-card
            flat
            max-height="340px"
            class="mb-2 grey lighten-4 scrollbar"
            style="overflow:auto;"
          >
            <v-layout column v-for="(item, index) in centers" :key="item.uuid">
              <v-card flat class="text-truncate" style="max-width:190px">
                <router-link
                  tag="v-btn"
                  class="px-2 py-0 ma-0 caption"
                  flat
                  :to="'/center/'+ item.uuid"
                >{{ index+1 }} - {{ item.centro }}</router-link>
              </v-card>
            </v-layout>
          </v-card>
        </v-card>
        <!-- centers ends -->
        <v-card flat max-width="800px " class="carouselContainer grey lighten-2">
          <memberCarousel class="mb-5" />
        </v-card>
      </v-layout>
    </v-layout>
  </v-layout>
  <!-- </div> -->
</template>

<script>
import moment from 'moment'
import { mapGetters, mapActions, mapMutation } from "vuex";
import { directive as onClickaway } from "vue-clickaway";
import SendNotification from "@/components/utilities/SendNotification.vue";
import memberCarousel from "@/components/utilities/memberCarousel.vue";
import servicesScreen from "@/components/utilities/servicesScreen.vue";
import _ from "lodash";
export default {
  name: "SupervisorDashboard",
  components: { SendNotification, servicesScreen, memberCarousel },
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      servicesForSupervisor: true,
      centers: [],
      tasks: [],
      taskInput: "",
      private: true,
      targetTask: {}
    };
  },
  methods: {
    ...mapActions(["fetchCenters"]),
    addTask() {
      if (this.taskInput)
        this.tasks.push({
          message: this.taskInput,
          done: false,
          date: new Date()
        });
      this.taskInput = "";
      this.saveTasks();
    },
    async removeTask(task) {
      const index = this.tasks.findIndex(s => s == task);
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    async editTask(e) {
      //   const index = await this.tasks.findIndex(s => s == this.targetTask);
      //   this.targetTask.done = await e;
      //  this.tasks[index] = this.targetTask;
      this.saveTasks();
    },
    moment(date){
      return moment(date).locale('es').format(" D MMMM YYYY, hh:mma")
    }
  },
  computed: {
    ...mapGetters([
      "auth",
      "checkIsLoggedIn",
      "getSupervisorSideMenu",
      "superCenters"
    ])
  },
  async created() {
    // this.$on('checkbox', (target)=>{
    //   this.targetTask = target;
    // })
    if (localStorage.getItem("tasks")) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    await this.fetchCenters();
    this.centers = await _.uniqBy(this.superCenters, "centro");
  }
};
</script>
<style>
.scrollbar::-webkit-scrollbar {
  width: 0.7em;
}

.scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #717981;
  border-radius: 25px;
}
.centers {
  background: linear-gradient(
    0deg,
    rgba(2, 2, 32, 1) 33%,
    rgba(88, 17, 254, 1) 100%
  );
}
.instructions {
  background: rgb(79, 177, 83) !important;
  background: linear-gradient(
    0deg,
    rgb(27, 117, 30) 42%,
    rgba(59, 200, 4, 0.904) 100%,
    rgb(28, 28, 218) 100%
  ) !important;
}
.orangish {
  background: linear-gradient(
    0deg,
    rgba(5, 69, 70, 1) 34%,
    rgba(13, 218, 57, 0.815) 100%
  ) !important;
}
.grids {
  border-radius: 5px !important;
}
.wrapper-div {
  border-radius: 5px !important;
}
.main-card {
  border-radius: 5px !important;
}
@media screen and (max-width: 960px) {
  .carouselContainer {
    max-width: 500px !important;
  }
  .grids {
    margin-top: 5% !important;
  }
  .wrapper {
    margin: 0% !important;
    min-width: 520px !important;
    margin-top: 5% !important;
  }
  .wrapper-div {
    padding: 0% !important;
    margin-top: 5% !important;
  }
}
@import url("https://fonts.googleapis.com/css?family=Lexend+Exa|Oswald&display=swap");
.title {
  font-family: "Oswald", sans-serif !important;
  font-weight: lighter !important;
}
</style>

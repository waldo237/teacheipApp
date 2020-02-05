<template>
  <v-content class="mb-5">
    <v-card
      fluid
      dark
      color="grey lighten-2"
    >
      <!-- <v-navigation-drawer
      v-model="primaryDrawer.model"
      app
    ></v-navigation-drawer> -->
      <v-layout
        wrap
        justify-center
      >
        <div
          class="display-1 font-weight-light  text-xs-center main-title my-2 py-1 mx-4 px-1 "
        >
          Teacher's dashboard
        </div>
      </v-layout>
      <!-- FIRST ROW STARTS -->
      <v-layout
        row
        wrap
        justify-center
        class="mb-4"
      >
        <!-- CALENDAR STARTS -->
        <v-card
          min-width="400px"
          max-width="600px"
          class="mx-2 mt-3 mb-5"
          height="300px"
        >
          <v-card-title primary-title>
            <v-layout
              row
              wrap
              justify-center
            >
              Calendario Academico
            </v-layout>
          </v-card-title>
          <v-sheet
            tile
            height="54"
            color="grey "
            class="d-flex"
            light
          >
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.prev()"
            >
              <v-icon>arrow_back_ios</v-icon>
            </v-btn>
            <v-select
              v-model="type"
              :items="types"
              dense
              outlined
              hide-details
              class="ma-2"
              label="type"
            />
            <v-select
              v-model="mode"
              :items="modes"
              dense
              outlined
              hide-details
              label="event-overlap-mode"
              class="ma-2"
            />
            <v-select
              v-model="weekday"
              :items="weekdays"
              dense
              outlined
              hide-details
              label="weekdays"
              class="ma-2"
            />
            <v-spacer />
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.next()"
            >
              <v-icon>arrow_forward_ios</v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet light>
            <v-calendar
              ref="calendar"
              v-model="value1"
              :weekdays="weekday"
              :type="type"
              :events="events"
              :event-overlap-mode="mode"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @change="getEvents"
            />
          </v-sheet>
        </v-card>

        <!-- CALENDAR ENDS -->
        <!-- SERVICES AND RESOURCES STARTS  -->
        <v-card
         
          class="mt-3 mb-5"
        >
          <v-card-title
            class=""
          >
            Recursos y Materiales
          </v-card-title>
          <v-card
            class="scrollbar overflow "
            height="300px"
            max-width="300px"
          >
            <v-card-text
              v-for="(item, i) in servicios"
              :key="i"
              class="py-0 px-2 "
            >
              <v-btn
                small
                dark
                outline
                round
                :href="item.link"
                class=" my-1"
                v-if="item.class"
              >
                {{
                  item.title
                }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-card>
        <!-- SERVICES AND RESOURCES ENDS  -->
      </v-layout>
      <!-- FIRST ROW ENDS -->
      <v-layout
        row
        wrap
        justify-center
        class=" mb-5 mx-5"
      >
        <!-- attendance start -->
        <v-card
          class=" mt-0 mb-5"
          min-width="360px"
          v-for="(item, i) in reports"
          :key="i"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            :color="item.background"
            elevation="12"
            max-width="calc(100% - 25px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              :color="item.color"
              line-width="2"
              padding="12"
            />
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2 ">
              {{ item.tittle }}
            </div>
            <div class="subheading font-weight-light grey--text">
              {{ item.body }}
            </div>
            <v-divider class="my-2" />
            <v-icon
              class="mr-2"
              small
            >
              {{ item.icon }}
            </v-icon>
            <span
              class="caption grey--text font-weight-light"
            >last registration 26 minutes ago</span>
          </v-card-text>
          <v-layout
            row
            wrap
            justify-center
          >
            <v-btn
              color="success"
              block
              @click="dataTable =!dataTable"
            >
              Pasar la lista
            </v-btn>     
            <v-data-table
              style="width: 98%"
              :headers="headers"
              :items="attendance"
              :must-sort="true"
              class="elevation-24"
              light
              dense
              mobile-breakpoint
              v-if="dataTable"
              :items-per-page="40"
            >
              <template v-slot:items="props">
                <td
                  class="text-center mx-1 text-uppercase"
                  id="name"
                  min-width="150px"
                >
                  {{props.index+1}}-{{ props.item.name }}
                </td>
            
                <td class="text-center mx-1 text-uppercase  font-weight-bold ">
                  <span
                    contenteditable="contenteditable"
                    class="py-2 px-5 sheet"
                  >{{ props.item.today }}</span> 
                </td>
                <td
                  class="text-center mx-1 text-uppercase"
                  contenteditable="contenteditable"
                />
              </template>
            </v-data-table>
          </v-layout>
        </v-card>
        <!-- attendance ends -->
      </v-layout>
    </v-card>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  data: () => ({
    dataTable: false,
    primaryDrawer: {
      model: false
    },
    reports: [
      {
        title: "Reporte de promedio",
        background: "orange",
        color: "black",
        body: "Ultimos 5 dias de clase",
        icon: "calendar_today"
      }
    ],
    labels: [moment(new Date()).subtract(5,'days').format("MMM D"),
     moment(new Date()).subtract(4,'days').format("MMM D"),
     moment(new Date()).subtract(3,'days').format("MMM D"),
     moment(new Date()).subtract(2,'days').format("MMM D"),
     moment(new Date()).subtract(1,'days').format("MMM D"),
     ],
    value: [10, 10, 8, 9, 5],
    type: "month",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [1, 2, 3, 4, 5],
    weekdays: [{ text: "Mon - Fri", value: [1, 2, 3, 4, 5] }],
    value1: "",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party"
    ],
    attendance: [
        {name:  "Marilenny steffany	Nuñez Santana", today:'p' },
        {name:  "Noel antonio 	PERALTA GOMEZ", today:'a' },
        {name:  "jennifer esther	duran duran", today:'p' },
        {name:  "Lucibel 	Madera Gomez", today:'p' },
        {name:  "ANGEL MIGUEL 	ALVARADO MOTA", today:'p' },
        {name:  "ESMERALDA	GERMAN RIVERA", today:'p' },
        {name:  "Lucibel 	Madera Gomez", today:'p' },
        {name:  "Nayeli massiel 	Torres", today:'p' },
        {name:  "SAUL	DEL ORBE DIAZ", today:'p' },
        {name:  "Jose Miguel	Reyes", today:'p' },
        {name:  "FRABEL	ALBERTO MARTINEZ", today:'p' },
        {name:  " NOLFANERYS	GONZALEZ  ANTIGUA", today:'p' },
        {name:  "Juan Gabriel 	Lugo osorio", today:'a' },
        {name:  "OSIRIS	TEJADA SANTOS", today:'p' },
        {name:  "GASPAR ALEJANDRO	SANCHEZ ROSA", today:'p' },
  
    ],
     headers: [
        {
          text: "NOMBRE",
          align: "left",
          value: "name"
        },
        {
          text: moment(new Date()).format("MMM Do"),
          align: "left",
          value: "today"
        },
        {
          text: 'Comentario',
          align: "left",
          value: "today"
        },
        
        ]
  }),
  methods: {
    momenize(){return moment(new Date()).format("MMM Do")},
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  },
  computed: {
    ...mapGetters(["servicios"])
  }
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
.sheet {
  border: 0.5px dashed gray !important;
}
.overflow {
  overflow-y: scroll;
  overflow-x: hidden;
  text-overflow: clip;
}
</style>

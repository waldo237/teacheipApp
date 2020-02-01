<template>
  <v-app id="sandbox" dark>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      app
    ></v-navigation-drawer>

    <v-content class="my-5">
      <v-container fluid>
        <v-layout align-start justify-center wrap>
          <v-layout wrap>
            <!-- attendance start -->
            <v-card
              class=" mx-auto my-2"
              max-width="900px"
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
                ></v-sparkline>
              </v-sheet>

              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">
                  {{ item.tittle }}
                </div>
                <div class="subheading font-weight-light grey--text">
                  Ultimos 5 dias de clase
                </div>
                <v-divider class="my-2"></v-divider>
                <v-icon class="mr-2" small>
                  calendar_today
                </v-icon>
                <span class="caption grey--text font-weight-light"
                  >last registration 26 minutes ago</span
                >
              </v-card-text>
            </v-card>
            <!-- attendance ends -->
          </v-layout>
        </v-layout>

        <div>
          <v-sheet  tile height="54" color="grey " class="d-flex" light>
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
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
            ></v-select>
            <v-select
              v-model="mode"
              :items="modes"
              dense
              outlined
              hide-details
              label="event-overlap-mode"
              class="ma-2"
            ></v-select>
            <v-select
              v-model="weekday"
              :items="weekdays"
              dense
              outlined
              hide-details
              label="weekdays"
              class="ma-2"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
              <v-icon>arrow_forward_ios</v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet height="300" light class="mb-5 pb-5">
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
            ></v-calendar>
          </v-sheet>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    primaryDrawer: {
      model: false
    },
    reports: [
      {
        title: "Reporte de Asistencia semanal",
        background: "cyan",
        color: "white"
      },
      { title: "Reporte de promedio", background: "orange", color: "black" }
    ],
    labels: ["Mar5", "Mar6", "Mar7", "Mar8", "Mar9"],
    value: [200, 675, 410, 390, 310],
    type: "month",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] }
    ],
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
    ]
  }),
  methods: {
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
  }
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>

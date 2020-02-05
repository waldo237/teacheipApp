<template>
  <v-tab-item class="mx-3 pb-5">
    <v-card
      flat
      class="my-5 black round"
      dark
    >
      <v-layout
        row
        wrap
      >
        <!-- GENERAL BUTTON -->
        <a
          @click="
            generalMenu = true;
            studentMenu = false;
            teacherMenu = false;
          "
        >
          <v-card
            class="px-auto pt-2 mt-1 mx-3 actionButton rounding"
            width="80px"
            :dark="generalMenu ? true : false"
          >
            <img
              src="https://drive.google.com/uc?export=view&id=1YBfq0jnYRiyYePSmYpVGgNuf0LN-LEQW"
              lazy-src="https://drive.google.com/uc?export=view&id=1YBfq0jnYRiyYePSmYpVGgNuf0LN-LEQW"
              alt
              width="76px"
              height="68px"
              class="mx-1 mb-0"
            >
            <v-card-text class="px-auto py-0">General</v-card-text>
            <v-icon
              class="mx-4"
              color="#c6192a"
              v-if="generalMenu"
            >arrow_drop_down</v-icon>
          </v-card>
        </a>
        <!-- GENERAL BUTTON END -->

        <a
          @click="
            studentMenu = true;
            teacherMenu = false;
            generalMenu = false;
          "
        >
          <v-card
            class="px-auto pt-2 mt-1 mx-3 actionButton round"
            width="80px"
            :dark="studentMenu ? true : false"
          >
            <img
              lazy-src="https://drive.google.com/uc?export=view&id=1VvmPXB2mhGsbtcBhqBb4yG4m5lPoqo83"
              src="https://drive.google.com/uc?export=view&id=1VvmPXB2mhGsbtcBhqBb4yG4m5lPoqo83"
              alt
              class="mx-2 mb-0"
            >
            <v-card-text class="px-auto py-0">Student</v-card-text>
            <v-icon
              class="mx-4"
              color="#c6192a"
              v-if="studentMenu"
            >arrow_drop_down</v-icon>
          </v-card>
        </a>
        <!-- TEACHER BUTTON -->
        <a
          @click="
            teacherMenu = true;
            studentMenu = false;
            generalMenu = false;
          "
        >
          <v-card
            class="px-auto pt-2 mt-1 mx-3 actionButton round"
            width="80px"
            :dark="teacherMenu ? true : false"
          >
            <img
              lazy-src="https://drive.google.com/uc?export=view&id=1QQOpEQuXqOqwysFcLnR3QwET-Sbc8lSK"
              src="https://drive.google.com/uc?export=view&id=1QQOpEQuXqOqwysFcLnR3QwET-Sbc8lSK"
              alt
              width="78px"
              height="68px"
              class="mx-1 mb-0"
            >
            <v-card-text class="px-auto py-0">Teacher</v-card-text>
            <v-icon
              class="mx-4"
              color="#c6192a"
              v-if="teacherMenu"
            >arrow_drop_down</v-icon>
          </v-card>
        </a>
        <!-- TEACHER BUTTON -->
      </v-layout>
      <!-- ####### STUDENT OPTIONS #######-->

      <v-layout
        class="black round py-0 slidingMenu"
        wrap
        v-if="studentMenu"
      >
        <v-card
          dark
          class="black pa-0 pa-0 round"
          v-for="(item, i) in studentOptions"
          :key="i"
        >
          <v-btn
            round
            class="mx-0 my-0"
            dense
            block
          >
            <v-icon :color="item.color">
              {{ item.icon }}
            </v-icon>
            {{ item.title }}
          </v-btn>
        </v-card>
      </v-layout>

      <!-- ####### STUDENT OPTIONS END #######-->

      <!-- ####### TEACHER OPTIONS #######-->

      <v-layout
        class="black py-0 slidingMenu round"
        wrap
        v-if="teacherMenu"
      >
        <v-card
          dark
          class=" black pa-0 pa-0 round"
          v-for="(item, i) in teacherOptions"
          :key="i"
        >
          <v-btn
            round
            class="mx-0 my-0 "
            dense
            block
          >
            <v-icon :color="item.color">
              {{ item.icon }}
            </v-icon>
            {{ item.title }}
          </v-btn>
        </v-card>
      </v-layout>

      <!-- ####### TEACHER OPTIONS END #######-->
      <!-- ####### GENERAL OPTIONS #######-->

      <v-layout
        dark
        class="black round py-0 slidingMenu"
        wrap
        v-if="generalMenu"
      >
        <v-card
          dark
          flat
          class="black pa-0 pa-0 round ma-0 "
          v-for="(item, i) in generalOptions"
          :key="i"
        >
          <v-btn
            round
            class="elevation-20 my-0"
            block
          >
            <v-icon :color="item.color">
              {{ item.icon }}
            </v-icon>
            {{ item.title }}
          </v-btn>
        </v-card>
      </v-layout>

      <!-- ####### GENERAL OPTIONS END #######-->
      <!-- ####### GRID #######-->

      <!-- ####### GRID END #######-->
      <v-card-text />
    </v-card>
  </v-tab-item>
</template>
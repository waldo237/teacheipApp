<template>
  <v-stepper
    v-model="e6"
    vertical
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
      color="green"
    >
      Introduce your cedula
      <small>Please type in your cedula number in the filed</small>
    </v-stepper-step>
    <v-stepper-content
      step="1"
      color="blue"
    >
      <!-- form starts -->
      <v-form
        v-model="valid"
        @submit.prevent
      >
        <v-alert
          outline
          rounded
          class="round jump"
          color="#c6192a"
          type="error"
          v-model="alert"
        >
          We are really sorry. This part of the website is currently under construction.
          Please visit us later or consult the administrator for solutions.
        </v-alert>
        <v-card
          color="grey lighten-2"
          class="mb-12"
          height="100px"
        >
          <v-container>
            <v-layout>
              <v-flex
                xs12
                md4
              >
                <v-text-field
                  v-model="cedula"
                  :rules="cedulaRules"
                  :counter="13"
                  label="ID (cedula)"
                  required
                  maxlength="13"
                  type="text"
                  @keydown="prevent"
                  @keyup="addDash"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card> 
        <v-btn
          class="sign-in"
          :disabled="checkID"
          @click="verify"
        >
          verify
        </v-btn>
        <v-btn
          class="sign-up"
          @click="close"
          text
        >
          Cancel
        </v-btn>
      </v-form>
    <!-- form ends -->
    </v-stepper-content>
  </v-stepper>
</template>

<script>

export default {
  data() {
    return {
      valid: false,
      cedulaRules: [],
      cedula: "",
      checkID: false,
      e6: 1,
      alert: true
    };
  },
  methods: {
  close() {
      this.$emit("close-student");
    },
    addDash() {
      this.cedula = this.cedula.replace(
        /(\d{3})\-?(\d{7})\-?(\d{1})/,
        "$1-$2-$3"
      );
      this.isCorrect();
    },
    prevent() {
      const e = event || window.event;
      const key = e.keyCode || e.which;
      if (key < 48 || key > 57) {
        if (key != 8) {
          if (e.preventDefault) e.preventDefault();
          e.returnValue = false;
        }
      }
    },
    verify() {},
    isCorrect() {
      this.checkID = (!this.cedula.match(/^((\d{3})\-?(\d{7})\-?(\d{1}))$/)) ? true: false;
    }
  },
  created() {
    this.checkID = true;
  }
};
</script>
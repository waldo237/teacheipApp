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
      <v-form @submit.prevent>
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
          round
          class="sign-up"
          @click="close"
          text
        >
          Cancelar
        </v-btn>
        <v-btn
          round
          class="sign-in"
          :disabled="checkID"
          @click.prevent="verifyID"
        >
          verificar
        </v-btn>
      </v-form>
      <!-- form ends -->
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
      color="green"
    >
      Type in your Employee credentials
    </v-stepper-step>
    <v-stepper-content step="2">
      <!-- form starts -->
      <v-form @submit.prevent>
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
                  name="employeeId"
                  id="employeeId"
                  autocomplete
                  prepend-icon="lock"
                  :append-icon="!showPassword ? 'visibility_off':'visibility'"
                  :type="showPassword ? 'text': 'password'"
                  @click:append="showPassword =!showPassword"
                  v-model="employeeCode"
                  label="Employee code"
                  required
                  maxlength="8"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-btn
          round
          class="sign-up"
          @click="close"
          text
        >
          Cancelar
        </v-btn>
        <v-btn
          round
          class="sign-in"
          @click="verifyECode"
        >
          Continuar
        </v-btn>
      </v-form>
      <!-- form ends -->
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
      color="green"
    >
      Type in your department credentials
    </v-stepper-step>
    <v-stepper-content step="3">
      <!-- form starts -->
      <v-form @submit.prevent>
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
                  prepend-icon="lock"
                  autocomplete
                  :append-icon="!showPassword2 ? 'visibility_off':'visibility'"
                  :type="showPassword2 ? 'text': 'password'"
                  @click:append="showPassword2 =!showPassword2"
                  v-model="departmentCode"
                  label="Department code"
                  required
                  maxlength="8"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-btn
          round
          class="sign-up"
          @click="close"
          text
        >
          Cancelar
        </v-btn>
        <v-btn
          round
          class="sign-in"
          @click="verifyDCode"
        >
          Continuar
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
      cedulaRules: [],
      cedula: "",
      employeeCode: "",
      departmentCode: "",
      e6: 1,
      showPassword: false,
      showPassword2: false,
      loading: false,
      alert: true,
    };
  },
  methods: {
    close() {
      this.$emit("close-manager");
    },
    verifyID() {
      // TODO Verification process of cedula
      this.e6++;
    },
    verifyECode() {
      // TODO Verification process of cedula
      this.e6++;
    },
    verifyDCode() {
      // TODO Verification process of cedula
      this.e6++;
    },
    verifycCode() {
      // TODO verification process of cCode
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
    isCorrect() {
      this.checkID = !this.cedula.match(/^((\d{3})\-?(\d{7})\-?(\d{1}))$/)
        ? true
        : false;
    }
  },
  created() {
    this.checkID = true;
  }
};
</script>
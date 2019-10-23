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
      <v-form v-model="valid">
        <v-alert
          outline
          rounded
          class="round jump"
          color="red"
          type="error"
          v-if="errorMessage"
          v-model="alert"
        >
          {{ errorMessage }}
        </v-alert>
        <v-card
          color="grey lighten-2"
          class="mb-12"
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
          :loading="loading1"
          @click.prevent="verifyID"
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

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
      color="green"
    >
      Type in your Coordinator code
    </v-stepper-step>
    <v-stepper-content step="2">
      <!-- form starts -->
      <v-form v-model="valid">
        <v-alert
          outline
          rounded
          class="round jump"
          color="red"
          type="error"
          v-if="errorMessage"
          v-model="alert2"
        >
          {{ errorMessage }}
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
                  v-model="cCode"
                  label="Coordinator code"
                  autocomplete
                  required
                  maxlength="15"
                  prepend-icon="lock"
                  :append-icon="!showPassword ? 'visibility_off':'visibility'"
                  :type="showPassword ? 'text': 'password'"
                  @click:append="showPassword =!showPassword"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-btn
          class="sign-in"
          @click="verifycCode"
          :loading="loading1"
        >
          Continue
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      valid: false,
      cedulaRules: [],
      cedula: "",
      cCode: "",
      alert: true,
      loading1: false,
      alert2: true,
      errorMessage: "",
      showPassword: false,
      e6: 1
    };
  },
  methods: {
    close() {
      this.$emit("close-coordinator");
    },
    async verifyID() {
      if (this.errorMessage) this.errorMessage = "";
      this.loading1 = true;
      await this.$store.commit("setId", this.cedula);
      await this.checkValidation();
      if (this.validation.id) {
        this.loading1 = false;
        this.e6 = 2;
        this.errorMessage = "";
      } else {
        this.loading1 = false;
        this.errorMessage = this.validation.error
          ? (this.errorMessage = this.validation.error)
          : "There was a problem validating your id, try again or contact the administrator.";
      }
    },
    async verifycCode() {
      this.loading1 = true;
      await this.$store.commit("setCode", this.cCode);
      await this.checkValidation();
      if (this.validation.code) {
        this.signIn();
      } else {
        this.loading1 = false;
        this.errorMessage = this.validation.error
          ? (this.errorMessage = this.validation.error)
          : "There was a problem validating your Code, try again or contact the administrator.";
      }
    },
    async signIn() {
      try {
        await this.requestToken();
        await this.validateToken();
        if(this.validated.authenticated){
          this.loading1 = false;
          await this.$store.commit("setLanding", false);
          await this.$router.push(`/coordinatorDashboard/`);
        }
        
      } catch (error) {
                this.errorMessage = error;
      }
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
    },
    ...mapActions(["requestToken", "getToken", "checkValidation", "validateToken"])
  },
  computed: { ...mapGetters(["validation","validated"]) },
  created() {
    this.checkID = true;
  }
};
</script>
<style  scoped>
.jump {
  animation-duration: 1.5s;
  animation-name: shake;
  animation-timing-function: ease-in-out;
}
</style>
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
      Cedula de Identidad
      <small>Por favor escriba su número de cedula de identidad en este campo</small>
    </v-stepper-step>
    <v-stepper-content
      step="1"
      color="blue"
    >
      <!-- form starts -->
      <v-form>
        <v-alert
          outline
          rounded
          class="round jump"
          color="#c6192a"
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
                  @keydown.enter="verifyID"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-btn
          class="sign-in"
          :disabled="checkID"
          :loading="loading1"
          @click="verifyID"
        >
          Verificar
        </v-btn>
        <v-btn
          class="sign-up"
          @click="close"
          text
        >
          Cancelar
        </v-btn>
      </v-form>
      <!-- form ends -->
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
      color="green"
    >
      Supervisor code
    </v-stepper-step>
    <v-stepper-content step="2">
      <!-- form starts -->
      <v-card>
        <v-alert
          outline
          rounded
          class="round jump"
          color="#c6192a"
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
                <v-form @submit.prevent>
                  <v-text-field
                    v-model="cCode"
                    label="Codigo de supervisor"
                    required
                    autocomplete
                    maxlength="25"
                    prepend-icon="lock"
                    :append-icon="!showPassword ? 'visibility_off':'visibility'"
                    :type="showPassword ? 'text': 'password'"
                    @click:append="showPassword =!showPassword"
                    @keydown.enter="verifycCode"
                  />
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-spacer />
        <v-btn
          class="sign-in"
          @click="verifycCode"
         
          :loading="loading1"
        >
          Continuar
        </v-btn>
        <v-btn
          class="sign-up"
          @click="close"
          text
        >
          Cancelar
        </v-btn>
      </v-card>
      <!-- form ends -->
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
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
      this.$emit("close-supervisor");
    },
    async verifyID() {
      if (this.errorMessage) this.errorMessage = "";
      this.loading1 = true;
      await this.$store.commit("setId", this.cedula);
      await this.fetchSuperId();
      this.registerUser(); //register users in the mainServer when they validate id
      if (this.superId.cedulaAuth) {
        this.loading1 = false;
        this.e6 = 2;
        this.errorMessage = "";
      } else {
        this.loading1 = false;
        
        this.errorMessage =( this.superId.message)
          ? this.superId.message
          : "Hay un problema validando su cedula. Inténtelo nuevamente o contacte al administrador.";
      }
    },
    async verifycCode() {
      try {
        this.loading1 = true;
         await this.$store.commit("setCode", this.cCode);
        await this.authenticateSuper();
        let role = await atob(localStorage.getItem('sessionRole'))
        if (role == 'supervisor') {
           this.loading1 = false;
            await this.$store.commit("setLanding", false);
            await this.$router.push(`/supervisorDashboard`);
            this.$emit('drawerRefresh');
        } else {
          this.loading1 = false;
          // await this.$router.push('/landing');
        }
        
      } catch (error) {
        console.log(error)
      }
    },
  
  prevent(event) {
      const char = String.fromCharCode(event.keyCode);
      if (
        !/[0-9]/.test(char) &&
        event.keyCode != Number.parseInt("08") &&
        event.keyCode != Number.parseInt("09") &&
        event.keyCode != Number.parseInt("39") &&
        event.keyCode != Number.parseInt("37")
      ) {
        event.preventDefault();
      }
    },
     formatCedula() {
      let s = this.cedula;
      var s2 = ("" + s).replace(/\D/g, "");
      var m = s2.match(/^(\d{3})(\d{7})(\d{1})$/);
      if (m) this.cedula = m[1] + "-" + m[2] + "-" + m[3];  
      this.checkID = !m;
    },
    ...mapActions([  "fetchSuperId", "authenticateSuper", "registerUser"])
  },
  watch:{
  cedula() {
      this.formatCedula();
    },
  },
  computed: { ...mapGetters([ 'superId']) },
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
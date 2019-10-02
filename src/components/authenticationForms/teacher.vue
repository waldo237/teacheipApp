<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1" color="green">
      Introduce your cedula
      <small>Please type in your cedula number in the filed</small>
    </v-stepper-step>
    <v-stepper-content step="1" color="blue">
        <!-- form starts -->
        <v-form v-model="valid">
      <v-card color="grey lighten-2" class="mb-12" height="100px">
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="cedula"
                  :rules="cedulaRules"
                  :counter="13"
                  label="ID (cedula)"
                  required
                  maxlength="13"
               
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
      </v-card> 
      <v-btn class="sign-in" @click="e6 = 2">Continue</v-btn>
      <v-btn class="sign-up" @click="close" text>Cancel</v-btn>
        </v-form>
        <!-- form ends -->
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2" color="green">Type in your C-secret code</v-stepper-step>

    <v-stepper-content step="2">
      <!-- form starts -->
        <v-form v-model="valid">
      <v-card color="grey lighten-2" class="mb-12" height="100px">
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="cCode"
                  label="C-secret code"
                  required
                  maxlength="8"
            
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
      </v-card> 
      <v-btn class="sign-in" @click="">Continue</v-btn>
      <v-btn class="sign-up" @click="close" text>Cancel</v-btn>
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
      cCode: "",
      e6: 1
    };
  },
  methods: {
    close() {
      this.$emit("close-teacher");
    },

  }
};
</script>
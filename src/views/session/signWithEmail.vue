<template>
  <v-card
    class="m-1 p-2"
    flat
  >
    <v-layout align-content-start>
      <v-toolbar
        class="sign-in elevation-10"
        dense
      >
        <span class="title font-95">
          <v-icon class="mr-3">new_releases</v-icon>Iniciar sesión con correo electronico
        </span>
      </v-toolbar>
    </v-layout>
    <v-card-text>
      <v-form>
        <v-layout
          justify-center
          class="font-95 text-center text-uppercase font-weight-bold pa-1 grey--text"
        >
          Entrar con correo electronico
        </v-layout>

        <v-text-field
          autocomplete
          prepend-icon="email"
          v-model="email"
          :counter="28"
          maxlength="28"
          label="E-mail"
          data-vv-name="email"
          required
          type="email"
        />

        <v-text-field
          autocomplete
          prepend-icon="lock"
          :append-icon="!showPassword ? 'visibility_off':'visibility'"
          name="password"
          label="Password"
          id="passwordin"
          :type="showPassword ? 'text': 'password'"
          v-model="password"
          @click:append="showPassword =!showPassword"
        />
        <!-- <v-label for="password">
            <a href="#" class="float-right">Forgot Password?</a>
        </v-label>-->
        <v-card-actions>
          <v-spacer />
          <v-btn
            small
            round
            class="sign-up elevation-20"
            @click="$emit('closeDialog')"
          >
            cerrar
          </v-btn>
          <v-btn
            small
            round
            class="sign-in elevation-20"
            @click="signIn"
            :loading="loading"
          >
            Iniciar sesión
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<style scoped>
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      signWithEmail: false
    };
  },
  methods: {
    ...mapActions(["runAlert", "setAlertMessage", "setAlert", "validateToken"]),
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    async signIn(e) {
      this.loading = await true;
      this.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          async () => {
      
              this.$emit("closeDialog");
              this.$store.commit("setLoadingFull", false);
             await this.$store.dispatch('registerUser');
              await this.$store.commit("setLanding", true);
              await this.$router.push(`/landing/`);
          },
          async err => {
            this.loading = await false;
            this.showAlert(err.message, "warning", "warning orange");
          }
        );
    }
  },
  computed: mapGetters(["auth", "getCurrentRole"]),
  created() {
    this.$root.$on("signWithEmail", () => {
      this.signWithEmail = true;
    });
  }
};
</script>
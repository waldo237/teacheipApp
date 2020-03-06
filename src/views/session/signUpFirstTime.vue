<template>
  <v-layout column>
    <v-toolbar class="sign-up elevation-10" dense>
      <span class="title">
        <v-icon class="mr-3">new_releases</v-icon>Iniciar sesión por primera vez
      </span>
    </v-toolbar>
    <v-card class="pa-3" flat>
      <v-text-field
        prepend-icon="person"
        v-model="name"
        :counter="30"
        maxlength="30"
        label="Nombre y Apellido"
        data-vv-name="name"
        required
        type="text"
      ></v-text-field>

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
      ></v-text-field>

      <v-text-field
        autocomplete
        maxlength="50"
        prepend-icon="lock"
        name="contraseña "
        label="contraseña"
        id="password"
        required
        passEError
        v-model="password"
        hint="Your password should be at least 6 characters"
        :type="showPassword ? 'text': 'password' "
        :append-icon="showPassword ? 'visibility': 'visibility_off'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-layout row wrap class="policy">
        <!-- buttons box starts -->
        <v-card-actions class="ml-5">
          <v-flex xl12 xs12>
            <v-btn
              class="sign-up elevation-12 mx-2"
              small
              round
              @click="$emit('closeDialog')"
            >cerrar</v-btn>
            <v-btn
              class="sign-in elevation-12 mx-3"
              small
              round
              @click="submit"
              :loading="loading"
            >Iniciar sesión</v-btn>
          </v-flex>
        </v-card-actions>
        <!-- buttons box ends -->
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
export default {
  data: () => ({
    positions: [
      { text: "Teacher", value: "teacher" },
      { text: "Coordinator", value: "coordinator" },
      { text: "Supervisor", value: "supervisor" },
      { text: "Manager", value: "manager" }
    ],
    profile: {},
    position: false,
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    err: false,
    errRepeat: false,
    checkbox: null,
    user: {},
    showPassword: false,
    loading: false,
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
        },
        select: {
          required: "Select field is required"
        }
      }
    }
  }),

  methods: {
    showAlert(message, icon, classy) {
      this.$store.commit("setAlertType", { icon: icon, class: classy });
      this.runAlert(message);
    },
    async submit(e) {
      e.preventDefault();

      this.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async () => {
          this.loading = await true;
          await this.auth().currentUser.sendEmailVerification();
        })
        .then(
          async () => {
            this.profile.displayName = await this.name;
            this.profile.updatePhoneNumber = this.phoneNumber;
            this.profile.photoURL = await "";
            // update profile auth
            await this.auth().currentUser.updateProfile(this.profile);
            this.$emit("closeDialog");
            // redirect with curresponding id
           await this.$store.dispatch('registerUser');
            await this.$router.push(`/landing/`);
            // update name
            this.loading = await false;
          },
          async err => {
            this.loading = await false;
            this.showAlert(err.message, "warning", "warning orange");
          }
        );
    },
    clear() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.$validator.reset();
      this.err = false;
      this.errRepeat = false;
    },
    ...mapActions(["runAlert"])
  },
  created() {},
  computed: mapGetters(["getCurrentUser", "getUserDB", "getUsers", "auth"])
};
</script>

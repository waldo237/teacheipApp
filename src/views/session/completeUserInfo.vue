<template>
  <v-layout justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition "
    >
        <v-toolbar dense app>
          <v-btn icon @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Registro de información</v-toolbar-title>
          <v-spacer />
          <span class="teach title">Teach</span>
          <span class="acronym title">EIP</span>
          <v-spacer />
          <v-toolbar-items>
            <v-btn text @click="save" class="sign-up">
              Guardar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      <v-card class="grey lighten-2 ">
        <v-layout row wrap justify-center>
          <v-subheader class="title mt-5">
            Información Básica de Usuario
          </v-subheader>
        </v-layout>

        <v-list class="px-4 mx-4 grey lighten-5 round mb-5">
          <v-list-tile-title class="subtitle-1" />
    <!-- avatar starts -->
        <v-divider />
        <v-layout class="pt-3 pb-0" justify-center row>
          <v-list-tile class="my-4">
            <v-layout column wrap justify-center>
              <span class="mx-auto">Cambiar foto de avatar</span>
              <v-layout row wrap>
                <v-avatar v-if="photoURL">
                  <img
                    :src="photoURL"
                    :lazy-src="photoURL"
                    :alt="auth().currentUser.displayName"
                  />
                </v-avatar>
                <v-avatar color="#c6192a" v-else>
                  <span class="white--text headline">{{ initialize }}</span>
                </v-avatar>

                <v-btn
                  round
                  small
                  class="mx-2 px-1"
                  color="sign-up"
                  @click="$refs.inputUpload.click()"
                >
                  <v-icon small class="mx-1"> image </v-icon>Buscar
                </v-btn>
                <v-btn
                  round
                  small
                  class="mx-2 px-1"
                  color="sign-in"
                  @click="uploadPhoto"
                >
                  <v-icon small class="mx-1"> cloud_upload </v-icon>Subir
                </v-btn>
              </v-layout>
              <!-- showSelected starts -->
              <v-text-field
                v-if="selectedFile"
                class="mx-auto my-0 py-0 slideRight"
                disabled
                :value="selectedFile.name"
                type="text"
              />
              <!-- showSelected ends -->
            </v-layout>
            <input
              @change="collectPhoto"
              v-show="false"
              ref="inputUpload"
              type="file"
              id="file"
              accept="image/x-png, image/gif, image/jpeg"
            />
          </v-list-tile>
        </v-layout>
       

        <v-layout justify-center>
          <!-- snackbar to notify completion starts -->
          <v-snackbar
            class="error"
            v-model="snackbar"
            color
            multi-line
            :timeout="6000"
            top="top"
          >
            "Tu foto de perfil ha sido cambiada"
            <v-btn dark text @click="snackbar = false">
              cerrar
            </v-btn>
          </v-snackbar>
          <!-- snackbar to notify completion ends -->

          <v-progress-linear
            height="22"
            v-model="progress"
            reactive
            color="light-blue darken-4"
            class="white--text"
            v-if="progress > 0"
          >
            <v-layout row wrap justify-center>
              <span class="title">{{ Math.ceil(progress) }}%</span>
            </v-layout>
          </v-progress-linear>
        </v-layout>
 <!-- avatar ends -->
          <v-text-field
            class="py-1"
            :value="auth().currentUser.displayName"
            label="Nombre:"
            outlined
            disabled
            type="text"
          />
          <v-text-field
            class="py-1"
            :value="auth().currentUser.email"
            label="Correo electrónico:"
            outlined
            disabled
            type="email"
          />

          <v-layout row justify-center class="my-0 py-0">
            <p>{{ gender || "Genero" }}</p>
            <v-radio-group v-model="gender" :mandatory="false" >
              <v-radio label="Femenino" value="F " color="#c6192a"></v-radio>
              <v-radio label="Masculino" value="M" color="#135393"></v-radio>
            </v-radio-group>

            <!-- date picker starts -->
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-layout column wrap >
                  
                <v-text-field
                  :value="computedDateFormattedMomentjs"
                  clearable
                  label="Fecha de nacimiento"
                  readonly
                  v-on="on"
                  @click:clear="date = null"
                ></v-text-field>
                <p v-if="date" class="slideRight">{{yourAge}} </p>
                </v-layout>
              </template>
              <v-date-picker
                v-model="date"
                color="#c6192a"
                @change="menu2 = false;calculateAge()"
              ></v-date-picker>
            </v-menu>
            <!-- date picker ends -->
          </v-layout>
          <v-text-field
            class="py-1"
            v-model="cedula"
            label="Cedula"
            hint="Escribe solo los numeros de tu cedula"
            @keydown="onKeydown"
            outlined
            type="tel"
            maxlength="13"
            pattern="[0-9]"
          />
          <v-text-field
            class="py-1"
            v-model="phoneNumber"
            :value="auth().currentUser.phoneNumber"
            label="Teléfono"
            @keydown="onKeydown"
            outlined
            type="tel"
            maxlength="12"
            pattern="[0-9]"
          />
          <!-- information about the center starts -->
          <v-layout row wrap>
            <v-select
              class="py-1"
              :items="regions"
              v-model="regionSelect"
              label="Region"
            ></v-select>
            <v-select
              class="py-1"
              v-model="provinceSelect"
              :items="provinces"
              label="Provincia"
            ></v-select>
            <v-select class="py-1" :items="recintos" label="Recinto"></v-select>
          </v-layout>

          <!-- information about the center ends -->
        </v-list>
        <v-divider />
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";
import { async } from "q";
import moment from "moment";
export default {
  name: "Editor",
  data() {
    return {
      phoneNumber: "",
      date1: new Date().toISOString().substr(0, 10),
      date: null,
      menu2: false,
      yourAge: '',
      cedula: "",
      selectedFile: "",
      gender: "",
      profile: {},
      dialog: true,
      dialog3: false,
      snackbar: false,
      photoURL: "",
      initials: "",
      progress: 0,
      editedUser: {},
      regions: ["Norte", "Sur", "Este", "Santo Domingo"],
      regionSelect: "",
      provinceSelect: "",
      centers: [],
      provinces: [],
      recintos: []
    };
  },
  methods: {
    calculateAge() {
      let ageDifMs = Date.now() - Date.parse(this.date);
      let ageDate = new Date(ageDifMs);
      this.yourAge = (Math.abs(ageDate.getUTCFullYear() - 1970)== 1 || Math.abs(ageDate.getUTCFullYear() - 1970)== 1) ? `entonces, tienes solo ${ Math.abs(ageDate.getUTCFullYear() - 1970)} año?`:`entonces, tienes ${ Math.abs(ageDate.getUTCFullYear() - 1970)} años?`;
    }, 
    async fetchCenters() {
      try {
        let res = {};
        res = await axios.get(
          "https://script.google.com/macros/s/AKfycbzpKy6DK0ZkUfRsXkn7Qergh4ibngE5f0uyTYIm5Q/exec"
        );
        this.centers = res.data.centers;
      } catch (error) {}
    },
    onKeydown(event) {
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
    formatPhoneNumber() {
      let s = this.phoneNumber;
      var s2 = ("" + s).replace(/\D/g, "");
      var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (m) this.phoneNumber = m[1] + "-" + m[2] + "-" + m[3];
    },
    formatCedula() {
      let s = this.cedula;
      var s2 = ("" + s).replace(/\D/g, "");
      var m = s2.match(/^(\d{3})(\d{7})(\d{1})$/);
      if (m) this.cedula = m[1] + "-" + m[2] + "-" + m[3];
    },
    toggleEditProfile() {
      this.$store.commit("setEditProfile", !this.editProfile);
    },
    collectPhoto(e) {
      this.selectedFile = e.target.files[0];
    },
    async uploadPhoto() {
      try {
        // Create a root reference
        const reference = await `${
          this.auth().currentUser.uid
        }/profilePicture/${this.auth().currentUser.displayName}`;
        const ref = await this.storage().ref(reference);
        // upload the photo
        await ref.put(this.selectedFile).on("state_changed", async snapshot => {
          //  make the progress element increment as data goes up
          this.progress =
            (await (snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
          //  display snackbar when upload is done
          if (Math.ceil(this.progress) > 99) {
            this.snackbar = true;
            await this.storage()
              .ref(reference)
              .getDownloadURL()
              .then(async url => {
                this.photoURL = await url;
                await this.auth().currentUser.updateProfile({
                  photoURL: this.photoURL
                });
                this.$root.$emit("changedPhoto");
              })
              .catch(err => {
                throw new Error(`there was an Error ${err}`);
              });
          }
        });
      } catch (error) {}
    },
    async save() {
      // //  populate the empty profile object
      // if (document.querySelector("#displayNameInput").value)
      //   this.profile.displayName = await document.querySelector(
      //     "#displayNameInput"
      //   ).value;
      // if (document.querySelector("#phoneNumberInput").value)
      //   this.profile.updatePhoneNumber = await document.querySelector(
      //     "#phoneNumberInput"
      //   ).value;
      // if (this.photoURL) this.profile.photoURL = this.photoURL;
      // // pass profile object to auth.currentUser
      // await this.auth().currentUser.updateProfile(this.profile);
      // //  pass the Auth.CurrentUser to Local CurrentUser
      this.dialog = false;
    }
  },
  watch: {
    phoneNumber() {
      this.formatPhoneNumber();
    },
    cedula() {
      this.formatCedula();
    },
    regionSelect() {
      this.provinceSelect = "";
      this.provinces = this.centers.map(item => {
        if (item.region.toUpperCase() == this.regionSelect.toUpperCase()) {
          return item.provincia;
        } else {
          return "";
        }
      });
    },
    provinceSelect() {
      this.recintos = this.centers.map(item => {
        if (item.provincia.toUpperCase() == this.provinceSelect.toUpperCase()) {
          return item.recintos;
        } else {
          return "";
        }
      });
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },

    initialize: function() {
      return this.auth()
        .currentUser.displayName.split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();
    },
    ...mapGetters(["auth", "storage"])
  },
  async created() {
    await this.fetchCenters();
    this.photoURL = await this.auth().currentUser.photoURL;
  }
};
</script>

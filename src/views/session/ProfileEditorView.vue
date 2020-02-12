<template>
  <v-layout justify-center>
    <v-dialog
      v-model="profileEditor"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition "
    >
      <v-toolbar
        dense
        app
      >
        <v-btn
          icon
          @click="$emit('profileEditor')"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Registro de información</v-toolbar-title>
        <v-spacer />
        <span class="teach title">Teach</span>
        <span class="acronym title">EIP</span>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            text
            @click="save"
            class="sign-up"
          >
            Guardar
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card
        class="grey lighten-2"
        @click="errors = []"
      >
        <v-layout
          row
          wrap
          justify-center
        >
          <v-subheader class="title mt-5">
            Información Básica de Usuario
          </v-subheader>
        </v-layout>

        <!-- error show starts  -->
        <v-alert
          outline
          rounded
          class="round slideRight stayPut"
          color="#c6192a"
          type="error"
          v-if="errors.length"
          v-model="alert"
        >
          No fue posible seguir por las siguientes razones:
          <ul>
            <li
              v-for="(error,i) in errors"
              :key="i"
            >
              {{ error }}
            </li>
          </ul>
        </v-alert>

        <!-- error show ends  -->

        <v-list class="px-4 mx-4 grey lighten-5 round mb-5">
          <v-list-tile-title class="subtitle-1" />
          <!-- avatar starts -->
          <v-divider />
          <v-layout
            class="pt-3 pb-0"
            justify-center
            row
          >
            <v-list-tile class="my-4">
              <v-layout
                column
                wrap
                justify-center
              >
                <span class="mx-auto">Cambiar foto de avatar</span>
                <v-layout
                  row
                  wrap
                >
                  <v-avatar v-if="photoURL">
                    <img
                      :src="photoURL"
                      :lazy-src="photoURL"
                      :alt="auth().currentUser.displayName"
                    >
                  </v-avatar>
                  <v-avatar
                    color="#c6192a"
                    v-else
                  >
                    <span class="white--text headline">{{ initialize }}</span>
                  </v-avatar>

                  <v-btn
                    round
                    small
                    class="mx-2 px-1"
                    color="sign-up"
                    @click="$refs.inputUpload.click()"
                  >
                    <v-icon
                      small
                      class="mx-1"
                    >
                      image
                    </v-icon>Buscar
                  </v-btn>
                  <v-btn
                    round
                    small
                    class="mx-2 px-1"
                    color="sign-in"
                    @click="uploadPhoto"
                  >
                    <v-icon
                      small
                      class="mx-1"
                    >
                      cloud_upload
                    </v-icon>Subir
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
              >
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
              <v-btn
                dark
                text
                @click="snackbar = false"
              >
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
              <v-layout
                row
                wrap
                justify-center
              >
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

          <v-layout
            row
            justify-center
            class="my-0 py-0"
          >
            <p>{{ gender || "Genero" }}</p>
            <v-radio-group
              v-model="gender"
              :mandatory="false"
            >
              <v-radio
                label="Femenino"
                value="F "
                color="#c6192a"
              />
              <v-radio
                label="Masculino"
                value="M"
                color="#135393"
              />
            </v-radio-group>

            <!-- date picker starts -->
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-layout
                  column
                  wrap
                >
                  <v-text-field
                    :value="computedDateFormattedMomentjs"
                    clearable
                    label="Fecha de nacimiento"
                    readonly
                    v-on="on"
                    @click:clear="date = null"
                  />
                  <p
                    v-if="date"
                    class="slideRight"
                  >
                    {{ yourAge }}
                  </p>
                </v-layout>
              </template>
              <v-date-picker
                v-model="date"
                color="#c6192a"
                @change="menu2 = false;calculateAge()"
              />
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
          <v-layout
            row
            wrap
          >
            <v-select
              class="py-1"
              :items="regions"
              v-model="regionSelect"
              label="Region"
            />
            <v-select
              class="py-1"
              v-model="provinceSelect"
              :items="provinces"
              label="Provincia"
            />
            <v-select
              v-model="center"
              class="py-1"
              :items="recintos"
              label="Recinto"
            />
          </v-layout>

          <!-- information about the center ends -->
        </v-list>
        <v-divider />
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import { async } from "q";
import moment from "moment";
export default {
  name: "Editor",
  props:['profileEditor'],
  data() {
    return {
      phoneNumber: "",
      cedula: "",
      photoURL: "",
      regionSelect: "",
      provinceSelect: "",
      yourAge: "",
      center: "",
      date: null,
      date1: new Date().toISOString().substr(0, 10),
      menu2: false,
      gender: "",
      selectedFile: "",
      snackbar: false,
      initials: "",
      progress: 0,
      regions: ["Norte", "Sur", "Este", "Santo Domingo"],
      centers: [],
      provinces: [],
      recintos: [],
      errors: [],
      alert: true,
    };
  },
  methods: {
    calculateAge() {
      let ageDifMs = Date.now() - Date.parse(this.date);
      let ageDate = new Date(ageDifMs);
      this.yourAge =
        Math.abs(ageDate.getUTCFullYear() - 1970) == 1 ||
        Math.abs(ageDate.getUTCFullYear() - 1970) == 1
          ? `entonces, tienes solo ${Math.abs(
              ageDate.getUTCFullYear() - 1970
            )} año?`
          : `entonces, tienes ${Math.abs(
              ageDate.getUTCFullYear() - 1970
            )} años?`;
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
    checkForm() {
    let valid = true;
    
      this.errors = [];
      if (!this.cedula) {
        this.errors.push("El numero de cedula es obligadorio.");
         valid = false;
      }
      if (!this.phoneNumber) {
        this.errors.push("Necesitamos tu numero de telefono.");
        valid = false;
      }
      if (!this.gender) {
        this.errors.push("especifica tu sexo.");
        valid = false;
      }
      if (!this.regionSelect) {
        this.errors.push("tienes que seleccionar la region.");
        valid = false;
      }
      if (!this.provinceSelect) {
        this.errors.push("tienes que seleccionar la provincia.");
        valid = false;
      }
      if (!this.center) {
        this.errors.push("tienes que seleccionar el centro.");
        valid = false;
      }
      if (!this.date) {
        this.errors.push("Falto tu fecha de Nacimiento.");
        valid = false;
      }
      return valid;
    },
    async save() {
      if (this.checkForm()) {
        const localContactInfo = {
          cu_id: this.auth().currentUser.uid,
          photoURL: this.photoURL,
          firstName: this.auth().currentUser.displayName.split(" ")[0],
          lastName: this.auth().currentUser.displayName.split(" ")[1],
          email: this.auth().currentUser.email,
          gender: this.gender,
          birthdate: this.date,
          cedula: this.cedula,
          phone: this.phoneNumber,
          region: this.regionSelect,
          province: this.provinceSelect,
          center: this.center
        };
        this.$store.commit("setContactInfo", localContactInfo);
        // this.dialog = false;
       await this.completeContactInfo();
       
       let role = await atob(localStorage.getItem('sessionRole'))
          if (role == 'teacher') {
              await this.$router.push(`/teacherDashboard`);
          } else {
            await this.$router.push(`/completeUserInfo`);
          }
      }
    },
    ...mapActions(["completeContactInfo"])
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
    ...mapGetters(["auth", "storage", "closeableForm", "id"])
  },
  async created() {
    await this.fetchCenters();
    this.photoURL = await this.auth().currentUser.photoURL;
    this.phoneNumber = this.auth().currentUser.phoneNumber;
    this.cedula = this.id;
  }
};
</script>
<style >
.stayPut{
  z-index: 1 !important;
  position: fixed !important;
  top: 50px;
 left: 10px;
 background-color: ghostwhite;
  justify-self: center !important;
 
}
</style>
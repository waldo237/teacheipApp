<template>
  <v-layout class="mb-5 pb-5" justify-center wrap column>
    <header>
      <v-layout
        justify-center
        row
        wrap
        primary-title
        class="display-1 font-weight-light text-xs-center main-title mt-5 pt-5 mx-4 px-1"
        >Solicitud de permisos</v-layout
      >
    </header>
    <main>
      <v-container grid-list-sm class="pa-3">
        <v-card class="round mx-2 px-2 mb-5 pb-5 grey lighten-4 elevation-9">
          <v-layout row justify-center class="grey lighten-4 title"
            >Solicitar Permisos</v-layout
          >
          <v-layout justify-center align-center class="grey lighten-4">
            <span class="orange--text lighten-3 upper">En funcionamiento</span>
            <v-icon background-color="orange lighten-3" color="orange"
              >mood</v-icon
            >
          </v-layout>
          <!-- WAITING STARTS -->
          <v-layout row wrap justify-center v-if="loading" class="slide">
            <waiting />
          </v-layout>
          <!-- WAITING ENDS -->

          <div @click="errors = []" v-else class="slide">
            <v-layout row wrap justify-start>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img :src="this.auth().currentUser.photoURL" alt />
                </v-avatar>
                <v-text-field placeholder="Name" v-model="request.name" />
              </v-layout>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
                :value="request.email"
                disabled
              />

              <v-text-field
                prepend-icon="event"
                placeholder="Fecha"
                :value="request.date"
                disabled
              />
            </v-layout>

            <!-- ================================== -->
            <v-layout row wrap justify-start class="mx-0">
              <v-btn
                small
                round
                color="sign-up"
                @click="$refs.inputUpload.click()"
              >
                <v-icon small>description</v-icon>Subir constancia para el
                permiso
              </v-btn>
              <input
                v-show="false"
                ref="inputUpload"
                type="file"
                @change="showPath"
                id="file1"
                accept="application/msword, application/pdf, image/*"
              />
              <v-card class="ma-3" flat v-model="path">{{ path }}</v-card>
            </v-layout>

            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Razon para el permiso"
                v-model="request.body"
                maxlength="400"
                type="text"
              />
            </v-flex>
            <!-- date picker starts -->
            <v-layout row wrap>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on }">
                  <v-layout column wrap>
                    <v-text-field
                      :value="dateFormater(request.starts)"
                      clearable
                      label="Cuando empiezar este permiso"
                      readonly
                      v-on="on"
                      @click:clear="request.starts = null"
                      class="mx-2"
                    />
                  </v-layout>
                </template>
                <v-date-picker
                  v-model="request.starts"
                  color="#c6192a"
                  @change="menu2 = false"
                />
              </v-menu>

              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on }">
                  <v-layout column wrap>
                    <v-text-field
                      :value="dateFormater(request.ends)"
                      clearable
                      label="Cuando termina este permiso"
                      readonly
                      v-on="on"
                      @click:clear="request.ends = null"
                      class="mx-2"
                    />
                  </v-layout>
                </template>
                <v-date-picker
                  v-model="request.ends"
                  color="#c6192a"
                  @change="menu1 = false"
                />
              </v-menu>
            </v-layout>
            <!-- date picker ends -->
            <!-- ================================== -->
            <v-layout justify-center wrap row>
              <!-- snackbar to notify completion starts -->
              <v-snackbar
                class="error"
                v-model="snackbar"
                color
                multi-line
                :timeout="6000"
                top="top"
              >
                {{ snackbarMessage }}
                <v-btn small dark text @click="snackbar = false">Close</v-btn>
              </v-snackbar>
              <!-- snackbar to notify completion ends -->
            </v-layout>
          </div>
          <v-card-actions>
            <v-spacer />
            <v-btn small flat round class="sign-up" @click="reset"
              >cancelar</v-btn
            >
            <v-btn
              small
              round
              flat
              @click="localPostSugerencia"
              class="sign-in"
              :loading="loading"
              >Enviar solicitud</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-container>
    </main>
    <aside>
      <v-layout column wrap class="mx-5 pax-5">
          <v-card v-for="item in permissions" :key="item.permission_id">
            <v-card-title class="title">
              {{item.body}}
            </v-card-title>
            {{item}}
          </v-card>
      </v-layout>
    </aside>
    <figure>
      <!--  ERROR ALERT STARTS -->
      <v-alert
        outline
        rounded
        class="round slideRight stayPut mx-4"
        color="#c6192a"
        type="error"
        v-if="errors.length"
        v-model="alert"
      >
        No fue posible seguir por las siguientes razones:
        <ul>
          <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
        </ul>
      </v-alert>
      <!--  ERROR ALERT ENDS -->
    </figure>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import axios from "axios";
import session from "@/store/modules/session.js";
import waiting from "@/components/loading.vue";
export default {
  name: "SolicitarPermiso",
  components: { waiting },
  data: () => {
    return {
      path: "",
      dialog: false,
      loading: false,
      snackbar: false,
      snackbarMessage: "",
      timeOut: {},
      errors: [],
      request: {},
      alert: true,
      date: null,
      menu2: false,
      menu1: false,
      file: null,
      permissions: []
    };
  },
  methods: {
    localPostSugerencia() {
      if (this.validate()) {
        try {
          this.postRequest()
            .then(res => {
              this.snackbarMessage = res.data;
              this.snackbar = true;
              this.loading = false;
            })
            .then(() => {
              this.timeOut = setTimeout(this.reset, 6000);
            })
            .catch(err => {
              throw new Error(`there was an Error ${err}`);
            });
        } catch (error) {
          console.log(error);
        }
      }
    },

    validate() {
      let valid = true;
      this.errors = [];
      if (!this.request.name) {
        this.errors.push("Tiene que incluir su nombre completo.");
        valid = false;
      }
      if (!this.path) {
        this.errors.push("Tiene que escoger un archivo para solicitar permiso");
        valid = false;
      }
      if (!this.request.starts || !this.request.ends) {
        this.errors.push(
          "Favor indicar la fecha que comienza y termina el permiso"
        );
        valid = false;
      } else {
        if (this.compareDates()) {
          this.errors.push(
            `La fecha de inicio ${this.request.starts} es mayor a la fecha que termina el permiso ${this.request.starts}`
          );
          valid = false;
        }
      }
      if (!this.request.body) {
        this.errors.push(
          "explique de forma breve las razones porque necesita el permiso."
        );
        valid = false;
      }
      if (this.file) {
        if (this.file.size >= 15728640) {
          this.errors.push(
            "El archivo para la constancia excede los 15MB. Por favor guardelo en otro formato o reduzcalo."
          );
          valid = false;
        }
      }

      return valid;
    },
    reset() {
      this.loading = false;
      this.path = "";
      this.request.starts = "";
      this.request.ends = "";
      this.request.body = "";
    },
    showPath() {
      this.file = document.getElementById("file1").files[0];
      this.path = document.getElementById("file1").value;
    },
    getFileName() {
      if (this.path) {
        const startIndex =
          this.path.indexOf("\\") >= 0
            ? this.path.lastIndexOf("\\")
            : this.path.lastIndexOf("/");
        let filename = this.path.substring(startIndex);
        if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
          filename = filename.substring(1);
        }
        return filename;
      }
    },
    postRequest() {
      return new Promise((resolve, reject) => {
        this.loading = true;
        var reader = new FileReader();
        reader.onloadend = async () => {
          try {
            this.request.file = await reader.result;
            this.request.file = this.request.file.split("base64,")[1];
            this.request.filename = `${this.request.name}_${this.request.date}`;
            this.request.fileSize = this.file.size;
            this.request.format = this.getFileName()
              .split(".")
              .pop();
            this.request.res = await axios.post(
              "https://script.google.com/macros/s/AKfycbxXk9Y8hRkF7sgyT3UAmpyZkaeQK9yONtsEc40nRFYKRduZWss/exec",
              JSON.stringify(this.request)
            );
            resolve(this.request.res);
          } catch (error) {
            this.loading = false;
            reject(error);
          }
        };
        reader.readAsDataURL(this.file);
      });
    },
  async  fetchPermissions() {
        this.permissions. = await axios.get(
              `https://script.google.com/macros/s/AKfycbxXk9Y8hRkF7sgyT3UAmpyZkaeQK9yONtsEc40nRFYKRduZWss/exec?uid=${this.auth().currentUser.uid}`)
    },
    dateFormater(d) {
      return d
        ? moment(d)
            .locale("es")
            .format("dddd, MMMM D YYYY")
        : "";
    },
    compareDates() {
      return this.request.starts >= this.request.ends;
    }
  },
  beforeDestroy() {
    clearInterval(this.timeOut);
  },
  computed: {
    ...mapGetters(["auth", "storage"])
  },
 async created() {
    this.request.name = this.auth().currentUser.displayName;
    this.request.email = this.auth().currentUser.email;
    this.request.uid = this.auth().currentUser.uid;
    this.request.date = new Date();
  await  this.fetchPermissions();
    console.log(this.permissions)
  }
};
</script>

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
          <v-layout row justify-center class="grey lighten-4 py-3 title"
            >Solicitar Permisos Extensos</v-layout
          >
          <v-layout row wrap>
            <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="15"
              v-model="progress"
              reactive
              v-if="progress > 0"
              color="#376092"
            >
              <strong>{{ Math.ceil(progress) }}%</strong>
            </v-progress-circular>
          </v-layout>
          <!-- ================================== -->
          <!-- ================================== -->
          <div @click="errors = []">
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

            <v-layout xs6 wrap row justify-start>
              <v-text-field
                prepend-icon="format_list_numbered"
                placeholder="Numero de dias a solicitar"
                type="number"
                pattern="[0-9]*"
                size="1"
                max="9"
                required
                clearable
                v-model="request.days"
              />
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
                       :value="computedDateFormattedMomentjs(request.starts)"
                      clearable
                      label="Cuando empiezar este permiso"
                      readonly
                      v-on="on"
                      @click:clear="request.starts = null"
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
                      :value="computedDateFormattedMomentjs(request.ends)"
                      clearable
                      label="Cuando termina este permiso"
                      readonly
                      v-on="on"
                      @click:clear="request.ends = null"
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
    <figure>
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
          <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
        </ul>
      </v-alert>
    </figure>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import axios from "axios";
import session from "@/store/modules/session.js";
import { directive as onClickaway } from "vue-clickaway";
export default {
  name: "SolicitarPermiso",
  directives: {
    onClickaway: onClickaway
  },
  data: () => {
    return {
      path: "",
      dialog: false,
      loading: false,
      snackbar: false,
      snackbarMessage: "",
      progress: 0,
      timeOut: {},
      errors: [],
      request: {},
      alert: true,
      date: null,
      menu2: false,
      menu1: false,
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
      if (!this.request.days) {
        this.errors.push(
          "Tiene que especificar el numero de dias que no estara"
        );
        valid = false;
      }
      if (!this.request.body) {
        this.errors.push(
          "explique de forma breve las razones porque necesita el permiso."
        );
        valid = false;
      }
      return valid;
    },
    reset() {
      this.loading = false;
      this.progress = 0;
      this.path = "";
    },
    showPath() {
      this.path = document.getElementById("file1").value;
    },
    getFileName() {
      const fullPath = document.getElementById("file1").value;
      if (fullPath) {
        const startIndex =
          fullPath.indexOf("\\") >= 0
            ? fullPath.lastIndexOf("\\")
            : fullPath.lastIndexOf("/");
        let filename = fullPath.substring(startIndex);
        if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
          filename = filename.substring(1);
        }
        return filename;
      }
    },
    postRequest() {
      return new Promise((resolve, reject) => {
        this.loading = true;
        var file = document.getElementById("file1").files[0];
        var reader = new FileReader();
        reader.onloadend = async () => {
          try {
            this.request.file = await reader.result;
            this.request.file = this.request.file.split("base64,")[1];
            this.request.filename = this.getFileName();
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
        reader.readAsDataURL(file);
      });
    },
    computedDateFormattedMomentjs(d) {
      return d
        ? moment(d)
            .locale("es")
            .format("dddd, MMMM D YYYY")
        : "";
    }
  },
  beforeDestroy() {
    clearInterval(this.timeOut);
  },
  computed: {
    ...mapGetters(["auth", "storage"]),
  },
  created() {
    this.request.name = this.auth().currentUser.displayName;
    this.request.email = this.auth().currentUser.email;
  }
};
</script>

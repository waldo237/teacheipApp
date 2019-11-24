<template>
  <div>
    <v-card class="round ma-5 pa-4">
      <v-card-title class="grey lighten-4 py-3 title">
        Solicitar Copias de Examenes
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
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
          <v-layout row wrap justify-start class="mx-4">
            <v-btn
              round
              color="sign-up"
              @click="$refs.inputUpload.click()"
            >
              <v-icon small> description </v-icon>Subir Archivo de examen
            </v-btn>
            <input
              v-show="false"
              ref="inputUpload"
              type="file"
              @change="showPath"
              id="file1"
              accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                  text/plain, application/pdf"
            />
            <v-card class="ma-3" flat v-model="path">{{ path }}</v-card>
              <v-card flat row justify-space-around width="380px">
              <v-btn round class="ma-auto" color="sign-up" @click="addAudio">
                <v-icon small> add </v-icon>  track
              </v-btn>
              <v-btn round class="ma-auto" color="sign-up" @click="removeAudio">
                <v-icon small> remove </v-icon>  track
              </v-btn>
                
              </v-card>
          </v-layout>
    
          <v-layout wrap>
              <v-layout class="ma-3 pa-2" row min-width="380px" wrap v-for="audio in audios" :key="audio.track">
                <v-card width="380px" flat>
                <label :for="audio.input"
                class="mx-2"
                  ><v-icon small > volume_up </v-icon>audio
                  {{ audio.track }}</label
                >
                <input
                  :id="audio.input"
                  type="file"
                  @change="showPath"
                  accept="audio/*"
                />
                </v-card>
              </v-layout>
          </v-layout>


        <v-layout xs6 wrap  row justify-start> 
          <v-text-field
            prepend-icon="format_list_numbered"
            placeholder="numero de copias"
            type="number"
          />
          <v-text-field
            prepend-icon="phone"
            placeholder="numero telefonico"
            type='tel'
          />
          <v-text-field
            prepend-icon="local_shipping"
            placeholder="servicio de envio"
            type="text"
          />
        </v-layout>
          <v-flex xs12>
          <v-text-field
            prepend-icon="notes"
            placeholder="Comentario"
            v-model="sugerenciasBody"
          />
        </v-flex>
     

        <v-layout row wrap justify-start>
          <v-layout align-center>
            <v-avatar size="40px" class="mr-3">
              <img :src="this.auth().currentUser.photoURL" alt />
            </v-avatar>
            <v-text-field
              placeholder="Name"
              :value="this.auth().currentUser.displayName"
              disabled
            />
          </v-layout>
          <v-text-field
            prepend-icon="mail"
            placeholder="Email"
            :value="this.auth().currentUser.email"
            disabled
          />
     
          <v-text-field
            prepend-icon="event"
            placeholder="Fecha"
            :value="now"
            disabled
          />
        </v-layout>
    
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
          {{snackbarMessage}}
            
            <v-btn dark text @click="snackbar = false">
              Close
            </v-btn>
          </v-snackbar>
          <!-- snackbar to notify completion ends -->
        </v-layout>
      <v-card-actions>
        <v-spacer />
        <v-btn flat round class="sign-up" @click="reset">
          cancelar
        </v-btn>
        <v-btn round flat @click="localPostSugerencia" class="sign-in" :loading="loading">
          Enviar solicitud
        </v-btn>
      </v-card-actions>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import session from "@/store/modules/session.js";
import { directive as onClickaway } from "vue-clickaway";
import Sidemenu from "@/components/RoleComponents/coordinatorComponents/CoordinatorSidemenu.vue";
export default {
  name: "CoordinatorDashboard",
  components: { Sidemenu },
  directives: {
    onClickaway: onClickaway
  },
  data: () => {
    return {
      audios: [{ track: 0, input: `track0` }],
      path: "",
      sugerenciasBody: "",
      dialog: false,
      loading: false,
      alert: true,
      announcement: true,
      snackbar: false,
      snackbarMessage: "",
      url: "",
      initials: "",
      progress: 0,
      timeOut: {},
      now: moment().format("LLL")
    };
  },
  methods: {
    localPostSugerencia(){
      try{
        this.postSolicitud()
          .then(() => {
            this.snackbarMessage = "Este servicio todavia no esta disponible"
            this.snackbar = true;
            this.loading = false;
          })
          .then(() => {
            this.timeOut = setTimeout(this.reset, 6000);
          })
          .catch(() => {
            throw new Error(`there was an Error ${err}`);
          });
      } catch (error) {
        console.log(error);
      }
    },
    addAudio() {
      this.audios.push({
        track: this.audios.length,
        input: `track${this.audios.length}`
      });
    },
   removeAudio() {
      this.audios.pop();
    },
    reset() {
      this.dialog = false;
      this.loading = false;
      this.progress = 0;
      this.path = "";
      this.sugerenciasBody = "";
    },
    showPath() {
      this.path = document.getElementById("file1").value;
    },
    ...mapActions(["postSolicitud"]),
    async upload(e) {
      if (this.path == "") {
        this.collector(this.path);
      } else {
        try {
          this.loading = true;
          // Create a root reference
          const reference = await `${this.auth().currentUser.uid}/sugerencias/${
            this.auth().currentUser.displayName
          }`;
          const ref = await this.storage().ref(reference);
          // upload the photo
          await ref
            .put(document.getElementById("file1").files[0])
            .on("state_changed", async snapshot => {
              //  make the progress element increment as data goes up
              this.progress =
                (await (snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
              //  display snackbar when upload is done
              if (Math.ceil(this.progress) > 99) {
                await this.storage()
                  .ref(reference)
                  .getDownloadURL()
                  .then(url => {
                    this.collector(url);
                  })
                  .catch(err => {
                    throw new Error(`there was an Error ${err}`);
                  });
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async collector(url) {
      if (url == "") this.loading = true;
      try {
        await this.$store.commit("setSugerencia", {
          user: this.auth().currentUser.displayName,
          email: this.auth().currentUser.email,
          date: this.now,
          message: this.sugerenciasBody,
          photo: url
        });

        this.postSolicitud()
          .then(() => {
            this.snackbarMessage = "Este servicio todavia no esta disponible"
            this.snackbar = true;
            this.loading = false;
          })
          .then(() => {
            this.timeOut = setTimeout(this.reset, 6000);
          })
          .catch(() => {
            throw new Error(`there was an Error ${err}`);
          });
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.$store.commit("setFullScreen", false);
  },
  beforeDestroy() {
    clearInterval(this.timeOut);
  },
  computed: {
    ...mapGetters(["auth", "storage"])
  }
};
</script>

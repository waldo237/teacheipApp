<template>
  <div >
    <!-- ######### warning ################ -->
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
            <li v-for="(error,i) in errors" :key="i">{{ error }}</li>
          </ul>
        </v-alert>

        <!-- error show ends  -->
    <!-- ######### warning ends ################ -->

    <v-card flat class="grey lighten-4">
      <v-layout row align-center class="my-0">
        <v-avatar size="40px" class="mr-2 my-0">
          <img :src="this.auth().currentUser.photoURL" alt />
        </v-avatar>
        <v-text-field v-model="name" class="my-0" placeholder="Name" :value="this.auth().currentUser.displayName" disabled />
        <v-text-field
        class="my-0"
          prepend-icon="mail"
          placeholder="Email"
          :value="this.auth().currentUser.email"
          disabled
        />
      </v-layout>

      <!-- ================================== -->
      <v-layout justify-center wrap column class="my-0" @click="errors = []">
      <v-layout justify-center  row class="my-0">
        
        <v-text-field
        class="my-0 mx-1"
          prepend-icon="notifications"
          placeholder="titulo de notificación."
          v-model="title"
          
        />
        <v-text-field
        class="my-0"
          prepend-icon="link"
          solo
          placeholder="enlance al recurso compartido."
          v-model="link"
        />
          
        </v-layout>
        <v-text-field
        class="my-0"
          prepend-icon="notes"
          placeholder="contenido de notificación."
          v-model="body"

        />
        <!-- snackbar to notify completion starts -->
        <v-snackbar class="error" v-model="snackbar" color multi-line :timeout="6000" top="top">
         {{snackbarMessage}}
          <v-btn dark text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <!-- snackbar to notify completion ends -->
      </v-layout>
      <!-- ================================== -->

      <v-card-actions>
        <v-spacer />
        <v-btn flat round class="sign-up" @click="reset">cancelar</v-btn>
        <v-btn round flat @click="collector" class="sign-in" :loading="loading">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import session from "@/store/modules/session.js";
import { directive as onClickaway } from "vue-clickaway";
export default {
  directives: {
    onClickaway: onClickaway
  },
  data: () => {
    return {
      name: "",
      title: "",
      body: "",
      link: "",
      publishedDate: moment().format("LLL"),
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
      errors:[],
    };
  },
  methods: {
    reset() {
      this.dialog = false;
      this.loading = false;
      this.progress = 0;
      this.path = "";
      this.sugerenciasBody = "";
    },
     checkForm() {
    let valid = true;
    
      this.errors = [];
      if (!this.title) {
        this.errors.push("Le falta el título a la notificación.");
         valid = false;
      }
      if (!this.body) {
        this.errors.push("Tiene que escribir el contenido de la notificación.");
        valid = false;
      }
      if (!this.link) {
        this.errors.push("Incluya un link con el recurso compartido.");
        valid = false;
      }
      return valid;
    },
    ...mapActions(["postNotificacion"]),

    async collector() {
      if(this.checkForm()){
        this.loading = true;
        try {
          await this.$store.commit("setNotificacionMessage", {
            name: this.auth().currentUser.displayName,
            email: this.auth().currentUser.email,
            avatar: this.auth().currentUser.photoURL,
            title: this.title,
            body: this.body,
            link: this.link,
            publishedDate: new Date(),
          });
  
          this.postNotificacion()
            .then(async(data) => {
              this.snackbarMessage = await ` "Su notificación ha sido enviada correctamente. Muchas gracias!"
         \nname=${data.name}
              email=${data.email}
          \ntitle=${data.title} 
          \nbody=${data.body} 
         \npublishedDate=${data.publishedDate}`
              this.snackbar = true;
              this.loading = false;
            })
            .then(() => {
              this.timeOut = setTimeout(this.reset, 6000);
            })
            .catch((err) => {
              throw new Error(`there was an Error ${err}`);
            });
        } catch (error) {
          console.log(error);
        }
        
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timeOut);
  },
  computed: {
    ...mapGetters(["auth", "storage"])
  }
};
</script>
<style>
.stayPut{
  z-index: 1 !important;
  position: fixed !important;
  top: 50px;
 left: 10px;
 background-color: ghostwhite;
  justify-self: center !important;
 
}
</style>
<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
         <v-btn class="edit-profile" v-on="on">edit profile</v-btn>
      </template>
      <v-card >
        <v-toolbar color="white">
          <v-btn icon  @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer><span class="teach title">Teach</span>
          <span class="acronym title">EIP</span>
          <v-spacer></v-spacer>
          <v-toolbar-items >
            <v-btn  text @click="save" class="sign-up">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
          <v-subheader class="title">User Information</v-subheader>
        <v-layout three-line subheader class=" pt-5" justify-start>
        
          <v-list-tile >
              <v-avatar v-if="getCurrentUser.photoURL !== 'https://generic.jpg'">
                <img :src="getCurrentUser.photoURL"
              :alt="getCurrentUser.displayName" />
            </v-avatar>    
              <v-avatar color="red" v-else>
              <span class="white--text headline">{{getCurrentUser.displayName.split(" ").map((n)=>n[0]).join("").toUpperCase()}}</span>

            </v-avatar>    
          
            <v-btn small class="ma-3" color ="sign-up" @click="$refs.inputUpload.click()"><v-icon small>edit</v-icon>Upload</v-btn>
            <input v-show="false" ref="inputUpload" type="file" @change="uploadPhoto" id="file" accept="image/x-png,image/gif,image/jpeg">
            
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
              top='top'
              >
              "The photo has been uploaded, it will show in a few seconds "
              <v-btn
                dark
                text
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </v-snackbar>
          <!-- snackbar to notify completion ends -->
      
          <v-progress-linear
                height="25"
                v-model="progress"
                reactive
                color="red"
                class="mx-5"
                v-if="progress>0"
                >
                
                <strong>{{Math.ceil(progress) }}%</strong>
            </v-progress-linear>

        </v-layout>
          <v-divider></v-divider>
          <v-list three-line subheader class="ml-5 ">

          <v-list-tile-title class="subtitle-1"> </v-list-tile-title>
       
              <v-flex xs12 sm6 md3>
                <v-text-field
                :value="getCurrentUser.displayName"
                  label= NAME:
                  outlined
                id="displayNameInput">
                 </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field
                :value="getCurrentUser.phoneNumber"
                  label= PHONE NUMBER:
                  outlined
                   id="phoneNumberInput">
                  </v-text-field>
            </v-flex>
          </v-list>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<style scoped>

</style>

<script>
import {storage, auth} from 'firebase'
import {mapGetters, mapMutations} from 'vuex'
import { setTimeout } from 'timers';
import { async } from 'q';
  export default {
    name: 'editor',
    data () {
      return {
        profile: {},
        sound: true,
        widgets: false,
        dialog: false,
        dialog3: false,
        snackbar: false,
        url:"",
        initials:"",
        progress: 0,
        editedUser:{
        }
      }
    },
    methods:{
      toggleEditProfile(){
            this.$store.commit('setEditProfile', !this.editProfile)
        },
    async  uploadPhoto(e){
      try {
        // Create a root reference
      const reference = await `${auth().currentUser.uid}/profilePicture/${auth().currentUser.displayName}`
      const ref = await storage().ref(reference);
      // upload the photo
     await ref.put(e.target.files[0]).on('state_changed', async (snapshot)=> {
      //  make the progress element increment as data goes up
         this.progress = await ( snapshot.bytesTransferred / snapshot.totalBytes)* 100;
        //  display snackbar when upload is done
               if(Math.ceil(this.progress) > 99) {
                 this.snackbar = true; 
                 await storage().ref(reference).getDownloadURL().then(async url=>{
                 this.url = await url
              }).catch((err)=>{
                console.log(`there was an Error ${err}`);
              });}
        });        
      } catch (error) {
        
      }
        },
       async save(){
        //  populate the empty profile object
        if(document.querySelector("#displayNameInput").value)  this.profile.displayName = await document.querySelector("#displayNameInput").value;
        if( document.querySelector("#phoneNumberInput").value)  this.profile.updatePhoneNumber =  await document.querySelector("#phoneNumberInput").value;
        if( this.url) this.profile.photoURL = this.url;
            // pass profile object to auth.currentUser
           await auth().currentUser.updateProfile(this.profile);
          //  await auth().currentUser.updatePhoneNumber(this.profile.updatePhoneNumber);
            //  pass the Auth.CurrentUser to Local CurrentUser
           await this.$store.commit(
                "setCurrentUser",
                auth().currentUser
              );
        this.dialog = false;
        }  
    },
    computed: mapGetters(['getCurrentUser']),
    created(){
    }

  }
</script>
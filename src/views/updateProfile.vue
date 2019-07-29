<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
         <v-btn class="edit-profile" v-on="on">edit profile</v-btn>
      </template>
      <v-card >
        <v-toolbar color="white">
          <v-btn icon  @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer><span class="teach">Teach</span>
        <span class="acronym">EIP</span>
         <v-spacer></v-spacer>
        <span class="acronym"></span>
          
          <v-toolbar-items >
            <v-btn  text @click="save" class="sign-up">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>


        <v-list three-line subheader class="ml-5">
            
          <v-subheader class="title">User Information</v-subheader>
          <v-list-tile class="information-piece p-5">
          <v-list-tile-content>
              <v-avatar><img :src="getCurrentUser.photoURL"
        :alt="getCurrentUser.displayName"/>
            </v-avatar>             
    <v-btn small color ="sign-up" @click="$refs.inputUpload.click()"><v-icon small>edit</v-icon>Upload</v-btn>
<input v-show="false" ref="inputUpload" type="file" @change="uploadPhoto" >
   
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader class="ml-5 ">

      <v-list-tile-title class="subtitle-1"> </v-list-tile-title>
       <!-- drop url starts -->
       <v-text-field
            :value="getCurrentUser.photoURL"
              label= URL:
              outlined
              id="photo">
          </v-text-field>
    <!-- drop url ends -->
        <v-flex xs12 sm6 md3>
          <v-text-field
          :value="getCurrentUser.displayName"
            label= NAME:
            outlined
           id="displayName">
           </v-text-field>
        </v-flex>
          <v-flex xs12 sm6 md3>
            <v-text-field
            :value="getCurrentUser.phoneNumber"
              label= PHONE NUMBER:
              outlined
              id="phoneNumber">
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
import auth from 'firebase'
import {mapGetters} from 'vuex'
  export default {
    name: 'editor',
    data () {
      return {
        profile: {},
        sound: true,
        widgets: false,
        dialog: false,
        dialog3: false,
        editedUser:{
        }
      }
    },
    methods:{
      verify(phoneNumber){
              // 'recaptcha-container' is the ID of an element in the DOM.
      const applicationVerifier = new auth.auth.RecaptchaVerifier(
          'recaptcha-container');
      var provider = new auth.auth.PhoneAuthProvider();
      provider.verifyPhoneNumber(phoneNumber, applicationVerifier)
          .then(function(verificationId) {
            var verificationCode = window.prompt('Please enter the verification ' +
                'code that was sent to your mobile device.');
            return auth.auth.PhoneAuthProvider.credential(verificationId,
                verificationCode);
          })
          .then(function(phoneCredential) {
            return user.updatePhoneNumber(phoneCredential);
          });
      },
        toggleEditProfile(){
            this.$store.commit('setEditProfile', !this.editProfile)
        },
        uploadPhoto(){

        },
       async save(){
        this.profile.displayName = await document.querySelector('#displayName').value
        this.profile.updatePhoneNumber = await document.querySelector('#phoneNumber').value
        this.profile.photoURL  = await document.querySelector('#photo').value
         await auth.auth().currentUser.updateProfile(this.profile);
        //  await auth.auth().currentUser.updatePhoneNumber(this.verify(this.profile.updatePhoneNumber));
          await this.$store.commit("setCurrentUser", auth.auth().currentUser);
          this.dialog = false;
        }
    },
    computed: mapGetters(['getCurrentUser'])
  }
</script>
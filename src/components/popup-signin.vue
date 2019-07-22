<template>
    <v-dialog v-model="getSIDialog" persistent max-width="500px">      
          <v-flex   >
            <v-card class="elevation-12" >
              <v-toolbar  class="sign-in">
                <v-toolbar-title></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="sign-up" @click="toggleSI">Cancel</v-btn>
                <v-btn class="sign-in"  @click="toggleSI">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({}),
  methods: mapActions(["toggleSI"]),
  computed: mapGetters(["getSIDialog"])
};
</script>
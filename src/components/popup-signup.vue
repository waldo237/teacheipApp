<template>
  <v-layout row justify-center>
    <v-dialog v-model="getSUDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"><v-icon>new_releases</v-icon> New profile</span>
        </v-card-title>
  <v-card-text>
       <v-text-field
       prepend-icon="person"

      v-model="name"
      v-validate="'required|max:10'"
      :counter="10"
      :error-messages="errors.collect('name')"
      label="Name"
      data-vv-name="name"
      required
    ></v-text-field>
    <v-text-field
    prepend-icon="email"
      v-model="email"
      v-validate="'required|email'"
      :error-messages="errors.collect('email')"
      label="E-mail"
      data-vv-name="email"
      required
    ></v-text-field>
    <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
    <v-text-field prepend-icon="lock" name="repeat" label="Repeat Password" id="repeat" type="repeat"></v-text-field>

  
    <v-checkbox
      v-model="checkbox"
      v-validate="'required'"
      :error-messages="errors.collect('checkbox')"
      value="1"
      label="Option"
      data-vv-name="checkbox"
      type="checkbox"
      required
    ></v-checkbox>

  </v-card-text>
        <v-card-actions>
          <v-divider></v-divider>
          <v-btn class="sign-up"  flat @click="toggleSU">Close</v-btn>
            <v-btn @click="clear">clear</v-btn>
            <v-btn @click="submit" class="sign-in">submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import{ mapGetters, mapActions} from 'vuex';

  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  Vue.use(VeeValidate)
  export default {
    $_veeValidate: {
      validator: 'new'
    },
    data: () => ({
      name: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: null,
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters'
            // custom messages
          },
          select: {
            required: 'Select field is required'
          }
        }
      }
    }),
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    methods: {
     async submit () {
       let passed = await this.$validator.validateAll();
        if (passed) this.toggleSU();

      },
      clear () {
        
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$validator.reset()
      },
      ...mapActions(['toggleSU'])
    },
      computed: mapGetters(['getSUDialog'])
  }
</script>



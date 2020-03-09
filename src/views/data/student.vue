
<template>
  <v-container class="mb-5 pb-5">
    <!-- alternative circular loading starts -->
    <v-layout
      row
      wrap
      justify-center
      v-if="stillLoading"
      class="ma-5 pa-5"
    >
      <loading />
    </v-layout>
    <!-- alternative circular loading endsd -->
    <v-content v-else>
      <v-layout
        column
        wrap
        justify-center
        class="mb-5 pb-5 dashboard-component"
      >
        <v-btn
          outline
          @click="goBack"
          round
          color="blue darken-4 mt-5"
        >
          Volver atrás
        </v-btn>
        <v-card
         
          class="grey lighten-3 "
          flat
        >
          <v-card-title
            primary-title
            class="sign-in title  text-uppercase bigWords"
          >
            información básica de estudiante
          </v-card-title>
          <v-layout
            row
            wrap
            justify-start
            class="mx-3"
          >
            <span class="bigWords mx-1">Nombre:  </span>{{ currentStudent.name }} 
          </v-layout>
          <v-layout
            row
            wrap
            justify-start
            class="mx-3"
          >
            <span class="bigWords  mx-1">Apellido: </span>  {{ currentStudent.lastname }}
          </v-layout>
          <v-layout
            row
            wrap
            justify-start
            class="mx-3"
          >
            <span class="bigWords  mx-1">Cedula:  </span>  {{ currentStudent.cedula }}
          </v-layout>
        </v-card>
        <v-card
          flat
          class="grey lighten-3"
        >
          <v-card-title
            primary-title
            class=" title  text-uppercase bigWords"
          >
            calificaciones básico 1 =  {{ calculateTotal }} %
          </v-card-title>
          <v-layout
            row
            wrap
          >
            <v-layout
              row
              wrap
              justify-start
              class="mx-3"
            >
              <span class="bigWords mx-1">Tareas:  </span>{{ currentStudent.homework }} pts 
            </v-layout>
            <v-layout
              row
              wrap
              justify-start
              class="mx-3"
            >
              <span class="bigWords  mx-1">Participación: </span>  {{ currentStudent.classwork }} pts 
            </v-layout>
            <v-layout
              row
              wrap
              justify-start
              class="mx-3"
            >
              <span class="bigWords  mx-1">Evaluación oral:  </span>  {{ currentStudent.pba }} pts 
            </v-layout>
                    
            <v-layout
              row
              wrap
              justify-start
              class="mx-3"
            >
              <span class="bigWords  mx-1">Primer examen:  </span>  {{ currentStudent.midterm }} pts 
            </v-layout>
                    
            <v-layout
              row
              wrap
              justify-start
              class="mx-3"
            >
              <span class="bigWords  mx-1">Segundo examen:  </span>  {{ currentStudent.final }} pts 
            </v-layout>
          </v-layout>
        </v-card>
      </v-layout>
    </v-content>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import loading from "@/components/loading.vue";
export default {
 
 components: { loading },
  data() {
    return {
      currentStudent: null,
      stillLoading: true,
    };
  },
  methods: {
    ...mapActions(["fetchStudents"]),
    goBack(){
        this.$router.go(-1)
    }

  },
  computed: {
          calculateTotal(){
            
     return (!this.currentStudent)? 0 :  (this.currentStudent.homework * 0.10)+
                  (this.currentStudent.classwork * 0.10) +
                  (this.currentStudent.pba * 0.30) +
                  (this.currentStudent.midterm * 0.25) +
                  (this.currentStudent.final * 0.25)
    },
    ...mapGetters(["students"])
  },
watch:{
    currentStudent(){
         this.stillLoading = false;
    }
},
  async created() {
    await this.fetchStudents();
    this.$route.params.id;
    this.currentStudent = await this.students.find(
      student => student.id == this.$route.params.id
    );
  }
};
</script>
<style scoped>

.bigWords{
   font-family: "Bebas Neue", serif !important;
}
</style>
<template>
  <v-card>
      <!--  the policy dialogue starts-->
  
              <v-dialog v-model="policy" width="800px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Politicas de TeachEIP.com</span>
                  </v-card-title>
                    <Policy/>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="sign-up" text @click="policy = false">Disagree</v-btn>
                    <v-btn color="sign-in" text @click="policy = false">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          <!--  the policy dialogue ends-->
    <v-footer>
      <v-card flat tile width="100%" class="white--text px-5" color="#135393">
        <v-flex xl8 lg16 md12 xs8 mx-auto px-5 class="d-flex align-center">
          <v-btn
            href="http://maps.google.com/maps?q=av.+m%C3%A1ximo+g%C3%B3mez+no.+31,+esq.+pedro+henr%C3%ADquez+ure%C3%B1a,+santo+domingo,+rep%C3%BAblica+dominicana"
            target="_blank"
            flat
            class="white--text mx-auto"
          >
            <v-icon>location_on</v-icon>
            <span class="ml-2 hidden-sm-and-down subtitle-1">
              Av. Máximo Gómez No. 31, esq. Pedro Henríquez Ureña,
              Santo Domingo, República Dominicana
            </span>
          </v-btn>

          <v-btn href="tel:(809) 731 1100" target="_blank" flat class="white--text mr-5">
            <v-icon>phone</v-icon>
            <span class="ml-2 hidden-sm-and-down subtitle-1">(809) 731 1100</span>
          </v-btn>
        </v-flex>
        <v-flex xl6 lg8 md6 sm8  xs10  mx-auto class="d-flex align-center body ">
          <v-card-text class="ml-4 pl-4 pt-1 mt-1 white--text ">
            <span class="subtitle-1 credits">
               &#9400; {{ new Date().getFullYear() }} —
              <v-btn
                href="https://teacheip.com"
                target="_blank"
                flat
                class="white--text mx-1 px-1 credits"
              >TeachEIP.com</v-btn>— Dirección de Lenguas Extranjeras —
            </span>
            <v-btn
              target="_blank"
              depressed
              color="#135393"
              class="white--text credits"
              @click="policy=true"
            >Términos de Uso | Política de Privacidad</v-btn>
          </v-card-text>
        </v-flex>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
import Policy from "@/views/Useterms.vue";
export default {
    data(){
        return {
            policy: false,
        }
    },
    components:{
        Policy
    }
};
</script>
<style>

@media screen and (max-width: 960px) {

.credits{
  font-size: 85% !important;

 
}}
</style>
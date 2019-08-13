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
                    <v-btn color="green darken-1" text @click="policy = false">Disagree</v-btn>
                    <v-btn color="green darken-1" text @click="policy = false">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          <!--  the policy dialogue ends-->
    <v-footer>
      <v-card flat tile width="100%" class="white--text px-5" color="#135393">
        <v-flex xl2 mx-auto px-5 class="d-flex align-center">
          <v-btn
            href="http://maps.google.com/maps?q=av.+m%C3%A1ximo+g%C3%B3mez+no.+31,+esq.+pedro+henr%C3%ADquez+ure%C3%B1a,+santo+domingo,+rep%C3%BAblica+dominicana"
            target="_blank"
            flat
            class="white--text mx-auto"
          >
            <v-icon>location_on</v-icon>
            <span class="ml-2 hidden-sm-and-down">
              Av. Máximo Gómez No. 31, esq. Pedro Henríquez Ureña,
              Santo Domingo, República Dominicana
            </span>
          </v-btn>

          <v-btn href="tel:(809) 731 1100" target="_blank" flat class="white--text mx-auto">
            <v-icon>phone</v-icon>
            <span class="ml-2 hidden-sm-and-down">(809) 731 1100</span>
          </v-btn>
        </v-flex>
        <v-flex xl4 lg10 md8 sm10 mx-auto class="d-flex align-center body">
          <v-card-text class="ml-5 pl-5 pt-1 mt-1 white--text">
            <small class>
              {{ new Date().getFullYear() }} —
              <v-btn
                href="https://teacheip.com"
                target="_blank"
                flat
                class="white--text mx-1 px-1"
              >TeachEIP.com</v-btn>— Dirección de Lenguas Extranjeras —
            </small>
            <v-btn
              target="_blank"
              depressed
              color="#135393"
              class="white--text"
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
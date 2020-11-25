<template>
  <v-card>
    <!--  the policy dialogue starts-->
    <v-dialog
      v-model="policy"
      width="800px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Politicas de TeachEIP.com</span>
        </v-card-title>
        <!-- The policy content component -->
        <Policy />
        <!-- The policy content component -->
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="sign-up"
            text
            @click="policy = false"
          >
            Disagree
          </v-btn>
          <v-btn
            color="sign-in"
            text
            @click="policy = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  the policy dialogue ends-->
    <v-footer>
      <v-card
        flat
        tile
        width="100%"
        class="white--text px-5 bordered pt-3"
        color="#376092"
      >
        <!-- social media starts -->
        <v-layout
          row
          wrap
          justify-center
          class=" py-0 my-0 white--text "
        >
          <span class="subtitle-1 credits">
            <v-btn
              x-large
              fab
              href="https://www.facebook.com/MESCyTRD/"
              target="_blank"
              flat
              class="black white--text mx-1 px-3 credits elevation-9"
            >
               <Facebook />
            </v-btn>
          </span>
          <span class="subtitle-1 credits">
            <v-btn
              x-large
              fab
              href="https://www.instagram.com/mescytrd/?hl=en"
              target="_blank"
              flat
              class="black white--text mx-1 px-3 credits elevation-9"
            >
              <Instagram/>
            </v-btn>
          </span>

          <span class="subtitle-1 credits">
            <v-btn
              x-large
              fab
              href="https://twitter.com/mescytrd?lang=en"
              target="_blank"
              flat
              class="black white--text mx-1 px-3 credits elevation-9"
            >
             <Twitter/>
            </v-btn>
          </span>

          <span class="subtitle-1 credits">
            <v-btn
              x-large
              fab
              href="https://www.linkedin.com/company/ministerio-de-educacion-superior-ciencia-y-tecnologia/"
              target="_blank"
              flat
              class="black white--text mx-1 px-3 credits elevation-9"
            >
              
                <LinkedIn />
               
              
            </v-btn>
        
          </span>
        </v-layout>
        <!-- social media ends -->
        <!-- contacts starts -->
        <v-layout
          row
          wrap
          justify-center
        >
          <v-btn
            href="http://maps.google.com/maps?q=av.+m%C3%A1ximo+g%C3%B3mez+no.+31,+esq.+pedro+henr%C3%ADquez+ure%C3%B1a,+santo+domingo,+rep%C3%BAblica+dominicana"
            target="_blank"
            flat
            class="white--text"
          >
            <v-icon>location_on</v-icon>
            <span class=" hidden-sm-and-down subtitle-1">
              Av. Máximo Gómez No. 31, esq. Pedro Henríquez Ureña, Santo
              Domingo, República Dominicana
            </span>
          </v-btn>

          <v-btn
            href="tel:(809) 731 1100"
            target="_blank"
            flat
            class="white--text"
          >
            <v-icon>phone</v-icon>
            <span class=" hidden-sm-and-down subtitle-1">(809) 731 1100</span>
          </v-btn>
        </v-layout>
        <!-- contacts ends -->
        <v-layout
          row
          wrap
          justify-center
          class=" py-0 my-0 white--text "
        >
          <span class="subtitle-1 credits">
            &#9400; 2019-{{ new Date().getFullYear() }} —
            <v-btn
              href="https://teacheip.com"
              target="_blank"
              flat
              class="white--text mx-1 px-1 credits"
            >TeachEIP.com</v-btn>— Dirección de Lenguas Extranjeras —
          </span>
        </v-layout>
        <v-layout
          row
          wrap
          justify-center
          class=" py-0 my-0 white--text "
        >
          <span class="subtitle-1 credits">
            <v-btn
              medium
              href="https://www.linkedin.com/in/waldo-milanes-26a60410a/"
              target="_blank"
              flat
              class="black white--text mx-1 px-3 credits elevation-5"
            >
              developed and donated by Waldo Milanes<span
                class="mb-3"
              >&reg;</span>
            </v-btn>
          </span>
        </v-layout>
        <v-layout
          row
          wrap
          justify-center
        >
          <v-btn
            target="_blank"
            depressed
            color="#376092"
            class="white--text credits"
            @click="policy = true"
          >
            Términos de Uso | Política de Privacidad
          </v-btn>
        </v-layout>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
import Policy from "@/components/Useterms.vue";
import LinkedIn from '../assets/icons/linkedin'
import Facebook from '../assets/icons/facebook'
import Instagram from '../assets/icons/instagram'
import Twitter from '../assets/icons/twitter'
export default {
  data() {
    return {
      policy: false
    };
  },
  components: {
    Policy,
    LinkedIn,
    Facebook,
    Instagram,
    Twitter
  }
};
</script>
<style>
.bordered{
  border-top: 2px solid !important;
  
  border-color: black !important;
}
@media screen and (max-width: 960px) {
  .credits {
    font-size: 85% !important;
  }
}
</style>

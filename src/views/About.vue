<template>
  <div class="about">
    <v-layout id="inspire" row justify-center>
      <div style="display: inline-block;   width: 70%;">
        <div
          style="background-color:rgb(19,83,147);box-shadow:0 8px 16px 0 rgba(0,0,0,0.281), 0 12px 30px 0 rgba(0,0,0,0.281);text-align:justify;line-height:1.3;"
        >
            <v-layout justify-space-around>
        <v-flex xs5>
          <v-layout column>
            <transition name="img">
            <v-img src="https://media.giphy.com/media/LnEuDtpBRuQNIPU2ZD/giphy.gif" aspect-ratio="1.9"  alt="We bring change!"
            class="img"></v-img>

            </transition>
          </v-layout>
        </v-flex>
        </v-layout>
         
 
          <transition name="para-in" enter-active-class="bounce-in" leave-active-class="bounce-in">

          <p style="color:white;font-size:80%;padding:3%;" class="para">
            The English Immersion Program has had an
            exponential
            growth since its creation in 2004. It operates nationwide even in very remote areas. This platform allows
            Administrators and teachers to find resources and share ideas. Thus, it helps us maintain consistency, and
            standardization.
          </p>
          </transition>
            <p v-for="(employee,i) in employees" :key="i">{{employee.name}} <router-link 
            class="secondary-content"
            v-bind:to="{name: 'dashboard', params:{id: employee.id}}">
            <v-icon>remove_red_eye</v-icon>
            </router-link> </p>
        </div>
      </div>
    </v-layout>
  </div>
</template>
<script>
import db from  '../components/firebaseInit';

export default {
data(){
  return{
    employees: []
  }
},
created () {
  db.collection('Employees').get().then(querySnapshot =>{
    querySnapshot.forEach(doc =>{
      const data = {
        'id': doc.id,
        'name': doc.data().name,
        'email': doc.data().email,
        'position': doc.data().position,
        'level': doc.data().level,
      
      }
      this.employees.push(data);
})
    
  })
}

}

</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
.img{
filter:brightness(50%);
box-shadow:0 14px 20px 0 rgba(0,0,0,0.425), 0 18px 34px 0 rgba(0,0,0,0.480);

 
}
.img:active{
  animation-duration: 4s;
  animation-name: hinge;

}

/* The animation code */


.para:hover{
animation-duration: 1s;
  animation-name:wobble ;
  display: block;
  font-size: 40px;
  color: white;

}

@keyframes bounce-in{
0%{
  transform: scale(0);
}
50%{
  transform: scale(1.5);
}
100%{
  transform: scale(1);
}
}
</style>

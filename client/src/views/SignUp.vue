<template>
    <div class="signup" >
      <loginnavbar class="loginnavbar-bg"></loginnavbar>
      <div class="v-application__wrap">
      <h1 class="text-center my-3 textsignup">
      註冊
      </h1>
      <v-row class="mt-2">
        <v-col class="d-flex justify-center"
          xs="12"
        >
        <signupinput class="signupinput"></signupinput>
        </v-col>
      </v-row>
    </div>
    </div>
  </template>
  
  <script>
  
  
  // Components
  import loginnavbar from '@/components/loginnavbar.vue';
  import signupinput from '@/components/signup.vue';
  export default {
    name: 'signup',
    components: {loginnavbar,signupinput },
    data: () => ({
      //
    }),
  }
  </script>
  
  <style>
  .signup {
  background-image: url('../assets/login背景.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
loginnavbar-bg {
  height: 100px; 
  background-color: rgba(0, 0, 0, 0); 
}

.signupinput {
  padding-left: 800px;
}
.textsignup {
  padding-left: 775px;
}
@media screen and (max-width: 600px) {
  .signupinput {
    padding-left: 15px;
  }

  .textsignup {
    padding-left: 3px;
    color: white;
  }

  .signup {
  background-image: url('../assets/login背景-phone2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
}

  
  
  </style>
<template>
    <div class="signup" >
      <loginnavbar class="signinnavbar-bg"></loginnavbar>
      <v-row class="">
        <v-col
          class="d-flex justify-center"
          xs="12"
        >
        <signupinput class="signupinput"></signupinput>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  
  
  // Components
  import loginnavbar from '@/components/loginnavbar.vue';
  import signupinput from '@/components/signup.vue';
  export default {
    name: 'signup',
    components: {signupinput , loginnavbar},
    data: () => ({
      //
    }),
  }
  </script>
  
  <style>
  .signup {
    background-image: url('../assets/登入頁面第二版.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height:100%;
    overflow-y: hidden;
    overflow: hidden;
}
.signinnavbar-bg {
  height: 100px; 
  background-color: rgba(0, 0, 0, 0); 
  position: absolute; 
}
.signupinput {
  position: absolute;
  padding-top: 4%;
  left: 60%;
  transform: scale(0.95);
}
@media screen and (max-width: 600px) {
  .signupinput {
    margin-top: 72%;
    transform: scale(0.75) translateX(-79%);
  }
  .signup {
    background-image: url('../assets/登入畫面手機背景.jpg');
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
  overflow-y: hidden
}
}

@media screen and (min-width: 601px) and (max-width: 1024px) {
  .signupinput {
    transform: scale(1) translateX(-47%);
    margin-top: 20%;
  }

  .signup {
    background-image: url('../assets/background.jpg');
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
    overflow-y: hidden
}
}  

@media screen and (min-width: 768px) and (max-width: 1200px) and (orientation: landscape) {
  .signupinput {
    position: absolute;
    transform:  scale(0.95) translateX(-7%);
    margin-top: 7%;
  }


  .signup {
    background-image: url('../assets/登入頁平板背景.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height:100%;
    overflow-y: hidden;
    overflow: hidden;
}
}
  
  </style>
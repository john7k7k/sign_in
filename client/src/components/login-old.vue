<template>
    <div class="login">
      <loginnavbar class="loginnavbar-bg"></loginnavbar>
      <div class="v-application__wrap">
        <h1 class="text-center my-3 text-white">
          Sign In
        </h1>
        <logininput></logininput>
      </div>
    </div>
  </template>
  
  <script>
  // Components
  import loginnavbar from '@/components/loginnavbar.vue';
  import logininput from '@/components/logininput.vue';
  export default {
    name: 'login',
    components: { loginnavbar, logininput },
    data: () => ({
      //
    }),
  };
  </script>
  
  <style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    height: 100%;
  }
  .login {
    background-image: url('https://img.freepik.com/free-vector/beautiful-world-ocean-day-background-with-deep-blue-sea-aquatic-life_1017-44445.jpg?w=996&t=st=1689818158~exp=1689818758~hmac=6b86ea8ba8adfd5b2c8e282991115bb1d2ef8c8b1d936b40faa0c21407890af0');
    
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
  .loginnavbar-bg {
    height: 100px; 
    background-color: rgba(0, 0, 0, 0); 
  }
  .cardbg {
  background-image: url('../assets/登入框.png');
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 9px;
  background-color: rgba(255, 255, 255, 0.01); 
  backdrop-filter: blur(1px);
}
  .cardbg {
  background-image: url('../assets/登入框.png');
  background-position: center;
  background-size: 100% 99.7%;
  border-radius: 9px;
  background-color: rgba(255, 255, 255, 0.01); 
  backdrop-filter: blur(1px);
}

.cardbg {
  border-radius: 9px;
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(5px);
  border: 1.2px solid rgba(255, 255, 255, 0.2);
}
  
  </style>
  
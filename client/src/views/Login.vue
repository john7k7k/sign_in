<template>
  <div class="login">
    <loginnavbar class="loginnavbar-bg"></loginnavbar>
      <v-row class="">
        <v-col
          class="d-flex justify-center"
          xs="12"
        >
          <logininput class="logininput"></logininput>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import loginnavbar from '@/components/loginnavbar.vue';
import logininput from '@/components/logininput.vue';
export default {
  name: 'login',
  components: { logininput ,loginnavbar},
  data: () => ({
    //
  }),
};
</script>

<style>

.login {
  background-image: url('../assets/登入頁面第二版.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height:100%;
  overflow-y: hidden;
  overflow: hidden;
}
.loginnavbar-bg {
  height: 100px; 
  background-color: rgba(0, 0, 0, 0); 
  position: absolute;
}

.logininput {
  position: absolute;
  padding-top: 9%;
  left: 60%;
}

@media screen and (max-width: 600px) {
  .logininput {
    transform: scale(0.75) translateX(-79%) translateY(53%);
  }


  .login {
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
  .logininput {
    padding-left: 25%;
    transform: scale(1.5);
    margin-top: 25%;
  }

  .login {
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
  .logininput {
    padding-left: 400px;
    position: absolute;
    transform: translateX(12%) scale(1.1);
    margin-top: 7%;
  }


  .login {
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

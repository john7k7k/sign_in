<template>
  <div class="login">
    <loginnavbar class="loginnavbar-bg"></loginnavbar>
    <div class="v-application__wrap">
      <h1 class="text-center mr-15 text2">
        仿生魚監控站
      </h1>
      <v-row class="mt-2">
        <v-col
          class="d-flex justify-center"
          xs="12"
        >
          <logininput class="logininput"></logininput>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
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
.login {
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
.loginnavbar-bg {
  height: 100px; 
  background-color: rgba(0, 0, 0, 0); 
}

.logininput {
  padding-left: 800px;
}
.text2 {
  padding-left: 850px;
}

@media screen and (max-width: 600px) {
  /* Apply styles only for mobile screens */
  .logininput {
    padding-left: 15px;
  }

  .text2 {
    padding-left: 60px;
    color: white;
  }

  .login {
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

<template>
  <v-app   class="App">
    
    <v-main class="main">
      <meta name=”viewport” content="width=device-width, initial-scale=1.0">
      <link rel="icon" type="image/png" href="img/NTUT-Logo.png">
        <title>仿生魚監控站</title>
      <router-view/>
    </v-main >
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {  },
  data: () => ({
    //
  }),
}
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
.main{
  margin: 0;
  padding: 0;
  background-color: black;
  font-family: PingFangTC-Semibold, sans-serif !important;
}
*,*::after{
  box-sizing:border-box;
}
.img{
  max-width: 100%;
  height: auto;
}
</style>



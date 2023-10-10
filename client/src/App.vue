<template>
  <v-app   class="App">
    
    <v-main class="main">
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
</style>



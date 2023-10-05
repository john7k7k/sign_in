<template>
  <v-app   class="App">
    <meta property="og:url"                content="http://20.89.131.34/login" />
    <meta property="og:type"               content="article" />
    <meta property="og:title"              content="仿生魚監控站" />
    <meta property="og:description"        content="" />
    <meta property="og:image"              content="https://news-data.pts.org.tw/media/125928/cover.jpg" />
    <v-main class="main">

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
  background-color: black;
  font-family: PingFangTC-Semibold, sans-serif !important;
}
</style>



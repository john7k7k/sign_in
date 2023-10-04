<template>
  <div class="Fishdatas" >
    <navbar></navbar>
    <fishdata></fishdata>
  </div>
</template>

<script>


// Components
import fishdata from '@/components/fishdata.vue';
import navbar from '@/components/Navbar.vue'
export default {
  name: 'Fishdatas',
  components: {fishdata ,navbar},
  data: () => ({
    //
  }),
}
</script>

<style scoped>
.Fishdatas {
  z-index: 0;
  background-image: url('../assets/魚資料背景.png');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-attachment: fixed;
}

</style>
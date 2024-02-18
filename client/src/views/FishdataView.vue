<template>
  <div class="Fishdatas" >
    <navbar></navbar>
    <fishdata class="fishdata"></fishdata>
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
  background-image: url('../assets/編輯魚bg.jpg');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-attachment: fixed;
}
.fishdata{
  margin-top: 5%;
}
@media screen and  (min-width: 601px) and (max-width: 1024px){
  .fishdata{
  margin-top: 8%;
}
}
@media screen and (min-width: 401px) and (max-width: 600px){
  .fishdata{
  margin-top: 12%;
}
}
@media screen and (max-width: 400px) {
  .fishdata{
  margin-top: 12%;
}
}

</style>
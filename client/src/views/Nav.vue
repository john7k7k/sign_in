<template>
  <div class="home">
    
    <Navbar></Navbar>
    <router-view/>
  </div>

</template>

<script>


// Components
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'home',
  components: { Navbar},
  data: () => ({
    //
  }),
}
</script>

<style>


</style>
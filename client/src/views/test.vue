<template>
    <div class="test">
      
      <Navbar></Navbar>
      <router-view/>
    </div>
  
  </template>
  
  <script>
  
  
  // Components
  import Navbar from '@/components/test.vue';
  
  export default {
    name: 'test',
    components: { Navbar},
    data: () => ({
      //
    }),
  }
  </script>
  
  <style>
  
  
  </style>
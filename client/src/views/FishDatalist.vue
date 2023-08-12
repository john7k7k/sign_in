<template>
    <div class="FishDatalist">
        <Fishlist2></Fishlist2>
        <Fishlist3></Fishlist3>
    </div>
  
  </template>
  
  <script>
  import Fishlist2 from '@/components/Fishlist2.vue';
  import Fishlist3 from '@/components/Fishlist3.vue';
  export default {
    name: 'FishDatalist',
    components: {Fishlist2,Fishlist3, },
    data: () => ({
      //
    }),
  }
  </script>
  
  <style>
  
  
  </style>
  
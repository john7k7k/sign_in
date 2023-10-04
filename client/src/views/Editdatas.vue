<template>
    <div class="editdatas">
    <navbar></navbar>
    <Editfishdata></Editfishdata>
    </div>
  
  </template>
  
  <script>
import Editfishdata from '@/components/Editfishdata2.vue';
import navbar from '@/components/Navbar.vue'
  
  export default {
    name: 'editdatas',
    components: { Editfishdata,navbar},
    data: () => ({
      //
    }),
  }
  </script>
  
  <style scoped>
  .editdatas{
  z-index: 0;
    background-image: url('../assets/編輯魚bg.jpg');
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
    overflow-y: hidden;
    overflow-x: hidden;
}
  
  </style>
  
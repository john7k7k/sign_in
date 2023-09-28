<template>
    <div class="selectinstruction" >
        <Navbar></Navbar>
        <v-img src="../assets/過渡頁面字.png" class="titelword  "></v-img>
        <selectInstruction></selectInstruction>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import selectInstruction from '@/components/selectInstruction.vue'
  export default {
    name: 'selectinstruction',
    components: {Navbar,selectInstruction},
    data: () => ({
      //
    }),
  }
  </script>
  
  <style scoped>
  .selectinstruction {
    z-index: 0;
    background-image: url('../assets/過渡畫面背景.jpg');
    background-size: cover;
    background-position: top;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
  }
  .titelword{
    transform: scale(0.3);
    right: 33.2%;
    bottom: 3%;
  }
  @media screen and (max-width: 600px){
    .selectinstruction {
    z-index: 0;
    background-image: url('../assets/過渡畫面背景.jpg');
    background-size: cover;
    background-position: top;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
  }
  .titelword{
    transform: scale(0.4);
    right: 2%;
    bottom: 3%;
  }
  }
  
  </style>
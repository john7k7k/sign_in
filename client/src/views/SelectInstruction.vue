<template>
    <div class="selectinstruction" >
        <Navbar class="navbar"></Navbar>
        
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
  .navbar{
    position: absolute;
  }
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
  @media screen and (max-width: 600px){
    .selectinstruction {
    z-index: 0;
    background-image: url('../assets/過渡畫面手機背景2.png');
    background-size: cover;
    background-position: top;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
  }
  }
  
  </style>
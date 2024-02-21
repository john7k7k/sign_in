<template>
    <div class="editdatas">
    <navbar></navbar>
    <Editfishdata ></Editfishdata>
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
    overflow-x: hidden;
}
@media screen and  (min-width: 1025px) and (max-width: 1680px){
}
@media screen and  (min-width: 601px) and (max-width: 1024px){
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
    overflow-x: hidden;
}
}
@media screen and (min-width: 401px) and (max-width: 600px){
}
@media screen and (max-width: 400px) {}
@media screen and (max-width: 600px) {
  .editdatas{
  z-index: 0;
    background-image: url('../assets/編輯魚畫面手機背景2.png');
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
    overflow-x: hidden;
}
}
  
  </style>
  
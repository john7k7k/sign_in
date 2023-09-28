<template>
    <div class="error">
        
    <Test></Test>
    </div>
  
  </template>
  
  <script>
  import Test from '../components/404.vue'
  
  export default {
    name: 'error',
    components: {Test },
    data: () => ({
      //
    }),
  }
  </script>
  
  <style >
  .error {
  background-image: url('../assets/白色背景.png');
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
  overflow-y: hidden
}
  </style>
  
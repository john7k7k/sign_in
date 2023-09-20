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
  .error{
    background-color: white;
  }
  </style>
  
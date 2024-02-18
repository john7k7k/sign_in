<template>
    <div class="Accountlist">
      <Accounts ></Accounts>
    </div>
  
  </template>
  
  <script>
  import Accounts from '@/components/accountlist.vue';
  
  export default {
    name: 'Accountlist',
    components: { Accounts},
    data: () => ({
      //
    }),
  }
  </script>
  
  <style>
  
  </style>
  
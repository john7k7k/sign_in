<template>
    <div class="Accountlist">
      <Accounts></Accounts>
      <Accounts2></Accounts2>
      <Accounts3></Accounts3>
    </div>
  
  </template>
  
  <script>
  import Accounts from '@/components/accountlist.vue';
  import Accounts2 from '@/components/accountlist2.vue';
  import Accounts3 from '@/components/accountlist3.vue';
  
  export default {
    name: 'Accountlist',
    components: { Accounts,Accounts2,Accounts3},
    data: () => ({
      //
    }),
  }
  </script>
  
  <style>
  
  
  </style>
  
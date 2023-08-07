<template>
    <div class="Accountlist">
      <Accounts></Accounts>
      <Accounts2 v-show="false"></Accounts2>
    </div>
  
  </template>
  
  <script>
  import Accounts from '@/components/accountlist.vue';
  import Accounts2 from '@/components/accounlist2.vue';
  // Components
  
  export default {
    name: 'Accountlist',
    components: { Accounts,Accounts2},
    data: () => ({
      //
    }),
  }
  </script>
  
  <style>
  
  
  </style>
  
<template>
    <Navbar></Navbar>
    <maintenanceList></maintenanceList>
</template>

<style scoped>


</style>

<script>
import maintenanceList from '@/components/maintenanceList.vue';
import Navbar from '@/components/Navbar.vue';
export default {
  name: 'Maintenance',
  components: {maintenanceList,Navbar},
  data: () => ({
    //
  }),
};
</script>



<template>
    <Navbar></Navbar>
    <div class="Box">
      <maintenanceList></maintenanceList>
    </div>
</template>

<style scoped>
.Box {
  width: 95%;
  height: auto;
  display: flex;
  flex-direction: column;
}

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



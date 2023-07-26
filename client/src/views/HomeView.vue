<template>
  <div class="home">
    <totaldata></totaldata>
    <totaldata3 v-show="SeaSections"></totaldata3>
  </div>

</template>

<script>
  // 导入组件
  import totaldata from '@/components/totaldata.vue';
  import totaldata3 from '@/components/totaldata-3.vue';

  export default {
    name: 'home',
    components: { totaldata, totaldata3 },
    data() {
      return {
        sectionvalue: localStorage.getItem('UserSection'),
        SeaSections: true,
      };
    },
    methods: {
      section() {
        if (this.sectionvalue == "001" || this.sectionvalue == "003") {
          this.SeaSections = true;
        } else {
          this.SeaSections = false;
        }
      },
    },
    
    mounted() {
      this.section();
    },
  };
</script>




<style>


</style>

<template>
  <div class="home">
    <totaldata v-show="NTUTSections"></totaldata>
    <totaldata3 v-show="SeaSections"></totaldata3>
  </div>

</template>

<script>
  import totaldata from '@/components/totaldata.vue';
  import totaldata3 from '@/components/totaldata-3.vue';

  export default {
    name: 'home',
    components: { totaldata, totaldata3 },
    data() {
      return {
        sectionvalue: localStorage.getItem('UserSection'),
        SeaSections: false,
        NTUTSections: false,
        FishId2:[],
        bc2:[],
        err2:[],
        active2:[],
      };
    },
    created() {
    this.section();
    },
    methods: {
      section() {
        if (this.sectionvalue == "001") {
          this.SeaSections = true;
          this.NTUTSections = true;
        }else if (this.sectionvalue == "002") {
          this.NTUTSections = true;
          this.SeaSections = false;
        } else {
          this.NTUTSections = false;
          this.SeaSections = true;
        }
      },
      
    },
  };
</script>




<style>


</style>

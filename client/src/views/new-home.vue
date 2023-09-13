<template>
    <div class="home">
      <p class="logowords d-flex justify-center mt-5 text-blue">BIONICFISH</p>
      <p class="logowords2 d-flex justify-center  text-blue">監控站</p>
      <totaldata v-show="NTUTSections"></totaldata>
    </div>
  
  </template>
  
  <script>
    import totaldata from '@/components/totaldata.vue';
  
    export default {
      name: 'home',
      components: { totaldata,  },
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
  
  
  
  
  <style >
  .home,.v-application__wrap{
    background-color: black;
  }
  .logowords{
    font-size: 50px;
  }
  .logowords2{
    font-size: 30px;
  }
  </style>
  
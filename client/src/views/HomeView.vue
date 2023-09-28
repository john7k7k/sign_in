<template>
    <div class="home">
        <navbar></navbar>
      <div class="titelText text-white ">仿生魚監控管理系統 </div>
        <v-text-field
          v-if="false"
          class="searchinput mt-2"
          rounded="pill"
          density="compact"
          variant="solo"
          label="搜尋水池"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="onClick"
          style=""
        ></v-text-field>
        <totaldata ></totaldata>
    </div>
  
  </template>
  
  <script>
    import { Swiper } from '@/swiper/Swiper';
    import totaldata from '@/components/totaldataCard.vue';
    import navbar from '@/components/Navbar.vue'
    export default {
      name: 'home',
      components: { totaldata, navbar },
      data(){
          return{
                imageUrl:[
                    require("../assets/card.png"),
                ],
                classlist:["three","four","two",],
                showButtons: false,
          }
      },
      methods:{
          swiper(){
              this.swiperInstance = new Swiper({
              classList: this.classlist,
              SwiperContent: ".Swiper-content",
          });
          },
          leftSwipe() {
              this.swiperInstance.__leftMove();
          },
          rightSwipe() {
              this.swiperInstance.__rightMove();
          },
  
  
      },
    };
  </script>
  
  <style scoped>
  .home{
    z-index: 0;
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .titelText{
      position: relative;
      font-size: 50px;
      width: 100%;
      top: 0.5%;
      text-align: center;
      
  }
  .searchinput {
    width: 30%; 
    height: 1%;
    position: relative;
    left: 50%;
    transform: translateX(-50%) scale(0.8);
  }
  .Swiper{
      height: 100%;
      width: 100%;
      position: relative;
      margin: 70px auto;
  }
  
  .Swiper-content{
      height: 100%;
      width: 100%;
      
  }
  
  .Swiper-content div{
      position: absolute;
  }
  .Swiper-item  {
      max-width: 100%; 
      max-height: 100%; 
      width: auto; 
      height: auto; 
      display: block; 
      transform: translateY(-50px);
  }
  .two{
      z-index: 2;
      transform: scale(0.9) translateY(-33px);
      left: -475px;
      
  }
  .three{
      z-index: 9;
      transform:translateX(50%) scale(1) translateY(-33px);
  }
  .four{
      z-index: 2;
      transform: scale(0.9) translateY(-33px);
      right: -475px;
  }

  @media screen and (max-width: 600px) {
    .home{
    z-index: 0;
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
    .titelText{
      position: relative;
      width: 100%;
      top: 2%;
      bottom: 8%;
      text-align: center;
      transform: scale(0.8);
      font-size: 35px;
      
  }
  .searchinput {
    width: 60%; 
    height: 1%;
    position: relative;
    top:1%;
    bottom: 3%;
    left: 50%;
    transform: translateX(-50%) scale(0.8);
  }
  }
  @media screen and (min-width: 601px) and (max-width: 1024px){
    .home{
    z-index: 0;
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  }
  @media screen and (min-width: 768px) and (max-width: 1200px) and (orientation: landscape) {
    .home{
    z-index: 0;
    background-image: url('../assets/background.jpg');
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  }
  
  </style>
  
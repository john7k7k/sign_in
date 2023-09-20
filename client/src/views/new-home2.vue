<template>
    <div class="home">
      <div class="titelText">仿生魚監控站 </div>
        <v-text-field
        class="searchinput mt-2"
          density="compact"
          variant="solo"
          label="搜尋水池"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="onClick"
          style="width: 30%;"
        ></v-text-field>
      <div class="Swiper" @mouseenter="showButtons = true"
        @mouseleave="showButtons = false">
      <v-btn class="leftbutton ml-5" v-if="showButtons"  @click="leftSwipe" icon="mdi mdi-chevron-left"></v-btn>
      <v-btn class="rightbutton mr-5" v-if="showButtons"  @click="rightSwipe()" icon="mdi mdi-chevron-right"></v-btn>
      <div class="Swiper-content" >
          <div class="Swiper-item" v-for="(item,index) in 3" :key="index">
              <totaldata ></totaldata>
          </div>
      </div>
  </div>
    </div>
  
  </template>
  
  <script>
    import { Swiper } from '@/swiper/Swiper';
    import totaldata from '@/components/totaldata.vue';
  
    export default {
      name: 'home',
      components: { totaldata,  },
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
      mounted(){
          this.swiper();
      }
    };
  </script>
  
  <style scoped>
  .titelText{
      position: relative;
      font-size: 50px;
      font-family: "YouYuan";
      width: 100%;
      top: 5px;
      text-align: center;
      
      color: black;
  }
  .searchinput {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 360px;
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
  
  .leftbutton {
      z-index: 10; /* 設置 z-index 為 10 */
      position: fixed; /* 使用 fixed 定位，以便在螢幕上保持固定位置 */
      left: 0; /* 將元素的左側靠近螢幕的左邊 */
      top: 60%; /* 垂直位置在螢幕中間的上側 */
      transform: translateY(-50%); /* 使用 transform 將元素垂直居中 */
  }
  
  .rightbutton{
      z-index: 10; /* 設置 z-index 為 10 */
      position: fixed; /* 使用 fixed 定位，以便在螢幕上保持固定位置 */
      right: 0; /* 將元素的左側靠近螢幕的左邊 */
      top: 60%; /* 垂直位置在螢幕中間的上側 */
      transform: translateY(-50%); /* 使用 transform 將元素垂直居中 */
  }
  
  </style>
  
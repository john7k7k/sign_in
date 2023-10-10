<template>
    <div class="font-weight-black text-white titel-Name">{{ titel }}</div>
    <div class=" text-white en-titelName" style="white-space: pre-wrap;">{{ entitel }}</div>
    <v-btn variant="elevated" class="mb-10 loginbuttom"  width="150" href="/home"></v-btn>
     <div class="Swiper" @mouseenter="showButtons = true"
          @mouseleave="showButtons = false">
        <v-btn class="upbutton " v-if="showButtons"  @click="leftSwipe" icon="mdi mdi-chevron-up"></v-btn>
        <v-btn class="downbutton " v-if="showButtons"  @click="rightSwipe" icon="mdi mdi-chevron-down"></v-btn>
        <div class="Swiper-content" >  
          <v-card v-for="name in instructionName" :key="name" class="Swiper-item" width="400" variant="elevated">
              <v-img
              :src="name.imageurl"
              class="align-end"
              height="250px"
              cover>
              <div class="text-white  ml-5 text-h5 font-weight-black">{{ name.instruction }}</div>
              <div class="text-white mb-16 ml-5 text-h6 font-weight-black" style="white-space: pre-wrap; width: 60%;"> {{name.Eninstruction}} </div>
              </v-img>
          </v-card>   
        </div>
    </div>
    </template>
    
    <script>
    import { Swiper } from '@/swiper/Swiper';
      export default {
        data: () => ({
          classlist:["two","three","one",],
          showButtons:false,
          instructionName:[
              {
                  instruction:"台北科技大學",
                  Eninstruction:"National Taipei University of Technology",
                  imageurl: require("../assets/機構北科.png")
              },
              {
                  instruction:"海科館",
                  Eninstruction:"Museum of Marine Science and Technology",
                  imageurl: require("../assets/機構海科.png")
              },
              {
                  instruction:"海科館",
                  Eninstruction:"Museum of Marine Science and Technology",
                  imageurl: require("../assets/機構海科.png")
              }
          ],
          titel:"",
          entitel:"",
          centercardNum:0
        }),
        mounted(){
            this.swiper();
        },
        methods: {
          swiper(){
                this.swiperInstance = new Swiper({
                classList: this.classlist,
                SwiperContent: ".Swiper-content",
            });
            this.titel = this.instructionName[this.centercardNum].instruction;
            this.entitel = this.instructionName[this.centercardNum].Eninstruction;
            },
          leftSwipe() {
            if(this.centercardNum !== this.instructionName.length-1)this.centercardNum += 1;
                else this.centercardNum = 0;
                
                this.titel = this.instructionName[this.centercardNum].instruction;
                this.entitel = this.instructionName[this.centercardNum].Eninstruction;
                this.swiperInstance.__leftMove();
            },
          rightSwipe() {
            if(this.centercardNum !== 0)this.centercardNum -= 1;
                else this.centercardNum = this.instructionName.length-1;
                this.titel = this.instructionName[this.centercardNum].instruction;
                this.entitel = this.instructionName[this.centercardNum].Eninstruction;
                this.swiperInstance.__rightMove();
            },
        }
      }
    </script>
  
    <style scoped>
  .one{
        z-index: 2;
        position: absolute;
        transform: scale(1) ;
        top: 4%;
        left: 60%;
        width: 50%;
    }
    .two{
        z-index: 9;
        position: absolute;
        transform: scale(1.2) ;
        top: 42%;
        left: 60%;
        width: 50%;
    }
    .three{
        z-index: 2;
        position: absolute;
        transform: scale(1) ;
        top: 79%;
        left: 60%;
        width: 50%;
    }
    .forIpadcenter{
      margin-top: -30%;
      margin-left: 55%;
        position: relative;
        transform: scale(1);
        width: 100%;
    }
    .forIpadcenter + .forIpadcenter {
        margin-top: 1.5%; 
    }
    .upbutton {
        z-index: 10; 
        position: fixed; 
        left: 71%;
        top: 3%; 
    }
    
    .downbutton{
        z-index: 9; 
        position: fixed; 
        left: 71%;
        bottom: 2%;
    }
    .titel-Name{
      font-size: 60px;
      position: absolute;
      left: 2.3%;
      top: 45%;
      letter-spacing: 7px;
    }
    .en-titelName{
      font-size: 35px;
      position: absolute;
      left: 2.5%;
      top: 58%;
      width: 30%;
    }
    .loginbuttom{
      border-radius: 80px;
      background-image: url('../assets/查看鈕改.png');
      background-position: center;
      background-size: 101% 101%;
      transform: scale(1.1);
      left: 3.5%;
      top: 22%;
  }
  @media screen and (max-width: 600px){
    .one {
        display: none;
    }
    .two {
        margin-top: -10%;
        position: relative;
        transform: scale(0.8) translateX(-74%);
        width: 100%;
    }
  
    .two + .two {
        margin-top: -10%; 
    }
    .three{
      margin-top: -5%;
        position: relative;
        transform: scale(0.8);
        width: 100%;
    }
    .upbutton {
        display: none;
    }
    
    .downbutton{
        display: none;
    }
    .titel-Name{
      display: none;
    }
    .en-titelName{
      display: none;
    }
    .loginbuttom{
      border-radius: 80px;
      background-image: url('../assets/查看鈕改.png');
      background-position: center;
      background-size: 101% 101%;
      left: 28%;
      top: -2%;
      transform: scale(1);
  }
  }
  @media screen and (min-width: 768px) and (max-width: 1200px) and (orientation: landscape){
    .titel-Name{
      font-size: 60px;
      position: absolute;
      left: 2.3%;
      top: 40%;
      letter-spacing: 7px;
    }
    .en-titelName{
      font-size: 35px;
      position: absolute;
      left: 2.5%;
      top: 52%;
      width: 50%;
    }
    .loginbuttom{
      border-radius: 80px;
      background-image: url('../assets/查看鈕改.png');
      background-position: center;
      background-size: 101% 101%;
      left: 3.5%;
      top: 40%;
      transform: scale(1.1);
  }
  }
  </style>
  
  
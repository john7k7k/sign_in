<template>
    <div class="home" :style="{ backgroundImage: `url(${poolsdata[centerIndex%3].imageurl})` }">
        <navbar class="item"></navbar>
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
        <v-btn class="upbutton ml-5" v-if="showButtons && poolsName.length > 1"  @click="triggerLeftSwipe" icon="mdi mdi-chevron-up" @mouseenter="showButtons = true"
        @mouseleave="showButtons = false"></v-btn>
        <v-btn class="downbutton mr-5" v-if="showButtons && poolsName.length > 1"  @click="triggerRightSwipe" icon="mdi mdi-chevron-down" @mouseenter="showButtons = true"
        @mouseleave="showButtons = false"></v-btn>
        <totaldata class="item" :centerIndex="centerIndex" ref="totaldataRef" @mouseenter="showButtons = true"
        @mouseleave="showButtons = false"></totaldata>
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
                poolsName:JSON.parse(localStorage.getItem("PoolsName")),
                poolsdata:[
                            {
                                EnPoolName:"CSL Pool",
                                imageurl: require("../assets/主頁魚池33.png")
                            },
                            {
                                EnPoolName:"",
                                imageurl: require("../assets/主頁魚池22.png")
                            },
                            {
                                EnPoolName:"",
                                imageurl: require("../assets/主頁魚池11.png")
                            }
                        ],
                centerIndex:0,
          }
      },
      methods:{
          swiper(){
              this.swiperInstance = new Swiper({
              classList: this.classlist,
              SwiperContent: ".Swiper-content",
          });
          },
          triggerLeftSwipe() {
            if(this.centerIndex !== this.poolsName.length-1) this.centerIndex += 1;
              else this.centerIndex = 0;
            
            this.$refs.totaldataRef.leftSwipe();
          },
          triggerRightSwipe() {
            if(this.centerIndex !== 0) this.centerIndex -= 1;
            else this.centerIndex = this.poolsName.length-1;
            this.$refs.totaldataRef.rightSwipe();
          },
  
  
      },
    };
  </script>
  
  <style scoped>
  .home::before {
    content: "";
    background-color: rgba(0, 0, 0, 0.65); 
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1; 
}
  .home{
    z-index: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .item{
    z-index: 2;
  }
  .titelText{
      z-index: 2;
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
  .upbutton {
      z-index: 10; 
      position: fixed; 
      left: 20%;
      top: 10%; 
  }
  
  .downbutton{
      z-index: 10; 
      position: fixed; 
      left: 20%;
      bottom: 4%;
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
  
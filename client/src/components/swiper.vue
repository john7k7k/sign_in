<template>
<div class="titelText">仿生魚監控站 </div>
<div class="Swiper" @mouseenter="showButtons = true"
      @mouseleave="showButtons = false">
    <v-btn class="leftbutton ml-5" v-if="showButtons"  @click="leftSwipe" icon="mdi mdi-chevron-left"></v-btn>
    <v-btn class="rightbutton mr-5" v-if="showButtons"  @click="rightSwipe()" icon="mdi mdi-chevron-right"></v-btn>
    <div class="Swiper-content" >
        <div class="Swiper-item" v-for="(item,index) in imageUrl" :key="index">
            <div><totaldata ></totaldata></div>
            
        </div>
    </div>
</div>
<totaldata v-if="false"></totaldata>
</template>

<script>
import { Swiper } from '@/swiper/Swiper';
import totaldata from '@/components/totaldataCard.vue';
export default{
    name: 'Swiper', 
    components: { totaldata},
    data(){
        return{
            imageUrl:[
                require("../assets/card.png"),
            ], 
            classlist:["two","three","four"],
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
}

</script>




<style scoped>
.titelText{
    position: absolute;
    font-size: 50px;
    font-family: "YouYuan";
    width: 100%;
    top: 20px;
    text-align: center;
    letter-spacing: 8px;
    color: white;
    text-shadow: 0 0 0px #fff,0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff700,
    0 0 20px #00ffd5, 0 0 30px #00eeff, 0 0 40px #00ffff, 0 0 50px #00fff2;
}
.Swiper{
    height: 100%;
    width: 100%;
    position: relative;
    margin: 200px auto;
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
}
.two{
    z-index: 2;
    transform: scale(0.9);
    left: -275px;
    
}
.three{
    z-index: 9;
    transform:translateX(50%) scale(1);
}
.four{
    z-index: 2;
    transform: scale(0.9);
    right: -275px;
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
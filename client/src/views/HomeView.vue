<template>
    <div class="home">
      <div class="titelText text-white ">仿生魚監控站 </div>
        <v-text-field
          class="searchinput mt-2"
          rounded="pill"
          density="compact"
          variant="solo"
          label="搜尋水池"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="onClick"
          style="width: 30%; height: 12px;"
        ></v-text-field>
                <totaldata ></totaldata>
    </div>
  
  </template>
  
  <script>
    import axios from 'axios';
    import { Swiper } from '@/swiper/Swiper';
    import totaldata from '@/components/totaldataCard.vue';
  
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
                FishId: [],
                FishId2num:null,
                FishIdNow:[],
                needchargenum:[],
                needfixnum:[],
                bc: [],
                err: [],
                active: [],
                token:localStorage.getItem('token'),
                time: localStorage.getItem("NewTime"),
                links: [ 
                { icon: 'mdi-fishbowl', text: ".", color: 'indigo-darken-1', textname: "游動中",level:1,alertbcbutton:false,alerterrbutton:false,linetext:"swimming"},
                { icon: 'mdi mdi-fish-off', text: ".", color: 'orange-darken-2', textname: "待機中",level:2,alertbcbutton:false,alerterrbutton:false,linetext:"standby"},
                { icon: 'mdi-wrench', text: ".", color: 'black', textname: "維修中",level:3,alertbcbutton:false,alerterrbutton:false,linetext:"maintenance"},
                ],

                isRefreshing: false,
                IP:process.env.VUE_APP_IP,
                poolsCode:JSON.parse(localStorage.getItem("PoolsCode")),
                poolsName:JSON.parse(localStorage.getItem("PoolsName")),
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
          generateLinksArray(count) {
            this.links = []; 
            for (let i = 1; i <= count; i++) {
            this.links.push([
                { icon: 'mdi-fishbowl', text: '.', color: 'indigo-darken-1', textname: "游動中", level: 1, alertbcbutton: false, alerterrbutton: false,linetext:"swimming" },
                { icon: 'mdi mdi-fish-off', text: '.', color: 'orange-darken-2', textname: "待機中", level: 2, alertbcbutton: false, alerterrbutton: false,linetext:"standby" },
                { icon: 'mdi-wrench', text: '.', color: 'black', textname: "維修中", level: 3, alertbcbutton: false, alerterrbutton: false,linetext:"maintenance" },
            ]);
            }
            },
          processData(ids, data) {
            const bcvalue = ids.map((id) => data[id].bc);
            const errvalue = ids.map((id) => data[id].err);
            const activevalue = ids.map((id) => data[id].active);
            this.bc.push(bcvalue);
            this.err.push(errvalue);
            this.active.push(activevalue);
            },
          RefreshDatas2() {
            for (var i = 0; i < this.poolsCode.length; i++) {
            const fish0 = "fish0" + this.poolsCode[i];
            const fish1 = "fish1" + this.poolsCode[i];
            const fish2 = "fish2" + this.poolsCode[i];

            const fish1Data = localStorage.getItem(fish1);
            const parsedFish1Data = JSON.parse(fish1Data);
            const fish0Data = localStorage.getItem(fish0);
            const parsedFish0Data = JSON.parse(fish0Data);
            const fish2Data = localStorage.getItem(fish2);
            const parsedFish2Data = JSON.parse(fish2Data);
            if(!parsedFish1Data || !parsedFish0Data || !parsedFish2Data) continue;
            const combinedFishIds = [...parsedFish1Data, ...parsedFish0Data, ...parsedFish2Data];
            const parsedFishIds = combinedFishIds.map((str) => {
                const num = parseInt(str, 10);
                const paddedNum = num.toString().padStart(7, '0'); 
                return paddedNum;
            });
            this.FishIdNow.push(parsedFish1Data.length)
            this.FishId.push(parsedFishIds); 
            }

            },
          async RefreshDatas(i) {
            try {
                if (this.FishId[i].length !== 0) {
                    const response = await axios.get(
                    "https://pre.aifish.cc"+"/api/v1/fish/data/?fishesUID="+this.FishId[i],
                    {
                        headers: {
                        Authorization: `Bearer ${this.token}`,
                        },
                    }
                    );
                    
                    console.log(response);
                    const responseData = JSON.stringify(response.data[this.poolsCode[i]]);
                    const parsedResponseData = JSON.parse(responseData);
                    if(i === 0){
                    const currentTime = new Date();
                    const year = currentTime.getFullYear();
                    const month = String(currentTime.getMonth() + 1).padStart(2, '0');
                    const day = String(currentTime.getDate()).padStart(2, '0');
                    const hours = String(currentTime.getHours()).padStart(2, '0');
                    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
                    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
                    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    this.time = formattedDate;
                    localStorage.setItem("NewTime", formattedDate);
                    }
                    this.processData(this.FishId[i], parsedResponseData);
                    const bcdata = this.bc[i];
                    const errdata = this.err[i];
                    let chargenum = 0 ;
                    let fixnum = 0;
                    for (let a = 0; a < this.FishIdNow[i]; a++) {
                    
                    if (bcdata[a] < "20") chargenum += 1;
                    }
                    for (let a = 0; a < this.FishIdNow[i]; a++) {
                    if ( errdata[a] !== 0) fixnum += 1;
                    }
                    this.needchargenum.push(chargenum);
                    this.needfixnum.push(fixnum);
                    if (this.needchargenum[i] !== 0) {
                    this.links[i][0].alertbcbutton = true;
                    }
                    if (this.needfixnum[i] !== 0) {
                    this.links[i][0].alerterrbutton = true;
                    }
                    
                    this.links[i][0].text = this.active[i].filter((a) => a === 1).length;
                    let formattedCount = this.links[i][0].text < 10 ? `0${this.links[i][0].text}` : this.links[i][0].text.toString();
                    this.links[i][0].text = formattedCount;
                    this.links[i][1].text = this.active[i].filter((a) => a === 0).length;
                    formattedCount = this.links[i][1].text < 10 ? `0${this.links[i][1].text}` : this.links[i][1].text.toString();
                    this.links[i][1].text = formattedCount;
                    this.links[i][2].text = this.active[i].filter((a) => a === 2).length;
                    formattedCount = this.links[i][2].text < 10 ? `0${this.links[i][2].text}` : this.links[i][2].text.toString();
                    this.links[i][2].text = formattedCount;
                    localStorage.setItem("Poolname", this.poolsName[i]);
                    localStorage.setItem("Id", this.FishId[i]);
                    localStorage.setItem("Bc", this.bc[i]);
                    localStorage.setItem("Erro", this.err[i]);
                    localStorage.setItem("Active", this.active[i]);
                    if (!this.isRefreshing) {
                    this.isRefreshing = true;

                    setTimeout(() => {
                        this.isRefreshing = false;
                    }, 1000); 
                    }
                } else {
                    this.links[i][0].text = 0;
                    this.links[i][1].text = 0;
                    this.links[i][2].text = 0;
                    localStorage.setItem("Poolname", this.poolsName[i]);
                    localStorage.setItem("Id","")
                    localStorage.setItem("Bc", "");
                    localStorage.setItem("Erro", "");
                    localStorage.setItem("Active", "");
                }
            } catch (error) {
            console.error('Error', error);
            }
          },
          async loadnewdata() {
            try {
            const response = await axios.get(
                "https://pre.aifish.cc"+"/api/v1/account",
                {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
                }
            );

            console.log(response);
            if (response.status === 200) {
                for (var i = 0; i < this.poolsCode.length; i++) {
                const fishData = response.data.fishesID[this.poolsCode[i]];
                const fish0Values = [];
                const fish1Values = [];
                const fish2Values = [];
                const fish3Values = [];
                if (Object.prototype.hasOwnProperty.call(response.data.fishesID, this.poolsCode[i])) {
                    Object.entries(fishData).forEach(([key, value]) => {
                    if (value === 1) {
                        fish1Values.push(key);
                    } else if (value === 2) {
                        fish2Values.push(key);
                    } else if (value === 0){
                        fish0Values.push(key);
                        
                    }else{
                        fish3Values.push(key);
                    }
                    });
                }
                const poolactivenum = fish1Values.length.toString() + fish0Values.length.toString() + fish2Values.length.toString() 
                const num = "activeNum"+this.poolsCode[i]
                const fish0ids = "fish0"+this.poolsCode[i]
                const fish1ids = "fish1"+this.poolsCode[i]
                const fish2ids = "fish2"+this.poolsCode[i]
                localStorage.setItem(num, poolactivenum);
                localStorage.setItem(fish0ids, JSON.stringify(fish0Values));
                localStorage.setItem(fish1ids, JSON.stringify(fish1Values));
                localStorage.setItem(fish2ids, JSON.stringify(fish2Values));
                }
                
            }
            } catch (error) {
            console.log(error);
            }
            },
  
  
      },
      mounted(){
          //this.swiper();
      },
      async created() {
        //this.generateLinksArray(this.poolsCode.length);
        //await this.loadnewdata();
        //this.RefreshDatas2();
        //for (var i = 0; i < this.poolsCode.length; i++) {
        //await this.RefreshDatas(i);
        //}
},
    };
  </script>
  
  <style scoped>
  
  .titelText{
      position: relative;
      font-size: 50px;
      width: 100%;
      top: 5px;
      text-align: center;
      
      color: black;
  }
  .searchinput {
    position: relative;
    left: 50%;
    transform: translateX(-50%) scale(0.8);
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
  
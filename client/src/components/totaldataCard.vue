<template>
  <div class="Swiper" >
      <div class="father1">
        
      <v-card v-if="poolsName.length <1" cover class="three" width="60%" min-height="230"   :style="{ backgroundImage: `url(${poolsdata[1].imageurl})`, backgroundSize: 'cover', backgroundPosition:'center', }">
        <div class="notyet-bg2-overlay">
            <div class="text-white text-center   font-weight-black" style="letter-spacing: 3px; margin-top: 80px; font-size: 25px;">水池尚未開放</div>
            <div class="text-white text-center    font-weight-black" style="font-size: 8px;">The pool is not open yet</div>
          </div>
      </v-card>
      <div v-if="poolsName.length == 1" >
        <v-card v-for="(name, index) in poolsName"  :key="name" cover class="four "  min-height="230"   :style="{ backgroundImage: `url(${poolsdata[index].imageurl})`, backgroundSize: 'cover', backgroundPosition:'center', }">
          <div class="text-white ml-5 mt-5  font-weight-black " style="letter-spacing: 3px; font-size: 25px;">{{ name }}</div>
          <div class="text-white  ml-5   " style="white-space: pre-wrap; width: 60%;  font-size: 18px; ">{{ poolsdata[0].EnPoolName }}</div>
      </v-card>
      </div>
        <v-card  v-if="poolsName.length == 2"  cover class="five "   min-height="230"   :style="{ backgroundImage: `url(${poolsdata[centerforTwo1].imageurl})`, backgroundSize: 'cover', backgroundPosition:'center', }">
          <div class="text-white ml-5 mt-5  font-weight-black " style="letter-spacing: 3px; font-size: 25px;">{{ poolsName[centerforTwo1] }}</div>
          <div class="text-white  ml-5   " style="white-space: pre-wrap; width: 60%;  font-size: 18px; ">{{ poolsdata[0].EnPoolName }}</div>
      </v-card>
        <v-card v-if="poolsName.length == 2"   cover class="three "  min-height="230"   :style="{ backgroundImage: `url(${poolsdata[centerforTwo2].imageurl})`, backgroundSize: 'cover', backgroundPosition:'center', }">
          <div class="text-white ml-5 mt-5  font-weight-black " style="letter-spacing: 3px; font-size: 25px;">{{ poolsName[centerforTwo2] }}</div>
          <div class="text-white  ml-5   " style="white-space: pre-wrap; width: 60%;  font-size: 18px; ">{{ poolsdata[0].EnPoolName }}</div>
      </v-card>
      <div class="Swiper-content" v-if="poolsName.length > 2">
        <v-card v-for="(name, index) in poolsName" :key="name" cover class="Swiper-item "  min-height="230"   :style="{ backgroundImage: `url(${poolsdata[index].imageurl})`, backgroundSize: 'cover', backgroundPosition:'center', }">
          <div class="text-white ml-5 mt-5  font-weight-black " style="letter-spacing: 3px; font-size: 25px;">{{ name }}</div>
          <div class="text-white  ml-5   " style="white-space: pre-wrap; width: 60%;  font-size: 18px; ">{{ poolsdata[0].EnPoolName }}</div>
      </v-card>
      </div>
      <v-card v-if="poolsName.length <1"  cover class="one" width="60%" min-height="230"   :style="{ backgroundImage: `url(${poolsdata[2].imageurl})`, backgroundSize: 'cover', backgroundPosition:'center'}">
          <div class="notyet-bg1-overlay">
            <div class="text-white text-center  font-weight-black" style="letter-spacing: 3px; margin-top: 80px; font-size: 25px;">水池尚未開放</div>
            <div class="text-white text-center  font-weight-black" style="font-size: 8px;">The pool is not open yet</div>
          </div>
      </v-card>
      </div>
      <div class="father2">
        <div class="font-weight-bold  titel-Name">{{ poolsName[centerIndex] }}</div>
      <div class="  en-titelName font-weight-bold" style="white-space: pre-wrap; text-align: end;">{{ poolsdata[centerIndex].EnPoolName }}</div>
      <div class=" recordtext text-grey-darken-1 "> 紀錄時間:{{ time }} </div>
      <div class="changebox">
        <v-btn class="swichPool-btn"   @click="cellphoneSwipe" v-if="poolsName.length > 1" @mouseenter="showButtons = true">切換水池</v-btn>
      </div>
      <v-card  class="poolsdatacard "   >
          <v-card-text class="cardtextbg  ">
            <div  class="font-weight-bold cellphonetitel-Name  mt-7" >{{ poolsName[centerIndex] }}</div>
            <div  class=" cellphoneEn-titelName mr-1 mt-4" >{{ poolsdata[centerIndex].EnPoolName }}</div>
            <div  class="cellphonerecordtext  text-blue-grey-lighten-1  mr-2 mb-2 mt-4"> 紀錄時間:{{ time }} </div>
            <div class="d-flex align-center justify-space-between">
    <v-card-title  ></v-card-title>
    
      <v-btn class="  refreshbtn-bg text-white mr-1"  icon="mdi-refresh" size="small" @click="refreshnew" :disabled="isRefreshing"></v-btn>
  </div>
      <div>
        <v-row  no-gutters>
        <v-col v-for="n in links[centerIndex]" :key="n"   class=" d-flex align-center justify-center mb-1">
          <v-sheet class=" text-h2 cardtext text-grey-lighten-2">{{n.text}}</v-sheet> 
        </v-col>
      </v-row>
      <v-row  no-gutters>
        <v-col v-for="n in links[centerIndex]" :key="n"   class=" d-flex align-center justify-center">
          <v-sheet class="mb-1 cardtext text-blue-grey-lighten-3">{{ n.textname }} </v-sheet> 
        </v-col>
      </v-row>
      <v-row  no-gutters>
        <v-col v-for="n in links[centerIndex]" :key="n"   class=" d-flex align-center justify-center">
        <v-btn class="mb-2 mt-1 btn-bg text-white"  :icon="n.icon " :to="'/' + poolsCode[centerIndex] + '/'+ n.linetext + '/fish' " @click="SaveIndividualData(centerIndex,n.level,'/'+n.linetext)"></v-btn>
        </v-col>
      </v-row>
      
      
      <v-row  no-gutters>
      <v-col v-for="n in links[centerIndex]" :key="n"   class=" d-flex align-center justify-center mt-1 ">
        <v-btn class="needbcbtn-bg mt-4" rounded="xl" size="small" prepend-icon="mdi-battery-charging-10"  v-show="n.alertbcbutton" @click="SaveIndividualData(centerIndex,4,'/needcharge')" :to="'/' + poolsName[centerIndex] + '/' + 'needcharge' + '/fish'"
          >{{needchargenum[centerIndex]}}條魚需充電</v-btn>
      </v-col>
    </v-row>
    <v-row  no-gutters >
      <v-col  v-for="n in links[centerIndex]" :key="n"   class=" d-flex align-center justify-center"  >
        <v-btn class="mt-5 mb-4 needfixbtn-bg" rounded="xl" size="small" prepend-icon="mdi-alert"  v-show="n.alertbcbutton"  @click="SaveIndividualData(centerIndex,5,'/error')" :to="'/' + poolsName[centerIndex] + '/' + 'error' + '/fish'"
          >{{needfixnum[centerIndex]}}條魚有錯誤</v-btn>
      </v-col>
    </v-row>
    </div>
    </v-card-text>
  </v-card>
      </div>
  </div>
</template>

<style scoped>
/*第一跟第二個css為水池卡片上面再覆蓋一層淺藍色的罩子*/ 
.one::before,.two::before,.three::before,.four::before,.five::before {
    content: "";
    background-color: rgb(0, 0, 255,0.1); 
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1; 
}
.one-overlay,.two-overlay,.three-overlay,.four-overlay,.five-overlay {  
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2; 
}
.forIpadcenter{
    margin-top: -5%;
      position: relative;
      transform: scale(0.8);
      width: 100%;
  }
  .forIpadcenter + .forIpadcenter {
      margin-top: -5%; 
  }

.v-application__wrap{
    background-color: black;
  }
.pooltext{
  transform: scale(1.2);
  background-color: rgba(255, 255, 255, 0); 
  color: white;
}
.refreshbtn-bg{
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.1), rgba(6, 241, 22, 0.12), rgba(255, 255, 255, 0.1));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.7);
  transform:  scaleX(-1);
}
.btn-bg{
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.7);
}
.cardimage{
  transform: scale(0.98);
  border-radius: 10px;
}
.cardtextbg {
  background-color: rgba(255, 255, 255, 0); 
}
.cardtext{
  background-color: rgba(255, 255, 255, 0);
  letter-spacing: 2px;
  
}
.recordtext{
  background-color: rgba(255, 255, 255, 0); 
  font-size: 17px;
}
.needbcbtn-bg{
  color: white;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(249, 168, 37, 0.7);
}
.needfixbtn-bg{
  color: white;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid #B71C1C;
}
.nodisplay{
  display: none;
}
@media screen and  (min-width: 1601px){
.Swiper{
  display: flex;
  width: 100%;
  height: 100%;
  
}

.father1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100%;
  align-items: center;
}
.father2{
  display: flex;
  flex-direction: column;
  width: 47.5%;
  align-items: flex-end;
  justify-content: center;
}
.Swiper-content{
  width: 55%;
  height: 30%;
}
.one{
  transform: scale(0.8);
  height: 260px;
  width: 50%;
}
.two{
  transform: scale(1.1);
  margin-bottom: 4%;
  height: 260px;
  width: 50%;
}
.three{
  transform: scale(1);
  height: 260px;
  margin-top: 5%;
  width: 50%;
}
.four{
    z-index: 9;
    transform: scale(2);
    height: 33%;
  }
.five{
  transform: scale(1.1);
  margin-top: 20%;
  margin-bottom: 4%;
  height: 33%;
  width: 50%;
}
.titel-Name{
    font-size: 70px;
    letter-spacing: 6px;
    margin-top: 2%;
    color: white;
  }
  .en-titelName{
    font-size: 30px;
    letter-spacing: 3px;
    width: 50%;
    color: white;
  }
  .recordtext{
  background-color: rgba(255, 255, 255, 0); 
  font-size: 25px;
  margin-top: 2%;
}
.poolsdatacard{
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  margin-top: 8%;
}
.cardtextbg {
  font-size: 20px; 
}
.needbcbtn-bg,.needfixbtn-bg{
  transform: scale(1.2);
}
.swichPool-btn,.cellphonetitel-Name,.cellphonerecordtext,.cellphoneEn-titelName{
  display: none;
}
}
@media screen and  (min-width: 1026px) and (max-width: 1600px){
.Swiper{
  display: flex;
  width: 100%;
  height: 100%;
  
}

.father1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100%;
  align-items: center;
}
.father2{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 48%;
  height: 100%;
  align-items: flex-end;
}
.Swiper-content{
  width: 400px;
}
.one{
  z-index: 2;
  transform: scale(0.8);
  height: 33%;
  width: 50%;
}
.two{
  z-index: 9;
  transform: scale(1.1);
  margin-bottom: 4%;
  height: 33%;
  width: 50%;
}
.three{
  z-index: 2;
  transform: scale(0.8);
  height: 33%;
  width: 50%;
}
.four{
    z-index: 9;
    transform: scale(1.5);
    margin-top: 20%;
    height: 33%;
  }
.five{
  z-index: 9;
  transform: scale(1.1);
  margin-top: 20%;
  margin-bottom: 4%;
  height: 33%;
  width: 50%;
}


.titel-Name{
    font-size: 60px;
    letter-spacing: 4px;
    color: white;
  }
  .en-titelName{
    font-size: 25px;
    letter-spacing: 3px;
    width: 385px;
    color: white;
  }

.poolsdatacard{
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  position: relative;
  left: 2%;
}
.swichPool-btn,.cellphonetitel-Name,.cellphonerecordtext,.cellphoneEn-titelName{
  display: none;
}
}
@media screen and (min-width: 601px) and (max-width: 1025px){
  .titel-Name,.en-titelName,.recordtext,.Swiper-content,.one,.three{
    display: none;
  }
  .Swiper{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.father1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 30%;
  align-items: center;
}
.father2{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  align-items: center;
  justify-content: center;
}
  .poolsdatacard{
  width: 90%;
  height: auto;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 15px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2));
  border: 3px solid rgba(255, 255, 255, 0.2);
  position: relative;
  bottom: 40px;
}
.five{
  margin-top: 15%;
  width: 80%;
}
.four{
    z-index: 9;
    transform: scale(1.5);
    margin-top: 45%;
    height: 20%;
  }
.changebox{
  width: 90%;
  height: auto;
  display: flex;
  justify-content: end;
}
.swichPool-btn{
    position: relative;
    bottom: 60px;
    left: 2%;
    text-decoration: underline;
    background-color:rgb(0, 0, 0,0);
    color: white;
    font-size: 25px;
  }
  .cellphonetitel-Name{
    text-align: end;  
    font-size: 45px;
    letter-spacing: 3px;
    color: white;
  }
  .cellphoneEn-titelName{
    white-space: pre-wrap; 
    text-align: end;  
    font-size: 25px; 
    letter-spacing: 2px;
    color: white;
    position: relative;
    margin-top: 2%;
  }
  .cellphonerecordtext{
  font-size: 23px;
  text-align: end;
}
}

@media screen and (min-width: 390px) and (max-width: 600px){
  .titel-Name,.en-titelName,.recordtext,.Swiper-content,.one,.three{
    display: none;
  }
  .Swiper{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.father1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 40%;
  align-items: center;
}
.father2{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60%;
  align-items: center;
  justify-content: center;
}
  .poolsdatacard{
  width: 90%;
  height: auto;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 15px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2));
  border: 3px solid rgba(255, 255, 255, 0.2);
  position: relative;
  bottom: 20px;
}
.five{
  margin-top: 15%;
  width: 70%;
  transform: scale(0.95);
}
.four{
  margin-top: 13%;
  transform: scale(0.9);
}
.changebox{
  width: 90%;
  height: auto;
  display: flex;
  justify-content: end;
}
.swichPool-btn{
    position: relative;
    bottom: 25px;
    left: 3%;
    text-decoration: underline;
    background-color:rgb(0, 0, 0,0);
    color: white;
    font-size: 20px;
  }
  .cellphonetitel-Name{
    text-align: end;  
    font-size: 40px;
    letter-spacing: 3px;
    color: white;
  }
  .cellphoneEn-titelName{
    white-space: pre-wrap; 
    text-align: end;  
    font-size: 20px; 
    letter-spacing: 2px;
    color: white;
  }
  .cellphonerecordtext{
  font-size: 18px;
  text-align: end;
}
}
@media screen and (max-width: 390px) {
  .titel-Name,.en-titelName,.recordtext,.Swiper-content,.one,.three{
    display: none;
  }
  .Swiper{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.father1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 30%;
  align-items: center;
}
.father2{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  align-items: center;
  justify-content: center;
}
  .poolsdatacard{
  width: 90%;
  height: auto;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 15px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2));
  border: 3px solid rgba(255, 255, 255, 0.2);
  position: relative;
  bottom: 8%;
  transform: scale(0.9);
}
.five{
  margin-top: 15%;
  width: 70%;
  transform: scale(0.8);
}
.four{
  margin-top: 10%;
  transform: scale(0.8);
}
.changebox{
  width: 90%;
  height: auto;
  display: flex;
  justify-content: end;
}
.swichPool-btn{
    position: relative;
    bottom: 25px;
    left: 3%;
    text-decoration: underline;
    background-color:rgb(0, 0, 0,0);
    color: white;
    font-size: 15px;
  }
  .cellphonetitel-Name{
    text-align: end;  
    font-size: 35px;
    letter-spacing: 3px;
    color: white;
  }
  .cellphoneEn-titelName{
    white-space: pre-wrap; 
    text-align: end;  
    font-size: 18px; 
    letter-spacing: 2px;
    color: white;
  }
  .cellphonerecordtext{
  font-size: 16px;
  text-align: end;
}
}
</style>

<script>
import axios from 'axios';
import { Swiper } from '@/swiper/Swiper';
export default {
data() {
return {
center:"center",
classlist:["two","three","one",],
FishId: [],
FishId2num:null,
FishIdNow:[],
needchargenum:[],
needfixnum:[],
bc: [],
err: [],
active: [],
photoCode:[],
token:localStorage.getItem('token'),
time: localStorage.getItem("NewTime"),
poolsdata:[
            {
                EnPoolName:"National Taipei University of Technology",
                imageurl: require("../assets/主頁魚池33.png")
            },
            {
                EnPoolName:"Museum of Marine Science and Technology",
                imageurl: require("../assets/主頁魚池22.png")
            },
            {
                EnPoolName:"National Taipei University of Technology",
                imageurl: require("../assets/主頁魚池11.png")
            }
        ],
links: [ 
  { icon: 'mdi-fishbowl', text: ".", color: 'indigo-darken-1', textname: "游動中",level:1,alertbcbutton:false,alerterrbutton:false,linetext:"swimming"},
  { icon: 'mdi mdi-fish-off', text: ".", color: 'orange-darken-2', textname: "待機中",level:2,alertbcbutton:false,alerterrbutton:false,linetext:"standby"},
  { icon: 'mdi-wrench', text: ".", color: 'black', textname: "維修中",level:3,alertbcbutton:false,alerterrbutton:false,linetext:"maintenance"},
],

isRefreshing: false,
IP:process.env.VUE_APP_IP,
poolsCode:JSON.parse(localStorage.getItem("PoolsCode")),
poolsName:JSON.parse(localStorage.getItem("PoolsName")),
isMobileScreen:localStorage.getItem("isMobileScreen"),
section:localStorage.getItem('UserSection'),
titleName:"",
EntitleName:"",
centercardNum:0,
centerforTwo1:0,
centerforTwo2:1,
};
},
props:{
  centerIndex: {
            type: Number,
            default: 0,
            required: true,
        },
},
mounted(){
          if(this.poolsName.length >2) this.swiper();
      },
methods: {
  swiper(){
              this.swiperInstance = new Swiper({
              classList: this.classlist,
              SwiperContent: ".Swiper-content",
          });
          },
  leftSwipe() {
              if(this.poolsName.length>3) this.swiperInstance.__leftMove();
              else if(this.poolsName.length == 2) {
                let a =this.centerforTwo1;
                this.centerforTwo1 = this.centerforTwo2;
                this.centerforTwo2 = a;
              }
          },
  rightSwipe() {
              if(this.poolsName.length>3) this.swiperInstance.__rightMove();
              else if(this.poolsName.length == 2) {
                let a =this.centerforTwo1;
                this.centerforTwo1 = this.centerforTwo2;
                this.centerforTwo2 = a;
              }
          },
  cellphoneSwipe(){
    this.$emit('swipeRight');
  },
generateClassLink(count){
  if (count > 3) {
      const extraCount = count - 3;
      for (let i = 0; i < extraCount; i++) {
          this.classlist.push("nodisplay");
        }
      }
},
generateLinksArray(count) {
this.links = []; 
for (let i = 1; i <= count; i++) {
  this.links.push([
    { icon: 'mdi-fishbowl', text: '00', color: 'indigo-darken-1', textname: "游動中", level: 1, alertbcbutton: true, alerterrbutton: true,linetext:"swimming" },
    { icon: 'mdi mdi-fish-off', text: '00', color: 'orange-darken-2', textname: "待機中", level: 2, alertbcbutton: false, alerterrbutton: false,linetext:"standby" },
    { icon: 'mdi-wrench', text: '00', color: 'black', textname: "維修中", level: 3, alertbcbutton: false, alerterrbutton: false,linetext:"maintenance" },
  ]);
}
},
processData(ids, data) {
const validIds = ids.filter(id => data[id]?.bc !== undefined);
const bcvalue = validIds.map((id) => data[id].bc);
const errvalue = validIds.map((id) => data[id].err);
const activevalue = validIds.map((id) => data[id].active);
const photovalue = validIds.map((id) => data[id].photoCode);
this.bc.push(bcvalue);
this.err.push(errvalue);
this.active.push(activevalue);
this.photoCode.push(photovalue);
},
async refresh() {
  this.isRefreshing = true;
  this.generateLinksArray(this.poolsCode.length);
  await this.loadnewdata();
  this.RefreshDatas2();
  for (var i = 0; i < this.poolsCode.length; i++) {
  await this.RefreshDatas(i);
}
this.isRefreshing = false;
},
async refreshnew() {
  this.isRefreshing = true;
  try {
  const response = await axios.get(
    process.env.VUE_APP_SEVER+"/api/v1/fish/explore/?section="+this.poolsCode[this.centerIndex],
    {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }
  );

  console.log(response);
  if (response.status === 200) {
    this.isRefreshing = false;
    await this.refresh();
  }
} catch (error) {
  console.log(error);
}

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
  if(parsedFishIds.length !== 0){
    this.FishId.push(parsedFishIds); 
  }
  
}

},
async RefreshDatas(i) {
try {
      if (this.FishId[i].length !== 0) {
        const response = await axios.get(
          process.env.VUE_APP_SEVER+"/api/v1/fish/data/?fishesUID="+this.FishId[i],
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        
        console.log(response);
        const responseData = JSON.stringify(response.data[this.poolsCode[i]]);
        const parsedResponseData = JSON.parse(responseData);
        console.log(parsedResponseData)
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
        if (parsedResponseData) {
          this.processData(this.FishId[i], parsedResponseData);
        }else {
          return;
        }
        const bcdata = this.bc[i];
        const errdata = this.err[i];
        let chargenum = 0 ;
        let fixnum = 0;
        for (let a = 0; a < this.FishIdNow[i]; a++) {
          
          if (bcdata[a] < "20") chargenum += 1;
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
  //console.error('Error', error);
  this.needchargenum.push(0);
  this.needfixnum.push(0);
}
},
async SaveIndividualData(i,level,route){  //level是游動中、待機中、維修中的分別
  localStorage.setItem("route",route);
if (level === 0) {
  await this.RefreshDatas(i);
  return; 
}
const fish0 = "fish0" + this.poolsCode[i];
const fish1 = "fish1" + this.poolsCode[i];
const fish2 = "fish2" + this.poolsCode[i];
const fish1Data = localStorage.getItem(fish1);
const parsedFish1Data = JSON.parse(fish1Data);
this.FishId[i] = parsedFish1Data
const FishId1num = this.FishId[i].length
let bcdatas = [];
let errdatas = [];
let activedatas = [];
let photodatas = [];
if(FishId1num !== 0){
  bcdatas = this.bc[i].slice(0, FishId1num);
  errdatas = this.err[i].slice(0, FishId1num);
  activedatas = this.active[i].slice(0, FishId1num);
  photodatas = this.photoCode[i].slice(0,FishId1num);
}

if(level === 1){
  localStorage.setItem("Poolcode", this.poolsCode[i]);
  localStorage.setItem("Poolname", this.poolsName[i]);
  localStorage.setItem("Id",this.FishId[i]);
  localStorage.setItem("Bc", bcdatas);
  localStorage.setItem("Erro", errdatas);
  localStorage.setItem("Active", activedatas);
  localStorage.setItem("FishPhoto", photodatas);
}  else if (level === 2){
  const fish0Data = localStorage.getItem(fish0);
  const parsedFish0Data = JSON.parse(fish0Data);
  this.FishId[i].push(...parsedFish0Data)
  let active0 = [];
  let idResult = [];
  let bcResult = [];
  let errResult = [];
  let photoResult = [];
  if (this.FishId[i].length !== 0){
    active0 = this.active[i].filter(value => value < 1);
    const active0index = this.active[i].map((value, index) => {
      if (value === 0) {
        return index;
      }
    }).filter(index => index !== undefined);
    idResult = active0index.map(index => this.FishId[i][index]);
    bcResult = active0index.map(index => this.bc[i][index]);
    errResult = active0index.map(index => this.err[i][index]);
    photoResult = active0index.map(index => this.photoCode[i][index]);
  }
  localStorage.setItem("Poolcode", this.poolsCode[i]);
  localStorage.setItem("Poolname", this.poolsName[i]);
  localStorage.setItem("Id",idResult)
  localStorage.setItem("Bc", bcResult);
  localStorage.setItem("Erro", errResult);
  localStorage.setItem("Active", active0);
  localStorage.setItem("FishPhoto", photoResult);
}else if(level === 4){
  const needcharge = bcdatas.filter(value => value < 20);
  const needchargeindex = needcharge.map((value) => bcdatas.indexOf(value));
  const idbcResult = needchargeindex.map(index => this.FishId[i][index]);
  const errbcResult = needchargeindex.map(index => errdatas[index]);
  const activebcResult = needchargeindex.map(index => activedatas[index]);
  const photobcResult = needchargeindex.map(index => photodatas[index]);
  localStorage.setItem("Poolcode", this.poolsCode[i]);
  localStorage.setItem("Poolname", this.poolsName[i]);
  localStorage.setItem("Id",idbcResult)
  localStorage.setItem("Bc", needcharge);
  localStorage.setItem("Erro", errbcResult);
  localStorage.setItem("Active", activebcResult);
  localStorage.setItem("FishPhoto", photobcResult);
}else if(level === 5){
  const needfix = errdatas.filter(value => value > 0);
  const needfixindex = needfix.map((value) => errdatas.indexOf(value));
  const idErrResult = needfixindex.map(index => this.FishId[i][index]);
  const bcErrResult = needfixindex.map(index => bcdatas[index]);
  const activeErrResult = needfixindex.map(index => activedatas[index]);
  const photoErrResult = needfixindex.map(index => photodatas[index]);
  localStorage.setItem("Poolcode", this.poolsCode[i]);
  localStorage.setItem("Poolname", this.poolsName[i]);
  localStorage.setItem("Id",idErrResult)
  localStorage.setItem("Bc", bcErrResult);
  localStorage.setItem("Erro", needfix);
  localStorage.setItem("Active", activeErrResult);
  localStorage.setItem("FishPhoto", photoErrResult);
} else{
  const fish0Data = localStorage.getItem(fish0);
  const parsedFish0Data = JSON.parse(fish0Data);
  this.FishId[i].push(...parsedFish0Data)
  const fish2Data = localStorage.getItem(fish2);
  const parsedFish2Data = JSON.parse(fish2Data);
  this.FishId[i].push(...parsedFish2Data)
  let idResult = [];
  let bcResult = [];
  let errResult = [];
  let photoResult = [];
  let fixing = [];
  if(this.FishId[i].length !== 0){
    fixing = this.active[i].filter(value => value > 1);
    const fixindex = this.active[i].map((value, index) => {
      if (value === 2) {
        return index;
      }
    }).filter(index => index !== undefined);
    idResult = fixindex.map(index => this.FishId[i][index]);
    bcResult = fixindex.map(index => this.bc[i][index]);
    errResult = fixindex.map(index => this.err[i][index]);
    photoResult = fixindex.map(index => this.poolsCode[i][index]);
  }
  localStorage.setItem("Poolcode", this.poolsCode[i]);
  localStorage.setItem("Poolname", this.poolsName[i]);
  localStorage.setItem("Id",idResult)
  localStorage.setItem("Bc", bcResult);
  localStorage.setItem("Erro", errResult);
  localStorage.setItem("Active", fixing);
  localStorage.setItem("FishPhoto", photoResult);
}

},

async loadnewdata() {
try {
  const response = await axios.get(
    process.env.VUE_APP_SEVER+"/api/v1/account",
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
async routefishdata(index,name){
await this.SaveIndividualData(index,0,'/total');
this.$router.push(`/${name}/total/fish`);
},
getKeyByValue(object, value) {
          return Object.keys(object).find(key => object[key] === value);
        },
},
async created() {
if(this.isMobileScreen == "true") this.isMobileScreen = true;
else this.isMobileScreen = false;
this.generateClassLink(this.poolsCode.length);
this.generateLinksArray(this.poolsCode.length);
await this.loadnewdata();
this.RefreshDatas2();
for (var i = 0; i < this.poolsCode.length; i++) {
await this.RefreshDatas(i);
}

if(this.poolsCode[0] && this.poolsCode[0].startsWith("003")){
  this.poolsdata[0].EnPoolName = "Museum of Marine Science and Technology";
  this.poolsdata[1].EnPoolName = "Museum of Marine Science and Technology"
  this.poolsdata[2].EnPoolName = "Museum of Marine Science and Technology";
  this.poolsdata[0].imageurl =  require("../assets/海科展示圓缸.jpg")
  this.poolsdata[1].imageurl = require("../assets/海科戶外廣場.jpg");
}

},
};
</script>


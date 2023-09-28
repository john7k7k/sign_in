<template>
  <div class="Swiper" @mouseenter="showButtons = true"
        @mouseleave="showButtons = false">
      <v-btn class="leftbutton ml-5" v-if="showButtons"  @click="leftSwipe" icon="mdi mdi-chevron-left"></v-btn>
      <v-btn class="rightbutton mr-5" v-if="showButtons"  @click="rightSwipe()" icon="mdi mdi-chevron-right"></v-btn>
      <div class="Swiper-content" >
        <v-card v-for="(name, index) in poolsName" class="Swiper-item "   :key="name" >
          <v-card-text class="cardtextbg pt-5 pb-8">
  <v-img
    class=" text-white cardimage"
    height="150"
    src="../assets/totalbg.jpg"
    @click="routefishdata(index,poolsCode[index])"
    cover
  >
  </v-img> 
    
      <div class="d-flex align-center justify-space-between">
    <v-card-title class="pooltext " >{{ name }}</v-card-title>
    
      <v-btn class="mr-2 mt-3"  color="green" icon="mdi-refresh" size="small" @click="refresh" :disabled="isRefreshing"></v-btn>
  </div>
      <div>
        <v-row  no-gutters>
        <v-col v-for="n in links[index]" :key="n"   class=" d-flex align-center justify-center mb-1">
          <v-sheet class=" text-h4 cardtext">{{n.text}}</v-sheet> 
        </v-col>
      </v-row>
      <v-row  no-gutters>
        <v-col v-for="n in links[index]" :key="n"   class=" d-flex align-center justify-center">
          <v-sheet class="mb-1 cardtext">{{ n.textname }} </v-sheet> 
        </v-col>
      </v-row>
      <v-row  no-gutters>
        <v-col v-for="n in links[index]" :key="n"   class=" d-flex align-center justify-center">
        <v-btn class="mb-2 mt-1" :color="n.color" :icon="n.icon " :to="'/' + poolsCode[index] + '/'+ n.linetext + '/fish' " @click="SaveIndividualData(index,n.level,'/'+n.linetext)"></v-btn>
        </v-col>
      </v-row>
      
      
      <v-row  no-gutters>
      <v-col v-for="n in links[index]" :key="n"   class=" d-flex align-center justify-center mt-1">
        <v-btn rounded="xl" size="small" prepend-icon="mdi-battery-charging-10" color="orange" v-show="n.alertbcbutton" @click="SaveIndividualData(index,4,'/needcharge')" :to="'/' + name + '/' + 'needcharge' + '/fish'"
          >{{needchargenum[index]}}條魚需充電</v-btn>
      </v-col>
    </v-row>
    <v-row  no-gutters >
      <v-col  v-for="n in links[index]" :key="n"   class=" d-flex align-center justify-center"  >
        <v-btn class="mt-2 haveErrorText " rounded="xl" size="small" prepend-icon="mdi-alert" color="red" v-show="n.alertbcbutton"  @click="SaveIndividualData(index,5,'/error')" :to="'/' + name + '/' + 'error' + '/fish'"
          >{{needfixnum[index]}}條魚有錯誤</v-btn>
      </v-col>
      <div class="mt-4 mr-2 cardtext"> 紀錄時間:{{ time }} </div>
    </v-row>
    </div>
    </v-card-text>
  </v-card>
      </div>
  </div>

  
</template>

<script>
import axios from 'axios';
import { Swiper } from '@/swiper/Swiper';
export default {
data() {
return {
center:"center",
classlist:["three","four","two",],
showButtons:false,
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
isMobileScreen:localStorage.getItem("isMobileScreen")
};
},
mounted(){
          this.swiper();
      },
methods: {
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
          "/api/v1/fish/data/?fishesUID="+this.FishId[i],
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
async SaveIndividualData(i,level,route){
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
if(FishId1num !== 0){
  bcdatas = this.bc[i].slice(0, FishId1num);
  errdatas = this.err[i].slice(0, FishId1num);
  activedatas = this.active[i].slice(0, FishId1num);
}

if(level === 1){
  localStorage.setItem("Poolname", this.poolsName[i]);
  localStorage.setItem("Id",this.FishId[i]);
  localStorage.setItem("Bc", bcdatas);
  localStorage.setItem("Erro", errdatas);
  localStorage.setItem("Active", activedatas);
}  else if (level === 2){
  const fish0Data = localStorage.getItem(fish0);
  const parsedFish0Data = JSON.parse(fish0Data);
  this.FishId[i].push(...parsedFish0Data)
  let active0 = [];
  let idResult = [];
  let bcResult = [];
  let errResult = [];
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
  }
  localStorage.setItem("Poolname", this.poolsName[i]);
  localStorage.setItem("Id",idResult)
  localStorage.setItem("Bc", bcResult);
  localStorage.setItem("Erro", errResult);
  localStorage.setItem("Active", active0);
}else if(level === 4){
  const needcharge = bcdatas.filter(value => value < 20);
  const needchargeindex = needcharge.map((value) => bcdatas.indexOf(value));
  const idbcResult = needchargeindex.map(index => this.FishId[i][index]);
  const errbcResult = needchargeindex.map(index => errdatas[index]);
  const activebcResult = needchargeindex.map(index => activedatas[index]);
  localStorage.setItem("Poolname", this.poolsName[i]);
  localStorage.setItem("Id",idbcResult)
  localStorage.setItem("Bc", needcharge);
  localStorage.setItem("Erro", errbcResult);
  localStorage.setItem("Active", activebcResult);
}else if(level === 5){
  const needfix = errdatas.filter(value => value > 0);
  const needfixindex = needfix.map((value) => errdatas.indexOf(value));
  const idErrResult = needfixindex.map(index => this.FishId[i][index]);
  const bcErrResult = needfixindex.map(index => bcdatas[index]);
  const activeErrResult = needfixindex.map(index => activedatas[index]);
  localStorage.setItem("Poolname", this.poolsName[i]);
  localStorage.setItem("Id",idErrResult)
  localStorage.setItem("Bc", bcErrResult);
  localStorage.setItem("Erro", needfix);
  localStorage.setItem("Active", activeErrResult);
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
  }
  localStorage.setItem("Poolname", this.poolsName[i]);
  localStorage.setItem("Id",idResult)
  localStorage.setItem("Bc", bcResult);
  localStorage.setItem("Erro", errResult);
  localStorage.setItem("Active", fixing);
}

},

async loadnewdata() {
try {
  const response = await axios.get(
    "/api/v1/account",
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
}
},
async created() {
this.generateClassLink(this.poolsCode.length);
this.generateLinksArray(this.poolsCode.length);
await this.loadnewdata();
this.RefreshDatas2();
for (var i = 0; i < this.poolsCode.length; i++) {
await this.RefreshDatas(i);
}


},
};
</script>

<style scoped>
.cardimage{
  transform: scale(0.98);
  border-radius: 10px;
}
.cardtextbg {
  background-color: rgba(255, 255, 255, 0.1); 
  backdrop-filter: blur(15px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.cardtext{
  background-color: rgba(255, 255, 255, 0); 
  color: white;
}
.nodisplay{
  display: none;
}
.two{
      z-index: 2;
      position: absolute;
      transform: scale(0.9) translateY(-5%);
      left: -33%;
      width: 50%;
  }
  .three{
      z-index: 9;
      position: absolute;
      transform:translateX(50%) scale(1) translateY(-5%);
      width: 50%;
  }
  .four{
      z-index: 2;
      position: absolute;
      transform: scale(0.9) translateY(-5%);
      right: -33%;
      width: 50%;
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
.haveErrorText{
margin-left: 38%;
}
.v-application__wrap{
    background-color: black;
  }
  .leftbutton {
      z-index: 10; 
      position: fixed; 
      left: 0; 
      top: 60%; 
      transform: translateY(-50%); 
  }
  
  .rightbutton{
      z-index: 10; 
      position: fixed; 
      right: 0; 
      top: 60%; 
      transform: translateY(-50%); 
  }
.pooltext{
  transform: scale(1.2);
  background-color: rgba(255, 255, 255, 0); 
  color: white;
}

@media screen and (max-width: 600px) {
  .haveErrorText{
      margin-left: 0%;
}
  .two {
      display: none;
  }
  .three {
      margin-top: -10%;
      position: relative;
      transform: scale(0.8);
      width: 100%;
  }

  .three + .three {
      margin-top: -10%; 
  }
  .four{
    margin-top: -5%;
      position: relative;
      transform: scale(0.8);
      width: 100%;
  }
  .leftbutton {
      display: none;
  }
  .rightbutton{
      display: none;
  }
}
@media screen and (min-width: 601px) and (max-width: 1024px){
  .haveErrorText{
      margin-left: 35%;
}
}

@media screen and (min-width: 768px) and (max-width: 1200px) and (orientation: landscape){
  .haveErrorText{
      margin-left: 22%;
}
}

</style>
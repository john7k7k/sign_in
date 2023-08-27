<template>
    <v-container>
      <v-row no-gutters >
        <v-card class="mx-auto" width="800">
          <v-img
            class="align-end text-white"
            height="200"
            src="../assets/total3bg.png"
            @click="routefishdata"
            cover
          >
          
            <v-card-title class=" text-white">海科館魚池
              
              
            </v-card-title>
            
            
          </v-img> 
            <div class="d-flex align-center justify-space-between">
              <v-card-subtitle class="pt-1"> 紀錄時間:{{ time }} </v-card-subtitle>
            <v-btn class="mr-2 mt-1"  color="green" icon="mdi-refresh" size="small" @click="refreshData" :disabled="isRefreshing"></v-btn>
            </div>
          <v-card-text>
            <div>
            <v-row  no-gutters>
              <v-col v-for="n in links" :key="n" :cols="cols"  class=" d-flex align-center justify-center">
              <v-btn class="ma-2 " :color="n.color" :icon="n.icon " route to = "/nmmst/fish" @click="SaveIndividualData(n.level)"></v-btn>
              </v-col>
            </v-row>
            <v-row  no-gutters>
              <v-col v-for="n in links" :key="n" :cols="cols"  class=" d-flex align-center justify-center">
                <v-sheet class=" ">{{ n.textname }} </v-sheet> 
              </v-col>
            </v-row>
            <v-row  no-gutters>
              <v-col v-for="n in links" :key="n" :cols="cols"  class=" d-flex align-center justify-center">
                <v-sheet class="ma-2 text-h4">{{n.text}}</v-sheet> 
              </v-col>
            </v-row>
            <v-row  no-gutters>
              <v-col v-for="n in links" :key="n" :cols="cols"  class=" d-flex align-center justify-center mt-2">
                <v-btn rounded="xl" size="small" prepend-icon="mdi-battery-charging-10" color="orange" v-show="n.alertbcbutton" @click="SaveIndividualData(4)" route to = "/nmmst/fish"
                  >{{needchargenum}}條魚需充電</v-btn>
              </v-col>
            </v-row>
            <v-row  no-gutters>
              <v-col v-for="n in links" :key="n" :cols="cols"  class=" d-flex align-center justify-center mt-2" >
                <v-btn rounded="xl" size="small" prepend-icon="mdi-alert" color="red" v-show="n.alerterrbutton" @click="SaveIndividualData(5)" route to = "/nmmst/fish"
                  >{{needfixnum}}條魚有錯誤</v-btn>
              </v-col>
            </v-row>

          </div>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        FishId: [],
        FishId2num:null,
        needchargenum:0,
        needfixnum:0,
        bc: [],
        err: [],
        active: [],
        token:localStorage.getItem('token'),
        time: null,
        links: [ 
          { icon: 'mdi-fishbowl', text: ".", color: 'indigo-darken-1', textname: "游動中",level:1,alertbcbutton:false,alerterrbutton:false},
          { icon: 'mdi mdi-fish-off', text: ".", color: 'orange-darken-2', textname: "待機中",level:2,alertbcbutton:false,alerterrbutton:false},
          { icon: 'mdi-wrench', text: ".", color: 'black', textname: "維修中",level:3,alertbcbutton:false,alerterrbutton:false},
        ],
        isRefreshing: false,
        IP:process.env.VUE_APP_IP,
      };
    },
    methods: {
      processData(ids, data) {
        ids.forEach((id) => {
        const { bc, err, active } = data[id];
        this.bc.push(bc);
        this.err.push(err);
        this.active.push(active);
          });
      },
      async refreshData() {
      this.isRefreshing = true;
      await this.loadnewdata();
      await this.RefreshDatas();
      this.isRefreshing = false;
    },
      async RefreshDatas() {
  try {
    const fish1Data = localStorage.getItem("fish31");
    const parsedFish1Data = JSON.parse(fish1Data);
    this.FishId = parsedFish1Data;
    const FishIdNow = this.FishId.length;
    const fish0Data = localStorage.getItem("fish30");
    const parsedFish0Data = JSON.parse(fish0Data);
    this.FishId.push(...parsedFish0Data);
    this.FishId2num = this.FishId.length;
    const fish2Data = localStorage.getItem("fish32");
    const parsedFish2Data = JSON.parse(fish2Data);
    this.FishId.push(...parsedFish2Data);
    this.FishId = this.FishId.map((str) => {
      const num = parseInt(str, 10);
      return isNaN(num) ? 0 : num;
    });
    
    if (this.FishId != null) {
      this.bc = [];
      this.err = [];
      this.active = [];
      
      const response = await axios.get(
        "/api/v1/fish/data/?section=003&fishesID=" + this.FishId,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      
      console.log(response);
      const responseData = JSON.stringify(response.data["003"]);
      const parsedResponseData = JSON.parse(responseData);
      const currentTime = new Date();
      const year = currentTime.getFullYear();
      const month = String(currentTime.getMonth() + 1).padStart(2, '0');
      const day = String(currentTime.getDate()).padStart(2, '0');
      const hours = String(currentTime.getHours()).padStart(2, '0');
      const minutes = String(currentTime.getMinutes()).padStart(2, '0');
      const seconds = String(currentTime.getSeconds()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      this.time = formattedDate;
      localStorage.setItem("NewTime3", formattedDate);
      this.processData(this.FishId, parsedResponseData);
      
      for (let i = 0; i < FishIdNow; i++) {
        if (this.bc[i] < "20") this.needchargenum += 1;
      }
      for (let i = 0; i < FishIdNow; i++) {
        if (this.err[i] !== 0) this.needfixnum += 1;
      }
      if (this.needchargenum !== 0) {
        this.links[0].alertbcbutton = true;
      }
      if (this.needfixnum !== 0) {
        this.links[0].alerterrbutton = true;
      }
      
      this.links[0].text = this.active.filter((a) => a === 1).length;
      this.links[1].text = this.active.filter((a) => a === 0).length;
      this.links[2].text = this.active.filter((a) => a === 2).length;
      if (!this.isRefreshing) {
          this.isRefreshing = true;

          setTimeout(() => {
            this.isRefreshing = false;
          }, 1000); 
        }
      localStorage.setItem("NewId3", this.FishId);
      localStorage.setItem("NewBc3", this.bc);
      localStorage.setItem("NewErro3", this.err);
      localStorage.setItem("NewActive3", this.active);
    } else {
      alert("無資料");
    }
  } catch (error) {
    console.error('Error in RefreshDatas:', error);
  }
},
      SaveIndividualData(level){
        const fish1Data = localStorage.getItem("fish31");
        const parsedFish1Data = JSON.parse(fish1Data);
        this.FishId = parsedFish1Data
        const FishId1num = this.FishId.length
        const bcdatas = this.bc.slice(0, FishId1num);
        const errdatas = this.err.slice(0, FishId1num);
        const activedatas = this.active.slice(0, FishId1num);
        if(level === 1){
          localStorage.setItem("NewId3",this.FishId)
          localStorage.setItem("NewBc3", bcdatas);
          localStorage.setItem("NewErro3", errdatas);
          localStorage.setItem("NewActive3", activedatas);
        }  else if (level === 2){
          const fish0Data = localStorage.getItem("fish30");
          const parsedFish0Data = JSON.parse(fish0Data);
          this.FishId.push(...parsedFish0Data)
          const active0 = this.active.filter(value => value < 1);
          const active0index = this.active.map((value, index) => {
            if (value === 0) {
              return index;
            }
          }).filter(index => index !== undefined);
          const idResult = active0index.map(index => this.FishId[index]);
          const bcResult = active0index.map(index => this.bc[index]);
          const errResult = active0index.map(index => this.err[index]);
          localStorage.setItem("NewId3",idResult)
          localStorage.setItem("NewBc3", bcResult);
          localStorage.setItem("NewErro3", errResult);
          localStorage.setItem("NewActive3", active0);
        }else if(level === 4){
          const needcharge = bcdatas.filter(value => value < 20);
          const needchargeindex = needcharge.map((value) => bcdatas.indexOf(value));
          const idbcResult = needchargeindex.map(index => this.FishId[index]);
          const errbcResult = needchargeindex.map(index => errdatas[index]);
          const activebcResult = needchargeindex.map(index => activedatas[index]);
          localStorage.setItem("NewId3",idbcResult)
          localStorage.setItem("NewBc3", needcharge);
          localStorage.setItem("NewErro3", errbcResult);
          localStorage.setItem("NewActive3", activebcResult);
        }else if(level === 5){
          const needfix = errdatas.filter(value => value > 0);
          const needfixindex = needfix.map((value) => errdatas.indexOf(value));
          const idErrResult = needfixindex.map(index => this.FishId[index]);
          const bcErrResult = needfixindex.map(index => bcdatas[index]);
          const activeErrResult = needfixindex.map(index => activedatas[index]);
          localStorage.setItem("NewId3",idErrResult)
          localStorage.setItem("NewBc3", bcErrResult);
          localStorage.setItem("NewErro3", needfix);
          localStorage.setItem("NewActive3", activeErrResult);
        } else{
          const fish0Data = localStorage.getItem("fish30");
          const parsedFish0Data = JSON.parse(fish0Data);
          this.FishId.push(...parsedFish0Data)
          const fish2Data = localStorage.getItem("fish32");
          const parsedFish2Data = JSON.parse(fish2Data);
          this.FishId.push(...parsedFish2Data)
          const fixing = this.active.filter(value => value > 1);
          const fixindex = this.active.map((value, index) => {
            if (value === 2) {
              return index;
            }
          }).filter(index => index !== undefined);
          const idResult = fixindex.map(index => this.FishId[index]);
          const bcResult = fixindex.map(index => this.bc[index]);
          const errResult = fixindex.map(index => this.err[index]);
          localStorage.setItem("NewId3",idResult)
          localStorage.setItem("NewBc3", bcResult);
          localStorage.setItem("NewErro3", errResult);
          localStorage.setItem("NewActive3", fixing);
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
          const fish001Data = response.data.fishesID["003"];
          const fish20Values = [];
          const fish21Values = [];
          const fish22Values = [];

          if (Object.prototype.hasOwnProperty.call(response.data.fishesID, "003")) {
            Object.entries(fish001Data).forEach(([key, value]) => {
              if (value === 1) {
                fish21Values.push(key);
              } else if (value === 2) {
                fish22Values.push(key);
              } else {
                fish20Values.push(key);
              }
            });
          }

          localStorage.setItem("fish30", JSON.stringify(fish20Values));
          localStorage.setItem("fish31", JSON.stringify(fish21Values));
          localStorage.setItem("fish32", JSON.stringify(fish22Values));
        }
      } catch (error) {
        console.log(error);
      }
    },
      
      routefishdata(){
        this.$router.push('/nmmst/fish');
      }
    },
    async created() {
    await this.loadnewdata();
    await this.RefreshDatas();
  },
  };
  </script>
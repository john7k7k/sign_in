<template>
    <v-container>
      <v-row no-gutters >
        <v-card class="mx-auto" width="800">
          <v-img
            class="align-end text-white"
            height="200"
            src="../assets/totalbg.jpg"
            cover
          >
          
            <v-card-title class="d-flex align-center justify-space-between">北科魚池
              
              <v-btn   color="green" icon="mdi-refresh" size="small" @click="loadnewdata"></v-btn>
            </v-card-title>
            
            
          </v-img> 
            <v-card-subtitle class="pt-1"> 紀錄時間:{{ time }} </v-card-subtitle>
          <v-card-text>
            <div>
            <v-row  no-gutters>
              <v-col v-for="n in links" :key="n" :cols="cols"  class=" d-flex align-center justify-center">
              <v-btn class="ma-2 " :color="n.color" :icon="n.icon " route to = "/Fishdatas-Section1" @click="SaveIndividualData(n.level)"></v-btn>
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
      account:localStorage.getItem('username'),
      password:localStorage.getItem('password'),
      FishId: [],
      FishId2num:null,
      bc: [],
      err: [],
      active: [],
      token:null,
      time: localStorage.getItem('NewTime'),
      links: [
        { icon: 'mdi-fishbowl', text: 0, color: 'indigo-darken-1', textname: "游動中",level:1},
        { icon: 'mdi-battery-charging-10', text: 0, color: 'orange', textname: "需充電",level:2},
        { icon: 'mdi-alert', text: 0, color: 'red-darken-1', textname: "有錯誤",level:3},
        { icon: 'mdi-wrench', text: 0, color: 'black', textname: "維修中",level:4},
      ],
      computed: {
        cols() {
          const { lg, sm } = this.$vuetify.display;
          return lg ? 3 : sm ? 3 : 3;
        },
      },
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
    RefreshDatas() {
      this.links[1].text = 0; 
      this.links[2].text = 0; 
      const fish1Data = localStorage.getItem("fish21");
      const parsedFish1Data = JSON.parse(fish1Data);
      this.FishId = parsedFish1Data
      const FishIdNow = this.FishId.length
      const fish0Data = localStorage.getItem("fish20");
      const parsedFish0Data = JSON.parse(fish0Data);
      this.FishId.push(...parsedFish0Data)
      this.FishId2num = this.FishId.length
      const fish2Data = localStorage.getItem("fish22");
      const parsedFish2Data = JSON.parse(fish2Data);
      this.FishId.push(...parsedFish2Data)
      this.FishId = this.FishId.map((str) => {
              const num = parseInt(str, 10);
              return isNaN(num) ? 0 : num; 
            });
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].split("=");
          if (cookie[0] === "token") {
          const token = cookie[1];
          this.token = token;
          break;
          }
        }
      if (fish1Data != null) {
        this.bc = [];
        this.err = [];
        this.active = [];
        axios.get(
            "http://20.89.131.34:443/api/v1/fish/data/?section=002&fishesID="+this.FishId,{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              const responseData = JSON.stringify(res.data["002"]);
              const parsedResponseData = JSON.parse(responseData);
              const responseTime = parsedResponseData[this.FishId[0]]["time"];
              const timestamp = responseTime
              const date = new Date(timestamp);
              const year = date.getFullYear();
              const month = date.getMonth() + 1; 
              const day = date.getDate();
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();
              const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
              localStorage.setItem("NewTime",formattedDate)
              this.processData(this.FishId, parsedResponseData);
              for (let i = 0; i < FishIdNow; i++) {
              if (this.bc[i] < "30") this.links[1].text += 1;
            }
            for (let i = 0; i < FishIdNow; i++) {
              if (this.err[i] !== 0) this.links[2].text += 1;
            }
            this.links[0].text = this.active.filter((a) => a === 1).length;
            this.links[3].text = this.active.filter((a) => a === 2).length;
            localStorage.setItem("NewId2",this.FishId)
            localStorage.setItem("NewBc2", this.bc);
            localStorage.setItem("NewErro2", this.err);
            localStorage.setItem("NewActive2", this.active);
            
          })
          .catch(err=> {
              console.log(err);
          })
        
      } else {
        alert("無資料");
      }
    },
    SaveIndividualData(level){
      const fish1Data = localStorage.getItem("fish21");
      const parsedFish1Data = JSON.parse(fish1Data);
      this.FishId = parsedFish1Data
      const FishId1num = this.FishId.length
      const bcdatas = this.bc.slice(0, FishId1num);
      const errdatas = this.err.slice(0, FishId1num);
      const activedatas = this.active.slice(0, FishId1num);
      if(level === 1){
        localStorage.setItem("NewId2",this.FishId)
        localStorage.setItem("NewBc2", bcdatas);
        localStorage.setItem("NewErro2", errdatas);
        localStorage.setItem("NewActive2", activedatas);
      } else if(level === 2){
        const needcharge = bcdatas.filter(value => value < 20);
        const needchargeindex = needcharge.map((value) => bcdatas.indexOf(value));
        const idbcResult = needchargeindex.map(index => this.FishId[index]);
        const errbcResult = needchargeindex.map(index => errdatas[index]);
        const activebcResult = needchargeindex.map(index => activedatas[index]);
        localStorage.setItem("NewId2",idbcResult)
        localStorage.setItem("NewBc2", needcharge);
        localStorage.setItem("NewErro2", errbcResult);
        localStorage.setItem("NewActive2", activebcResult);
      } else if(level === 3){
        const needfix = errdatas.filter(value => value > 0);
        const needfixindex = needfix.map((value) => errdatas.indexOf(value));
        const idErrResult = needfixindex.map(index => this.FishId[index]);
        const bcErrResult = needfixindex.map(index => bcdatas[index]);
        const activeErrResult = needfixindex.map(index => activedatas[index]);
        localStorage.setItem("NewId2",idErrResult)
        localStorage.setItem("NewBc2", bcErrResult);
        localStorage.setItem("NewErro2", needfix);
        localStorage.setItem("NewActive2", activeErrResult);
      } else{
        const fish0Data = localStorage.getItem("fish20");
        const parsedFish0Data = JSON.parse(fish0Data);
        this.FishId.push(...parsedFish0Data)
        const fish2Data = localStorage.getItem("fish22");
        const parsedFish2Data = JSON.parse(fish2Data);
        this.FishId.push(...parsedFish2Data)
        const fixing = this.active.filter(value => value > 1);
        const fixindex = fixing.map((value) => this.active.indexOf(value));
        const idResult = fixindex.map(index => this.FishId[index]);
        const bcResult = fixindex.map(index => this.bc[index]);
        const errResult = fixindex.map(index => this.err[index]);
        localStorage.setItem("NewId2",idResult)
        localStorage.setItem("NewBc2", bcResult);
        localStorage.setItem("NewErro2", errResult);
        localStorage.setItem("NewActive2", fixing);
      }
      
    },

    loadnewdata(){
      axios.post(
            "http://20.89.131.34:443/api/v1/account/login",
            {
              "username":this.account,
              "password":this.password
            },
          )
          .then(res=> {
              console.log(res);
              this.loading = false;
              if(res.status == 200){
                const fish001Data = res.data.fishesID["002"];
                const fish20Values = [];
                const fish21Values = [];
                const fish22Values = [];
                const fish002Data = res.data.fishesID["003"];
                const fish30Values = [];
                const fish31Values = [];
                const fish32Values = [];
                if( Object.hasOwn(res.data.fishesID,"002")){
                  Object.entries(fish001Data).forEach(([key, value]) => {
                    if (value === 1) {
                      fish21Values.push(key);
                    } else if (value === 2) {
                      fish22Values.push(key)
                    } else {
                      fish20Values.push(key)
                    }
                  });
                }

                if(Object.hasOwn(res.data.fishesID,"003")){
                  
                  Object.entries(fish002Data).forEach(([key, value]) => {
                    if (value === 1) {
                      fish31Values.push(key)
                    } else if (value === 2) {
                      fish32Values.push(key)
                    } else {
                      fish30Values.push(key)
                    }
                  });
                }
                localStorage.setItem("fish20", JSON.stringify(fish20Values));
                localStorage.setItem("fish21", JSON.stringify(fish21Values));
                localStorage.setItem("fish22", JSON.stringify(fish22Values));
                localStorage.setItem("fish30", JSON.stringify(fish30Values));
                localStorage.setItem("fish31", JSON.stringify(fish31Values));
                localStorage.setItem("fish32", JSON.stringify(fish32Values));
                this.RefreshDatas()
              }
          })
          .catch(err=> {
              console.log(err);
          })
    }
  },
  mounted() {
    setTimeout(() => {
      this.RefreshDatas();
    }, 500);
  },
};
</script>

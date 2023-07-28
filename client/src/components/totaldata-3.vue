<template>
    <v-container>
      <v-row no-gutters >
        <v-card class="mx-auto" width="800">
          <v-img
            class="align-end text-white"
            height="200"
            src="https://rovmaker.com/wp-content/uploads/2022/08/robotic-fish-national-museum-of-marine-science-and-technology20220713-4-scaled.webp"
            cover
          >
          
            <v-card-title class="d-flex align-center justify-space-between text-black">海科館魚池
              
              <v-btn   color="green" icon="mdi-refresh" size="small"></v-btn>
            </v-card-title>
            
            
          </v-img> 
            <v-card-subtitle class="pt-1"> 紀錄時間: </v-card-subtitle>
          <v-card-text>
            <div>
            <v-row  no-gutters>
              <v-col v-for="n in links" :key="n" :cols="cols"  class=" d-flex align-center justify-center">
              <v-btn class="ma-2 " :color="n.color" :icon="n.icon " route to = "/Fishdatas-Section2" ></v-btn>
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
      FishId: [],
      bc: [],
      err: [],
      active: [],
      token:null,
      time: localStorage.getItem('NewTime'),
      links: [
        { icon: 'mdi-fishbowl', text: 0, color: 'indigo-darken-1', textname: "游動中" },
        { icon: 'mdi-battery-charging-10', text: 0, color: 'orange', textname: "需充電" },
        { icon: 'mdi-alert', text: 0, color: 'red-darken-1', textname: "有錯誤" },
        { icon: 'mdi-wrench', text: 0, color: 'black', textname: "維修中" },
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
    RefreshDatas3() {
      this.links[1].text = 0; 
      this.links[2].text = 0; 
      const fish1Data = localStorage.getItem("fish31");
      const parsedFish1Data = JSON.parse(fish1Data);
      this.FishId = parsedFish1Data
      const FishIdNow = this.FishId.length
      const fish0Data = localStorage.getItem("fish30");
      const parsedFish0Data = JSON.parse(fish0Data);
      this.FishId.push(...parsedFish0Data)
      const fish2Data = localStorage.getItem("fish32");
      const parsedFish2Data = JSON.parse(fish2Data);
      this.FishId.push(...parsedFish2Data)
      this.FishId = this.FishId.map((str) => {
              const num = parseInt(str, 10);
              return isNaN(num) ? 0 : num; 
            });
      const cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].split("=");
          if (cookie[0] === "token") {
          const token = cookie[1];
          this.token = token;
          break;
          }
        }
      if (this.FishId != null) {
        this.bc = [];
        this.err = [];
        this.active = [];
        axios.get(
            "http://20.89.131.34:443/api/v1/fish/data/?section=003&fishesID="+this.FishId,{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              const responseData = JSON.stringify(res.data["003"]);
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
            localStorage.setItem("NewBc3", this.bc);
            localStorage.setItem("NewErro3", this.err);
            localStorage.setItem("NewActive3", this.active);
          })
          .catch(err=> {
              console.log(err);
          })
        
      } else {
        alert("無資料");
      }
    },
  },
  created() {
    this.RefreshDatas3();
  },
};
</script>
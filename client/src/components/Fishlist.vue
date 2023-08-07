<template>
    <v-container>
    <div class="d-flex justify-center"><h2>仿生魚清單</h2></div>
    <div class="section1 mt-4"><h4>北科</h4></div>
    <v-card class="mx-auto mt-2" max-width="600" v-for="id in FishId" :key="id">
    <div class="d-flex align-center justify-space-between pl-4" >
      <h3>ID:{{ id }}</h3>
      <v-card-actions>
        <v-btn
          :icon="fishdatas[id]?.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="toggleShow(id)"
        ></v-btn>
      </v-card-actions>
    </div>

    <v-expand-transition>
      <div v-show="fishdatas[id]?.show" >
        <v-divider></v-divider>

        <v-card-text v-for="fish in fishdatas[id]" :key="fish">
          <div>版本: {{ fish.version }} &nbsp; 時間: {{ formatDate(fish.time) }}  &nbsp; 錯誤:{{ fish.err }} &nbsp; 狀態:{{fish.active}}</div>
          <v-divider class="ma-2"></v-divider>
          
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
    </v-container>
  </template>
  
  <script>
import axios from 'axios';

    export default {
      data() {
        return {
            userdatas:[],
            token:null,
            show: false,
            FishId: [],
            fishdatas:[],
            version:[],
        }
      },
      methods: {
      processData(ids, data) {
        ids.forEach((id) => {
        const { version } = data[id];
        this.version.push(version);
            });
        },
      accountdata(){
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split("=");
            if (cookie[0] === "token") {
            const token = cookie[1];
            this.token = token;
            break;
            }
        }
        this.loadnewdata();
        const fish1Data = localStorage.getItem("fish21");
        const parsedFish1Data = JSON.parse(fish1Data);
        this.FishId = parsedFish1Data
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
        this.FishId.sort((a, b) => a - b);
                axios.get(
            "http://20.89.131.34:443/api/v1/fish/table/?section=002&fishesID="+this.FishId,{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
            console.log(res);
            this.fishdatas = {};
            for (const id in res.data['002']) {
            const dataArray = res.data['002'][id];
            if (!this.fishdatas[id]) {
                this.fishdatas[id] = [];
            }
            const lastFiveObjects = dataArray.slice(-5);
            const reversedLastFive = lastFiveObjects.reverse();
            this.fishdatas[id] = reversedLastFive;
            this.fishdatas[id].show = false;
            }
          })
          .catch(err=> {
              console.log(err);
          })
        axios.get(
            "http://20.89.131.34:443/api/v1/account/list/?section=001",{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              for(const obj of res.data){
                const {email,level,registrationTime,section,username,userID} = obj;
                const newData = {
                    username,
                    email,
                    level,
                    registrationTime,
                    section,
                    userID,
                    show:false,
                }
                this.userdatas.push(newData)
            }
              })
          .catch(err=> {
              console.log(err);
          })
          
        
      },
    toggleShow(index) {
      this.fishdatas[index].show = !this.fishdatas[index].show
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
                
              }
          })
          .catch(err=> {
              console.log(err);
          })
    },
    formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
    },
    
    
    mounted() {
      this.accountdata();
    },
    }
  </script>
  
  <style>
  .section1{
    padding-left: 290px;
  }

  @media screen and (max-width: 600px){
    .section1{
    padding-left: 10px;
  }
  }
  </style>
  
<template>
    <v-text-field
        v-model="searchId"
        append-icon="mdi-magnify"
        label="搜尋ID"
        hide-details
        class="mb-2 mt-4"
        style="width: 200px;"
      ></v-text-field>   
      <div class="mt-4"><h3>海科</h3></div>
    <Table  :border="true" :columns="columns" :data="filteredData">
    <template #id="{ row }">
      <strong>{{ row.id }}</strong>
    </template>
    <template #action="{ row: { id } }">
      <v-btn prepend-icon="mdi-square-edit-outline"
          color="light-blue-lighten-3" @click="fishdatas[id].show = true"> 編輯 </v-btn>

    <v-dialog v-model="fishdatas[id].show" width="auto">
      <v-card>
        <div class="d-flex justify-center mt-2"><h3>歷史資料</h3></div>
        <v-card-text v-for="fish in fishdatas[id]" :key="fish">
          
          <div>
            版本: {{ fish.version }} &nbsp; 時間: {{ formatDate(fish.time) }}
            &nbsp; 錯誤:{{ fish.err }} &nbsp; 狀態:{{fish.active}}
          </div>
          <v-divider class="ma-2"></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="fishdatas[id].show = false"
            >關閉</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    </template>
  </Table>
  </template>
  
  <script>
import axios from 'axios';

    export default {
      data() {
        return {
            userdatas:[],
            token:localStorage.getItem('token'),
            show: false,
            FishId: [],
            fishdatas:[],
            version:[],
            lastdatas:[],
            time:[],
            columns: [
                    {
                        title: 'ID',
                        slot: 'id'
                    },
                    {
                        title: '版本',
                        key: 'version'
                    },
                    {
                        title: '更新時間',
                        key: 'time'
                    },
                    {
                        title: '編輯',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
            data: [],
            searchId:'',
            dialog: false,
            IP:process.env.VUE_APP_IP,
        }
      },
      computed: {
    filteredData() {
        if (!this.searchId) {
          return this.data;
        } else {
          return this.data.filter(item => {
            const itemId = item.id.toString(); 
            return itemId.includes(this.searchId.toLowerCase());
          });
        }
      }
  },
      methods: {
      processData(ids, data) {
        ids.forEach((id) => {
        const { version,time } = data[id];
        this.version.push(version);
        this.time.push(time);
            });
        },
      accountdata(){
        this.loadnewdata();
        const fish1Data = localStorage.getItem("fish31");
        const parsedFish1Data = JSON.parse(fish1Data);
        this.FishId = parsedFish1Data
        const fish0Data = localStorage.getItem("fish30");
        const parsedFish0Data = JSON.parse(fish0Data);
        this.FishId.push(...parsedFish0Data)
        this.FishId2num = this.FishId.length
        const fish2Data = localStorage.getItem("fish32");
        const parsedFish2Data = JSON.parse(fish2Data);
        this.FishId.push(...parsedFish2Data)
        this.FishId = this.FishId.map((str) => {
                const num = parseInt(str, 10);
                return isNaN(num) ? 0 : num; 
                });
        this.FishId.sort((a, b) => a - b);
                axios.get(
                    "http://"+this.IP+"/api/v1/fish/table/?section=003&fishesID="+this.FishId,{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
            console.log(res);
            this.fishdatas = {};
            for (const id in res.data['003']) {
            const dataArray = res.data['003'][id];
            if (!this.fishdatas[id]) {
                this.fishdatas[id] = [];
            }
            const lastFiveObjects = dataArray.slice(-5);
            const reversedLastFive = lastFiveObjects.reverse();
            this.fishdatas[id] = reversedLastFive;
            this.fishdatas[id].show = false;
            }
            for (const id in res.data['003']) {
              const dataArray = res.data['003'][id];
              const { version,time } = dataArray[dataArray.length-1];
              this.version.push(version);
              this.time.push(time);
            }
            this.data = this.FishId.map((item,index) => ({
              id: this.FishId[index],
              version: this.version[index],
              time: this.formatDate(this.time[index])
            }));
          })
          .catch(err=> {
              console.log(err);
          })
        
      },
    toggleShow(index) {
      this.fishdatas[index].show = !this.fishdatas[index].show
    },
    formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}-${month}-${day}`;
  },
  loadnewdata(){
        axios.get(
            "http://"+this.IP+"/api/v1/account",{
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }
            )
            .then(res=> {
                console.log(res);
                this.loading = false;
                if(res.status == 200){
                  const fish002Data = res.data.fishesID["003"];
                  const fish30Values = [];
                  const fish31Values = [];
                  const fish32Values = [];
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
                  localStorage.setItem("fish30", JSON.stringify(fish30Values));
                  localStorage.setItem("fish31", JSON.stringify(fish31Values));
                  localStorage.setItem("fish32", JSON.stringify(fish32Values));
                }
            })
            .catch(err=> {
                console.log(err);
            })
      },
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
  
<template>
    <v-container>
    <div class="d-flex justify-center"><h2>仿生魚清單</h2></div>
    
    
    </v-container>
    <v-text-field
        v-model="searchId"
        append-icon="mdi-magnify"
        label="搜尋ID"
        hide-details
        class="mb-2"
        style="width: 200px;"
      ></v-text-field>   
      <div class="mt-4"><h3>北科</h3></div>
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
            "/api/v1/fish/table/?section=002&fishesID="+this.FishId,{
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
            for (const id in res.data['002']) {
              const dataArray = res.data['002'][id];
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
        axios.get(
            "/api/v1/account/list/?section=001",{
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
            "/api/v1/account/login",
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

    return `${year}-${month}-${day}`;
  },
  show2 (index) {
                alert(index)
            },
  remove (index) {
                this.data.splice(index, 1);
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
  
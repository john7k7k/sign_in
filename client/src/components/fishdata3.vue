<template>
    <v-container>
      <v-row no-gutters justify="center">
        <v-card class="mx-auto" width="1200">
          <v-img
            class="align-end text-white"
            height="100"
            src="../assets/total3bg.png"
            cover
          >
          <v-card-title class="d-flex align-center justify-space-between">海科魚池
              </v-card-title>
          </v-img>
          <v-card-subtitle class="pt-1 pb-1 d-flex align-center justify-space-between"> 紀錄時間: {{ time }}
            <div>
              <v-dialog
      v-model="dialog"
      width="1024"
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="purple-darken-2 mr-2"
          icon="mdi mdi-plus-thick"
          size="small"
          v-bind="props"
        >
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="blue-accent-1">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>新增資料</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn variant="text" @click="newdatas"> 新增 </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list-subheader class="mx-4">基本資料</v-list-subheader>
  
        <v-row class="d-flex justify-space-around">
          <v-col>
            <v-list-item title="ID">
              <v-text-field
                v-model="NewId"
                title="ID:"
              ></v-text-field>
            </v-list-item>
          </v-col>
          <v-col>
            <v-list-item title="電量(%):">
              <v-text-field v-model="NewBc" ></v-text-field>
            </v-list-item>
          </v-col>
        </v-row>
  
        <v-row class="d-flex justify-space-around">
          <v-col>
            <v-list-item title="錯誤:">
              <v-text-field v-model="NewErro" ></v-text-field>
            </v-list-item>
          </v-col>
          <v-col>
            <v-list-item title="狀態:">
              <v-select v-model="SelectActive" :items="active"></v-select>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
              <v-btn   color="green-darken-4" icon="mdi mdi-update" size="small" @click="RefreshFishDatas" ></v-btn>
            </div>
            
          </v-card-subtitle>
          
        </v-card>
      </v-row>
    </v-container>
    <div>
      <v-container class="mb-6">
        <v-row  no-gutters style="height: 80px" class="d-flex align-content-start  flex-wrap ">
          <v-col v-for="fish in datas" :key="fish" :cols="cols" class="d-flex align-content-start  flex-wrap ">
            <v-card
              class="pa-2 ma-2 mx-auto "
              cover
              image="https://img.freepik.com/premium-vector/seamless-ocean-bottom-underwater-coral-reef-silhouette-with-sea-plants-fish-seaweed-flat-seascape-with-undersea-life-vector-pattern-landscape-with-sand-deep-water-nature_102902-4648.jpg?size=626&ext=jpg&ga=GA1.1.688371840.1688498556&semt=sph"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">ID:{{fish.id}}</v-card-title>
                  <v-card-actions>
                  <div class="text-black mx-1">電量:</div>
                  
                    <div class="ma-1 pa-1 " :style="{ backgroundColor: fish.color }">
                      <div class="font-weight-medium text-grey-darken-5">
                        {{fish.bc}}
                      </div>
                    </div></v-card-actions>
                    <v-card-actions> 
                  <div class="text-black mx-1 ">錯誤量:</div>
                  <div class="ma-1 pa-1  ">
                      <div class="text-red " >
                      <v-dialog
    v-model="fish.dialogerr"
    width="600"
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        :icon="`mdi-numeric`"
        border
        height="30"
        width="30"
        v-bind="props"
        class="text-decoration-underline"
        @click="ErroVideo(fish.id)"
      >{{fish.errornum}}</v-btn>
    </template>
    <v-card>
      <v-table fixed-header height="300px">
        <thead>
          <tr>
            <th class="text-left">時間</th>
            <th class="text-">錯誤</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in getFishErrorsById(fish.id)" :key="index">
            <td>{{ item.time }}</td>
            <td>{{ item.error }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-card-actions class="d-flex justify-space-between">
  <v-select v-model="SelectTime" :items="Errortimes" class="flex-grow-1"></v-select>
  <v-btn
    prepend-icon="mdi mdi-magnify"
    class="ml-3 mb-2 bg-grey"
    to="/EditDatas"
  >查詢</v-btn>
</v-card-actions>
      <v-card-actions>
        <v-btn color="primary" block @click="fish.dialogerr = false">關閉</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

                      </div>
                    </div></v-card-actions
                  >
  
                  <v-card-actions>
                    <v-btn prepend-icon="mdi-square-edit-outline"
                    class="ms-2 bg-black"
                    variant="outlined"
                    route to = "/EditDatas"
                    size="small"  @click="editFish(fish.id, $event)"> 編輯 </v-btn>
                  </v-card-actions>
                </div>
  
                <v-avatar class="ma-3 " size="150" rounded="0">
                  <v-img
                    class=" mt-6 pt-3"
                    
                    src="../assets/1.png"
                  ></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  <script>
  import axios from 'axios'
  function TranActive(active) {
    if (active == "功能正常-待機中") {
      return 0;
    } else if (active === "活動中") {
      return 1;
    } else if (active === "維修中") {
      return 2;
    } else {
      return -1;
    }
  }
  
    export default {
      data() {
        return {
          token:null,
          FishId:[],
          bc: [],
          err: [],
          FishActive: [],
          datas: [],
          dialog: false,
          notifications: false,
          sound: true,
          widgets: false,
          NewId:null,
          NewBc:null,
          NewErro:null,
          SelectActive:null,
          SelectTime:"請選擇想要查詢的影片時段",
          Errortimes:{},
          time: localStorage.getItem('NewTime'),
          active:[
              "功能正常-待機中",
              "活動中",
              "維修中"
          ],
          errnum:[],
          FishErrors: [],
        }
      },
      methods:{
        newdatas () {
          const cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split("=");
            if (cookie[0] === "token") {
            const token = cookie[1];
            this.token = token;
            break;
    }
  }
  
          axios.post(
              "http://20.89.131.34:443/api/v1/fish/data/?section=003",{
                "fishData": {
                  [this.NewId] : {"bc": this.NewBc, "err": this.NewErro,"active":TranActive(this.SelectActive)},
      }
              },{
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }
            )
            .then(res=> {
                console.log(res);
                if(res.status == 200){
                  this.dialog = false
                  alert("新增成功")
                }
                else{
                  this.dialog = false
                alert("新增失敗")
                }
                
            })
            .catch(err=> {
                console.log(err);
                this.dialog = false
                alert('新增失敗');
            })
  
          },
          RefreshFishDatas(){
            if(this.FishId != null){
              const fish1Data = localStorage.getItem("fish31");
              const parsedFish1Data = JSON.parse(fish1Data);
              this.FishId = parsedFish1Data
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
              const bcData = localStorage.getItem("NewBc3");
              const errData = localStorage.getItem("NewErro3");
              const fishActiveData = localStorage.getItem("NewActive3");
              if (bcData && errData && fishActiveData) {
                this.bc = bcData.split(',').map(Number);
                this.err = errData.split(',').map(Number);
                this.FishActive = fishActiveData.split(',').map(Number);
              }
              this.datas = this.FishId.map((id, index) => ({
                id: id,
                bc: this.bc[index] + '%',
                error: this.err[index],
                active: this.FishActive[index],
                color: this.getColor(this.bc[index]),
                errornum:this.countNumbersInString(this.err[index]),
                dialogerr: false,
              }));
  
            }else{
              alert("無資料")
            }
  
          },
          processData(ids, data) {
            ids.forEach((id) => {
            const { bc, err, active } = data[id];
            this.bc.push(bc);
            this.err.push(err);
            this.FishActive.push(active);
          });
      },
      getColor(bcValue) {
        if (bcValue >= 80) {
          return '#69F0AE'; 
        } else if (bcValue >= 50 && bcValue < 80) {
          return '#1E88E5'; 
        }else if (bcValue >= 20 && bcValue < 50) {
          return '#FFFF8D'; 
        } else {
          return '#EF5350'; 
        }
      },

        countNumbersInString(input) {
          if (input === 0) {
            return 0;
          }
          const inputStr = input.toString();
          const numbersArray = inputStr.match(/\d+/g);
          if (!numbersArray) {
           return 0;
          }
          return numbersArray.length;
          },

        editFish(fishId, event) {
          event.stopPropagation();
          const index = this.FishId.indexOf(fishId)
          localStorage.setItem("EditId", fishId);
          localStorage.setItem("EditBc", this.bc[index]);
          localStorage.setItem("EditErr", this.err[index]);
          if(this.datas[index].active === 0){
            localStorage.setItem("EditActive", this.active[0]);
          } else if(this.datas[index].active === 1){
            localStorage.setItem("EditActive", this.active[1]);
          } else{
            localStorage.setItem("EditActive", this.active[2]);
          }
        },

      ErroVideo(fishId) {
        const index = this.datas.findIndex((fish) => fish.id === fishId);
        if (index !== -1) {
          this.datas[index].dialogerr = true;
          const errorMapping = {
              "0" : "無錯誤",
              "1" : "AGUE電量傳送異常 量測",
              "2" : "GAGUE電量接收異常",
              "3" : "GAGUE電流傳送異常",
              "4" : "GAGUE電流接收異常",
              "5" : "CHARGER電流上限設至失敗 充電",
              "6" : "CHARGER看門狗鎖定失敗",
              "7" : "CHARGER看門狗解鎖失敗",
              "8" : "PMIC設置錯誤 供電",
              "9" : "重心馬達做動異常 重心",
              "10" : "第一關節輸入電壓異常 關節",
              "11" : "第一關節溫度過高",
              "12" : "第一關節編碼器異常",
              "13" : "第一關節電擊異常",
              "14" : "第一關節過載",
              "15" : "第二關節輸入電壓異常",
              "16" : "第二關節溫度過高",
              "17" : "第二關節編碼器異常",
              "18" : "第二關節電擊異常",
              "19" : "第二關節過載",
              "20" : "第一關節通訊中斷",
              "21" : "第二關節通訊中斷",
              "22" : "雙關節通訊中斷",
              "23" : "第一關節電源線不穩",
              "24" : "第二關節電源線不穩"
          };
          const errorData = {
            time: this.time,
            error: errorMapping[this.err[index]],
          };
          if (!this.FishErrors[fishId]) {
            this.FishErrors[fishId] = []; 
          }
          if (this.FishErrors[fishId].length === 0 || this.FishErrors[fishId][this.FishErrors[fishId].length - 1].time !== this.time) {
            this.FishErrors[fishId].push(errorData);
            if(this.FishErrors[fishId][this.FishErrors[fishId].length - 1].error !== "無錯誤"){
              if (!this.Errortimes[fishId]) {
                  this.Errortimes[fishId] = [];
              }
              this.Errortimes[fishId].push(this.time);
              }
          }
        }
      },
    getFishErrorsById(fishId) {
      return this.FishErrors[fishId] 
    },
      },
      
      computed: {
        state() {
          if (this.datas[4].active === 2) return '維修中'
          return '45'
        },
        cols() {
          const { lg, sm } = this.$vuetify.display
          return lg ? 4 : sm ? 12 :12
        },
      },
      created() {
      this.RefreshFishDatas();
    },
      
    }
  </script>
  
  <style>
      .dialog-bottom-transition-enter-active,
      .dialog-bottom-transition-leave-active {
        transition: transform 0.2s ease-in-out;
      }
  
    </style>
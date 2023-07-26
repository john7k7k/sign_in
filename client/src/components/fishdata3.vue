<template>
    <v-container>
      <v-row no-gutters justify="center">
        <v-card class="mx-auto" width="1200">
          <v-img
            class="align-end text-white"
            height="100"
            src="https://rovmaker.com/wp-content/uploads/2022/08/robotic-fish-national-museum-of-marine-science-and-technology20220713-4-scaled.webp"
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
          <v-toolbar-title>新增魚資料</v-toolbar-title>
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
                  
                    <div class="ma-1 pa-1  bg-deep-orange-lighten-2">
                      <div class="font-weight-medium text-grey-darken-5">
                        {{fish.bc}}
                      </div>
                    </div></v-card-actions>
                    <v-card-actions> 
                  <div class="text-black mx-1 ">錯誤:</div>
                  <div class="ma-1 pa-1  bg-deep-orange-lighten-2">
                      <div class="font-weight-medium text-grey-darken-5">
                        {{fish.erro}}
                      </div>
                    </div></v-card-actions
                  >
  
                  <v-card-actions>
            <v-btn prepend-icon="mdi-square-edit-outline"
                      class="ms-2 bg-black"
                      variant="outlined"
                      route to = "/EditDatas"
                      size="small" v-bind="props"> 開始編輯 </v-btn>
                  </v-card-actions>
                </div>
  
                <v-avatar class="ma-3 " size="150" rounded="0">
                  <v-img
                    class="my-5"
                    
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
          time: localStorage.getItem('NewTime'),
          active:[
              "功能正常-待機中",
              "活動中",
              "維修中"
          ],
          
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
              "http://20.89.131.34:443/api/v1/fish/data/?section=001",{
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
              const fish1Data = localStorage.getItem("fish21");
              const parsedFish1Data = JSON.parse(fish1Data);
              this.FishId = parsedFish1Data
              const fish0Data = localStorage.getItem("fish20");
              const parsedFish0Data = JSON.parse(fish0Data);
              this.FishId.push(...parsedFish0Data)
              const fish2Data = localStorage.getItem("fish22");
              const parsedFish2Data = JSON.parse(fish2Data);
              this.FishId.push(...parsedFish2Data)
              this.FishId = this.FishId.map((str) => {
                const num = parseInt(str, 10);
                return isNaN(num) ? 0 : num; 
              });
              alert(this.FishId)
              this.bc = localStorage.getItem("NewBc").split(',').map(Number);
              this.err = localStorage.getItem("NewErro").split(',').map(Number);
              this.FishActive = localStorage.getItem("NewActive").split(',').map(Number);
              this.datas = this.FishId.map((id, index) => ({
                id: id,
                bc: this.bc[index] + '%',
                erro: this.err[index] === 0 ? '無錯誤' : this.err[index],
                active: this.FishActive[index]
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
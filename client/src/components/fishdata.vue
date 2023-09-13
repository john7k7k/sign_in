<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-card class="mx-auto" width="1200">
        <v-img
          class="align-end text-white"
          height="100"
          src="../assets/totalbg.jpg"
          cover
        >
        <v-card-title class="d-flex align-center justify-space-between">{{ poolname }}
            </v-card-title>
        </v-img>
        <v-card-subtitle class="pt-1 pb-1 d-flex align-center justify-space-between "> 紀錄時間:{{ time }}
          <div >
            <v-dialog
    v-model="dialogControl"
    width="500"
    :scrim="false"
    :persistent="true"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="purple-darken-2 mr-1"
        icon="mdi mdi-gamepad-variant"
        size="small"
        v-bind="props"
      >
      </v-btn>
    </template>
    <v-card color="black">
      <div class="text-center mt-2" ><h2>仿生魚控制</h2></div>
      <v-divider color="grey-lighten-5" :thickness="3" class="mt-1"></v-divider>
      <v-row class="mt-3">
  <v-col>
    <div class="d-flex flex-column align-center">
      <h4>ID</h4>
      <v-divider width="50" class="border-opacity-100"
  color="yellow" :thickness="4"></v-divider>
      <v-select :items="FishId" v-model="controlFishId"></v-select>
    </div>
  </v-col>
  <v-col>
    <div class="d-flex flex-column align-center">
      <h4>模式</h4>
      <v-divider width="50" class="border-opacity-100"
  color="blue" :thickness="4"></v-divider>
      <v-select :items="models"></v-select>
    </div>
  </v-col>
</v-row>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="blue"  icon="mdi mdi-arrow-up-drop-circle-outline" size="x-large" width="100" height="100" ></v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-row > 
          <v-col class="d-flex justify-center align-center">
            <v-btn color="yellow" icon="mdi mdi-arrow-left-drop-circle-outline" size="x-large" width="80" height="80" ></v-btn>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-btn color="white" icon="mdi mdi-gesture-tap" size="x-large" width="80" height="80" @click="ControlFish('')"></v-btn>
          </v-col>
          <v-col class="d-flex justify-center align-center">
            <v-btn color="yellow" icon="mdi mdi-arrow-right-drop-circle-outline" size="x-large" width="80" height="80" ></v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="blue"  icon="mdi mdi-arrow-down-drop-circle-outline" size="x-large" width="100" height="100" ></v-btn>
      </v-card-actions>

      <v-card-actions>
        <v-btn color="white" block @click="dialogControl = false">關閉</v-btn>
      </v-card-actions>
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
            class="pa-2 ma-2 mx-auto cardbg "
            cover
            width="320"          
            >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5 ">ID:{{fish.id}}</v-card-title>
                <v-card-actions>
                <div class="text-black mx-1" >電量:</div>
                
                  <div class="ma-1 pa-1  " :style="{ backgroundColor: fish.color }">
                    <div class="font-weight-medium text-black">
                      {{fish.bc}}
                    </div>
                  </div></v-card-actions>
                  <v-card-actions> 
                <div class="text-black mx-1 ">狀態:  {{ fish.activeword }}</div>
                </v-card-actions>
                <v-card-actions>
          <v-btn prepend-icon="mdi-square-edit-outline"
                    class="ms-2 bg-black"
                    variant="outlined"
                    :to = "'/'+poolname+'/fish/edit'"
                    size="small"  @click="editFish(fish.id, $event)"> 編輯 </v-btn>
                    <div class="ma-1 pa-1">
                              <div  >
                                <v-dialog
              v-model="fish.dialogerr"
              width="600"
              :scrim="false"
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-show="fish.bellshow"
                  icon="mdi mdi-bell-ring"
                  width="30"
                  height="30"
                  v-bind="props"
                  @click="ErroVideo(fish.id)"
                  color="red"
                ></v-btn>
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
            <v-select v-show="false" v-model="SelectTime" :items="Errortimes[fish.id]" class="flex-grow-1"></v-select>
            <v-btn
              v-show="false"
              prepend-icon="mdi mdi-magnify"
              class="ml-3 mb-2 bg-grey"
              @click="searchvideo"
            >查詢</v-btn>
            <div v-if="videoUrl">
      <video controls id="videoPlayer" ref="videoPlayer">
        <source :src="videoUrl" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
          </v-card-actions>
                <v-card-actions>
                  <v-btn color="primary" block @click="fish.dialogerr = false">關閉</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
                              </div>
                  </div>
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="150" rounded="0" style="position: relative;">
                <v-img class="mt-6 pt-3" src="../assets/1.png"></v-img>
                <v-btn
                  icon="mdi-numeric-null"
                  height="10"
                  width="10"
                  :style="{ backgroundColor: geterrcolor(fish.active,fish.errornum), position: 'absolute', top: '0', left: '95%', transform: 'translateX(-50%)' }"
                ></v-btn>
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

  export default {
    data() {
      return {
        token:localStorage.getItem('token'),
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
        SelectTime:"請選擇想要查詢的錯誤影片時段",
        Errortimes:{},
        time: localStorage.getItem('NewTime'),
        active:[
            "功能正常-待機中",
            "活動中",
            "維修中"
        ],
        errnum:[],
        FishErrors: [],
        dialogControl:false,
        models:[
          "自動",
          "急速",
          "急速悠游",
          "沿牆",
        ],
        controlFishId:null,
        videoData: null,
        videoUrl: null,
        IP:process.env.VUE_APP_IP,
        poolname:localStorage.getItem('Poolname'),
      }
    },
    methods:{
      
        RefreshFishDatas(){
            const iddata = localStorage.getItem("Id");
            const bcData = localStorage.getItem("Bc");
            const errData = localStorage.getItem("Erro");
            const fishActiveData = localStorage.getItem("Active");
            if (bcData && errData && fishActiveData && iddata) {
                this.FishId = iddata.split(',').map(num => parseInt(num.toString().slice(-4)));
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
              bellshow: this.bellshowfunction(this.err[index],this.FishActive[index]),
              activeword: this.getactiveword(this.FishActive[index],this.err[index])
            }));

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
      return ''; 
    } else if (bcValue >= 50 && bcValue < 80) {
      return ''; 
    }else if (bcValue >= 20 && bcValue < 50) {
      return '#FFFF8D'; 
    } else {
      return '#EF5350'; 
    }
  },
  geterrcolor(active,errnum){
    if(active === 2){
      return '#BDBDBD';
    }else if (active === 0){
      return '#FFA726';
    }else if (errnum > 0 ){
      return '#E53935';
    }else {
      return '#00E676';
    }
  },
  getactiveword(active,err){
    if(active === 2){
      return '維修中'
    }else if (active === 0){
      return '待機中'
    }else if (err !== 0 ){
      return '有錯誤'
    }else {
      return '游動中'
    }
  },
  bellshowfunction(err,active){
    if(err !== 0 && active === 1 ){
      return true
    }else{
      return false
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
      if (index !== -1 ) {
        this.datas[index].dialogerr = true;
        const errorMapping = {
            "0" : "無錯誤",
            "1" : "AGUE電量傳送異常 量測",
            "2" : "GAGUE電量接收異常",
            "3" : "GAGUE電流傳送異常",
            "4" : "GAGUE電流接收異常",
            "5" : "CHARGER電流上限設置失敗 充電",
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
    searchvideo(){
axios.get(
        "/api/v1/video/?video_uid=0021",
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          responseType: 'blob', 
        }
      )
      .then(res => {
        const blob = new Blob([res.data], { type: 'video/mp4' });
          const videoURL = URL.createObjectURL(blob);
          this.$refs.videoPlayer.src = videoURL; 
          this.$refs.videoPlayer.play(); 
      })
      .catch(err => {
        console.log(err);
      });
    },
    getFishErrorsById(fishId) {
      return this.FishErrors[fishId] 
    },
    ControlFish(move) {
        axios.post(
                "/api/v1/fish/control/?section="+this.poolname,{
                  "fishControl":{
            "led":{
            },
            "motion":{
              "id": this.controlFishId,
              "motion": move
            },
            "mode":{
              "id": this.controlFishId,
              "mode": 0
            }
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
                this.$Message.success('可以開始控制');
              }
              else
              this.$Message.error('控制失敗');
          })
          .catch(err=> {
              console.log(err);
              this.$Message.error('控制失敗');
          })
        },
        
        
      
    },
    
    computed: {
      state() {
        if (this.datas[4].active === 2) return '維修中'
        return '45'
      },
      cols() {
        const { xl, lg, md ,sm } = this.$vuetify.display; 
        return xl || lg  ? 4 : sm || md ?  6:12;
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

    .align-center {
  align-items: center;
}

  .cardbg{
    background-image: url('../assets/card.png');
    background-size: cover;
    background-position: center;
  }
  


  
  </style>

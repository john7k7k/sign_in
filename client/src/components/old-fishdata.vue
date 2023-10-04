<template>
    <v-img
        src="../assets/rectangle.png"
        alt="Rectangle"
        class="rectangle"
        width="20"
      />
    <div class="d-flex align-center justify-space-between">
      <div class="text-white  pooltext"><h1>{{ poolname }}</h1></div>
      <v-dialog
    v-model="dialogControl"
    width="500"
    :scrim="false"
    :persistent="true"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn 
        class="mr-8 mt-6 text-white btn-bg"
        icon="mdi mdi-gamepad-variant"
        size="45"
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
    </div>
    
    <div class="text-white d-flex align-center justify-space-between  mb-10">
      <div class="recordtext">紀錄時間:{{ time }}</div>
      <v-btn  class="mr-8 mb-5 mt-2 text-white btn-bg"   icon="mdi mdi-update" size="45" @click="RefreshFishDatas" ></v-btn>
    </div>
  <div>
      <v-row  no-gutters  class="d-flex align-content-start  flex-wrap ">
        <v-col v-for="fish in datas" :key="fish" :cols="cols" class="d-flex align-content-start   ">
          <v-card class="pa-2 mb-14 mx-auto cardbg" cover width="320">
        <div class="d-flex flex-no-wrap justify-space-between" :style="{left:'5%'}">
          <v-avatar class="ma-3" size="180" rounded="0" style="position: relative;">
      <v-img class="pr-9 pb-7" src="../assets/fishimage1.png"></v-img>
      <v-btn
        icon="mdi-numeric-null"
        height="13"
        width="13"
        :style="{ backgroundColor: geterrcolor(fish.active,fish.errornum), position: 'absolute', top: '0', left: '5%' }"
      ></v-btn>
      
    </v-avatar>
    <div class="text-white ml-7 font-weight-bold"  :style="{  position: 'absolute', top: '80%', left: '8%' }">[ {{ fish.activeword }} ]</div>
          <div>
            <v-card-title class="mr-6 text-white " :style="{  position: 'absolute', top: '5%', left: '77%', transform: 'translateX(-50%)' }">ID:</v-card-title>
            <div class="text-white" :style="{  position: 'absolute', top: '17%', left: '69%', transform: 'translateX(-50%)',fontSize:'52px' }">{{fish.id}}</div>
            <v-card-actions>
              <div  class=" mx-1 text-h4" :style="{  position: 'absolute', top: '39%', left: '51%', transform: 'translateX(-50%)',transform:'scale(1.5)',color: getbccolor(fish.bc,1)}">.</div>
              <div  class=" mx-1 text-h4" :style="{  position: 'absolute', top: '39%', left: '55%', transform: 'translateX(-50%)',transform:'scale(1.5)',color: getbccolor(fish.bc,2)}">.</div>
              <div  class=" mx-1 text-h4" :style="{  position: 'absolute', top: '39%', left: '59%', transform: 'translateX(-50%)',transform:'scale(1.5)',color: getbccolor(fish.bc,3)}">.</div>
              <div  class=" mx-1 text-h4" :style="{  position: 'absolute', top: '39%', left: '63%', transform: 'translateX(-50%)',transform:'scale(1.5)',color: getbccolor(fish.bc,4)}">.</div>
              <div  class=" mx-1 text-h4" :style="{  position: 'absolute', top: '39%', left: '67%', transform: 'translateX(-50%)',transform:'scale(1.5)',color: getbccolor(fish.bc,5)}">.</div>
              <div class="text-black  text-h6 text-white" :style="{  position: 'absolute', top: '47%', left: '82%', transform: 'translateX(-50%)' }">{{fish.bc}}%</div>
            </v-card-actions>
            <v-card-actions>
              <div v-show="false" class="text-black mt-10"></div>
            </v-card-actions>
            <v-card-actions class="mt-10 mr-16">
              <v-btn
                rounded="pill"
                prepend-icon="mdi-square-edit-outline"
                class="ms-2 bg-black"
                width="85"
                variant="outlined"
                :to="'/'+poolname+'/fish/edit'"
                size="small"
                @click="editFish(fish.id, $event)"
                :style="{  position: 'absolute', top: '77%', left: '66%', transform: 'translateX(-50%)' }"
              >
                編輯
              </v-btn>
              <div class=" pb-4">
                <div>
                  <v-dialog
                    v-model="fish.dialogerr"
                    width="600"
                    :scrim="false"
                    transition="dialog-bottom-transition"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-show="fish.bellshow"
                        icon="mdi mdi-bell-ring "
                        height="10"
                        v-bind="props"
                        @click="ErroVideo(fish.id)"
                        color="red-darken-2"
                        :style="{  position: 'absolute', top: '78%', left: '88%', transform: 'translateX(-50%)' }"
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
        </div>
    </v-card>
        </v-col>
      </v-row>
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
              bc: this.bc[index] ,
              error: this.err[index],
              active: this.FishActive[index],
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
  getbccolor(bc,num){
    if(bc >= 80){
      return '#B2FF59'
    }else if(bc >= 60 && num<5 || bc >= 40 && num<4 || bc >= 20 && num<3){
      return '#B2FF59';//綠
    }else if(bc <20 && num<2){
      return '#EF5350';//red
    }else{
      return '#616161';//灰
    }
  },
  getbcdisplay(bc){
    if(bc >= 80){
      return '.....';
    }else if(bc >= 60){
      return '....';
    }else if(bc>=40){
      return '...';
    }else if(bc>=20){
      return '..';
    }else{
      return '.';
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
        return xl || lg  ? 3 : sm || md ?  6:12;
      },
    },
    created() {
    this.RefreshFishDatas();
  },
    
  }
</script>

<style scoped>
.pooltext{
  font-size:x-large;
  padding-left: 60px;
  padding-top: 15px;
}
.rectangle {
  z-index: 5;
  top: 90px;
  left: 30px;
  width: 80px;
  height: 80px;
  position: absolute;
  transform: scale(0.6);
}
.recordtext{
  padding-top: 10px;
  padding-left: 60px;
  font-size: 15px;
}
.dialog-bottom-transition-enter-active,.dialog-bottom-transition-leave-active {
   transition: transform 0.2s ease-in-out;
}
.align-center {
  align-items: center;
}
.btn-bg{
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
}
.cardbg{
  border-radius: 15px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(0, 0, 255, 0.15), rgba(255, 255, 255, 0.15));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  }
.cardIDtext,.v-card-title{
  text-align: left;
  padding-right: 150px;
}
@media screen and (max-width: 600px){
  .recordtext{
  padding-top: 10px;
  font-size: 15px;
}
}  


  
  </style>

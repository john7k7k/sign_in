<template>
    <div class="father0">
      <div  class="text-white  idtext  font-weight-medium">ID</div>
    <div class="text-white  font-weight-medium fishIDtext">{{ FishId }}</div>
    <v-btn  class="  mt-5 ml-6 text-white btn-bg "   icon="mdi mdi-chevron-left" size="45" @click="goBack" ></v-btn>
    <div  class="activetext text-grey font-weight-medium"><h3>[{{ selectactive }}]</h3></div>
    <div class="titelbctext text-grey font-weight-medium">電量</div>
    <div  class=" mx-1 text-h1 bcvalue-bg1" :style="{  color: getbccolor(FishBc,1)}">.</div>
    <div  class=" mx-1 text-h1 bcvalue-bg2" :style="{  color: getbccolor(FishBc,2)}">.</div>
    <div  class=" mx-1 text-h1 bcvalue-bg3" :style="{  color: getbccolor(FishBc,3)}">.</div>
    <div  class=" mx-1 text-h1 bcvalue-bg4" :style="{  color: getbccolor(FishBc,4)}">.</div>
    <div  class=" mx-1 text-h1 bcvalue-bg5" :style="{  color: getbccolor(FishBc,5)}">.</div>
    <div class="  text-h5 text-white fishbc-bg" >{{FishBc}}%</div>
    <div  class="titelerrortext  text-grey font-weight-medium">錯誤</div>
    <v-card  class="errorcard pa-3 pt-2 pl-4 text-white">{{ errorcode(FishErr) }}</v-card>
    <div  class="titelcolortext text-grey font-weight-medium">LED顏色設定</div>
    <v-card width="530" class="colorcard pa-5 pb-7 pl-8 text-grey">
       <v-row>
        <v-col>
          <t3> 左眼  <v-dialog
                    v-model="dialogs[0]"
                    width="1024"
                    transition="dialog-bottom-transition">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          flat
                          class="mt-2"
                          v-bind="props"
                          :color="pickers[0]"
                          size="small"
                        ></v-btn>
                      </template>
                      <v-row justify="center">
                        <v-color-picker
                          hide-inputs
                          v-model="pickers[0]"
                          elevation="15"
                        ></v-color-picker>
                      </v-row>
                    </v-dialog>
          </t3>
        </v-col>
        <v-col>
          <t3> 右眼  <v-dialog
                    v-model="dialogs[1]"
                    width="1024"
                    transition="dialog-bottom-transition">
                      <template v-slot:activator="{ props }">
                          <v-btn
                            flat
                            class="mt-2"
                            v-bind="props"
                            :color="pickers[1]"
                            size="small"
                          ></v-btn>
                      </template>
                      <v-row justify="center">
                        <v-color-picker
                          hide-inputs
                          v-model="pickers[1]"
                          elevation="15"
                        ></v-color-picker>
                      </v-row>
                      </v-dialog>
         </t3>
       </v-col>
       <v-col>
          <t3> 上魚鰭<v-dialog
                    v-model="dialogs[2]"
                    width="1024"
                    transition="dialog-bottom-transition">
                      <template v-slot:activator="{ props }">
                          <v-btn
                            flat
                            class="mt-2"
                            v-bind="props"
                            :color="pickers[2]"
                            size="small"
                          ></v-btn>
                      </template>
                      <v-row justify="center">
                        <v-color-picker
                          hide-inputs
                          v-model="pickers[2]"
                          elevation="15"
                        ></v-color-picker>
                      </v-row>
                      </v-dialog>
         </t3>
       </v-col>
       <v-col>
          <t3> 左後導光柱<v-dialog
                    v-model="dialogs[3]"
                    width="1024"
                    transition="dialog-bottom-transition">
                      <template v-slot:activator="{ props }">
                          <v-btn
                            flat
                            class="mt-2"
                            v-bind="props"
                            :color="pickers[3]"
                            size="small"
                          ></v-btn>
                      </template>
                      <v-row justify="center">
                        <v-color-picker
                          hide-inputs
                          v-model="pickers[3]"
                          elevation="15"
                        ></v-color-picker>
                      </v-row>
                      </v-dialog>
         </t3>
       </v-col>
       <v-col>
          <t3> 右後導光柱<v-dialog
                    v-model="dialogs[4]"
                    width="1024"
                    transition="dialog-bottom-transition">
                      <template v-slot:activator="{ props }">
                          <v-btn
                            flat
                            class="mt-2"
                            v-bind="props"
                            :color="pickers[4]"
                            size="small"
                          ></v-btn>
                      </template>
                      <v-row justify="center">
                        <v-color-picker
                          hide-inputs
                          v-model="pickers[4]"
                          elevation="15"
                        ></v-color-picker>
                      </v-row>
                      </v-dialog>
         </t3>
       </v-col>
    </v-row>
    </v-card>
    <v-btn 
              class="mt-4 ml-4 setcolorbuttom "
              variant="outlined"
              width="130"
              @click="editColor" >  </v-btn>
        <v-avatar class="fishimage" size="450" rounded="0" style="">
        <v-img class="mt-6 pt-3 pr-7 " :src="getImageSource(FishId)" :style="{ transform: imageScale(FishId) }"></v-img>
        
      </v-avatar>
    </div>
    
  </template>
  
  <script>
  import axios from 'axios';
  function hexToRGBA(hex) {
      hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    let alpha = 1; 
    if (hex.length === 8) {
      alpha = (parseInt(hex.substring(6, 8), 16) / 255).toFixed(2);
    }
    return `"r":${r},"g":${g},"b":${b},"a":${alpha}`;
  }
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
          FishId: localStorage.getItem("EditId"),
          FishBc: localStorage.getItem("EditBc"),
          FishErr: localStorage.getItem("EditErr"),
          FishActive: localStorage.getItem("EditActive"),
          token:localStorage.getItem('token'),
          selectcolor:null,
          selectactive:localStorage.getItem("EditActive"),
          afterEditId:null,
          afterEditBc:null,
          afterEditErr:null,
          dialogs: [false, false, false, false, false],
          pickers: ["#E53935FF", "#FFA726FF", "#FDD835FF", "#43A047FF", "#29B6F6FF"],
          active:[
              "功能正常-待機中",
              "活動中",
              "維修中"
          ],
          IP:process.env.VUE_APP_IP,
          poolname:localStorage.getItem('Poolname'),
          route:localStorage.getItem('route'),
          dialogControl:false,
          models:[
            "自動",
            "急速",
            "急速悠游",
            "沿牆",
          ],
          }
        },
        methods:{
        goBack() {
          window.history.back();
        },
        getImageSource(id) {
          return id <= 4000 ? require("../assets/fishimage1.png") : require("../assets/海龜.png");
        },
        imageScale(id) {
          return id <= 4000 ? "scale(1)" : "scale(0.7)";
        },
        errorcode(err){
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
          return errorMapping[err];
        },
        editColor () {
          const rgbaColor =["","","","",""]
          for (let i = 0; i < 5; i++){
            rgbaColor[i] = hexToRGBA(this.pickers[i])
          }
          axios.post(
              "/api/v1/fish/control/?section="+this.poolname,{
                "fishControl":{
          "led":{
              [this.FishId]:{
                  "led1": rgbaColor[0],
                  "led2": rgbaColor[1],
                  "led3": rgbaColor[2],
                  "led4": rgbaColor[3],
                  "led5": rgbaColor[4],
              },
          },
          "action":{
              
          },
          "mode":{
              
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
                  this.$Message.success('變更顏色成功');
                }
                else
                this.$Message.error('變更顏色失敗');
            })
            .catch(err=> {
                console.log(err);
                this.$Message.error('變更顏色失敗');
            })
          },
          ChangeDatas(){
            if(this.afterEditBc == null){
              this.afterEditBc = this.FishBc
            }
            if(this.afterEditErr == null){
              this.afterEditErr = this.FishErr
            }
            axios.post(
              "/api/v1/fish/data/?section=001",{
                "fishData": {
                  [this.FishId] : {"bc": this.afterEditBc, "err": this.afterEditErr,"active":TranActive(this.selectactive)},
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
                  alert("編輯成功")
                }
                else{
                  this.dialog = false
                alert("編輯失敗")
                }
                
            })
            .catch(err=> {
                console.log(err);
                this.dialog = false
                alert('編輯失敗');
            })
      },
      getbccolor(bc,num){
      bc = parseFloat(bc);
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
      ControlFish(move) {
          axios.post(
                  "/api/v1/fish/control/?section="+this.poolname,{
                    "fishControl":{
              "led":{
              },
              "motion":{
                "id": this.FishId,
                "motion": move
              },
              "mode":{
                "id": this.FishId,
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
      }
    </script>
    
    <style scoped>
    .btn-bg{
    font-size: 23px;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.2));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
  }
  .idtext{
    font-size: 55px;
    margin-left: 60%;
  }
  .fishIDtext{
    font-size: 80px;
    letter-spacing: 5px;
  }
  .activetext{
      letter-spacing: 3px;
      font-size: 18px;
    }
  .titelbctext{
      letter-spacing: 3px;
      font-size: 18px;
    }
  .titelerrortext{
      letter-spacing: 3px;
      font-size: 18px;
    }
  .errorcard{
    border-radius: 20px;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    font-size: 25px;
    transform: scale(0.8);
    width:530px;
  }
  .titelcolortext{
    letter-spacing: 3px;
    font-size: 18px;
  }
  .colorcard{
    border-radius: 20px;
    background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
    background-color: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(1px);
    border: 3px solid rgba(255, 255, 255, 0.2);
    z-index: 2;
    transform: scale(0.8);
  }
  .setcolorbuttom{
      border-radius: 80px;
      background-image: url('../assets/顏色設定鈕.png');
      background-position: center;
      background-size: 100% 100%;
      transform: scale(1.1);
  }
  .fishimage{
    transform: scale(1.4);
  }
  .bcvalue-bg1{
     transform:  scale(1.5);
  }
  .bcvalue-bg2{
     transform:  scale(1.5);
  }
  .bcvalue-bg3{
     transform:  scale(1.5);
  }
  .bcvalue-bg4{
     transform:  scale(1.5);
  }
  .bcvalue-bg5{
     transform:  scale(1.5);
  }
  .fishbc-bg{
  }
  
  
  
  @media screen and (min-width: 1200px) {
  .father0{
    display: flex;
  }
  }
  @media screen and (min-width: 768px) and (max-width: 1200px) and (orientation: landscape){
  
  }
  @media screen and (min-width: 601px) and (max-width: 1024px){
  }
  @media screen and (max-width: 600px){
  
  }
    </style>
  
  
  
    
  
    
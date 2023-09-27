<template>
  <div class="text-white  idtext mt-8 font-weight-black">ID:</div>
  
  <div class="text-white  font-weight-black fishIDtext">{{ FishId }}</div>
  <v-card width="300" class="datacard">
            <v-list-item title="電量:" class="mt-4">
              <v-text-field    :readonly="true" density="compact">{{ FishBc }}</v-text-field>
            </v-list-item>
            <v-list-item title="錯誤:" >
                <v-text-field   :readonly="true" density="compact">{{ FishErr }}</v-text-field>
            </v-list-item>
            <v-list-item title="狀態:" >
              <v-text-field    :readonly="true" density="compact">{{ selectactive }}</v-text-field>
            </v-list-item>
  </v-card>
  <v-card width="550" class="colorcard pl-4 pr-4 pb-2 pt-2">
    <v-list lines="two" subheader>
    <v-list-subheader>LED顏色設定</v-list-subheader>
    <v-list-item >
     <v-row>
      <v-col>
        <t3> 左眼:<v-dialog
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
                    <v-row >
                      <v-color-picker
                        hide-inputs
                        v-model="pickers[0]"
                        elevation="15"
                        class="pr-4"
                      ></v-color-picker>
                    </v-row>
                  </v-dialog>
        </t3>
      </v-col>
      <v-col>
        <t3> 右眼:<v-dialog
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
        <t3> 上魚鰭:<v-dialog
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
        <t3> 左後導光柱:<v-dialog
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
        <t3> 右後導光柱:<v-dialog
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
  <v-btn 
            class="mt-4 ml-4 setcolorbuttom "
            variant="outlined"
            size="small"
            @click="editColor" > 顏色設定完成 </v-btn>
  </v-list-item>
</v-list>
  </v-card>
      <v-img
        src="../assets/Vector.png"
        alt="Vector72216"
        class="vector"
      />
      <v-avatar class="fishimage" size="450" rounded="0" style="">
      <v-img class="mt-6 pt-3 pr-7 " src="../assets/fishimage1.png"></v-img>
      
    </v-avatar>
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
  
  <style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
      transition: transform 0.2s ease-in-out;
    }
.datacard{
  margin-left: 8%;
  margin-top: 10.5%;
  transform: scale(1.1);
  position: absolute;
}
.idtext{
  font-size: 50px;
  margin-left: 7%;
}
.fishIDtext{
  font-size: 85px;
  position: absolute;
  margin-left: 7%;
  top: 25%;
}
.vector {
  width: 67.5%;
  height: 3%;
  position: absolute;
  left: 30%;
  top: 93.5%;
}
.fishimage{
  position: absolute;
  left: 40%;
  top: 10%;
  transform: scale(1.4);
}
.colorcard{
  transform: scale(0.8);
  position: absolute;
  left: 65.3%;
  margin-top: 18%;
}
.setcolorbuttom{
  left: 75%;
}

@media screen and (max-width: 600px){
.controlbutton{
  top: 12%;
  position: absolute;
  left: 80.5%;
}
.idtext{
  position: absolute;
  top: 2.5%;
  font-size: 40px;
  margin-left: 7%;
}
.vector {
  display: none;
}
.fishIDtext{
  font-size: 65px;
  position: absolute;
  margin-left: 7%;
  top: 11%;
}
.datacard{
  margin-left: 11%;
  top: 37%;
  position: absolute;
  transform: scale(0.8) ;
}
.fishimage{
  top: 4%;
  transform: scale(0.8) translateX(-50%);
}
.colorcard{
  transform: scale(0.55);
  position: absolute;
  left: -21%;
  top: 64%;
}
.setcolorbuttom{
  left: 75%;
}
}
@media screen and (min-width: 768px) and (max-width: 1200px) and (orientation: landscape){
  .datacard{
  margin-left: 3%;
  margin-top: 24%;
  transform: scale(0.98);
  position: absolute;
}
.idtext{
  font-size: 50px;
  margin-left: 3%;
}
.fishIDtext{
  font-size: 85px;
  position: absolute;
  margin-left: 2.8%;
  top: 25%;
}
.colorcard{
  transform: scale(0.8);
  position: absolute;
  left: 55.5%;
  margin-top: 33%;
}
.fishimage{
  position: absolute;
  left: 37%;
  top: 10%;
  transform: scale(1.4);
}
}
@media screen and (min-width: 601px) and (max-width: 1024px){
  .controlbutton{
  top: 12%;
  position: absolute;
  left: 80.5%;
}
.idtext{
  position: absolute;
  top: 2.5%;
  font-size: 60px;
  margin-left: 7%;
}
.vector {
  display: none;
}
.fishIDtext{
  font-size: 105px;
  position: absolute;
  margin-left: 7%;
  top: 10%;
}
.datacard{
  margin-left: 31%;
  top: 46%;
  position: absolute;
  transform: scale(1.1) ;
}
.fishimage{
  top: 12%;
  transform: scale(1.5) translateX(-20%);
}
.colorcard{
  transform: scale(0.8);
  position: absolute;
  left: 15%;
  top: 68%;
}
.setcolorbuttom{
  left: 75%;
}
}
  </style>



  

  
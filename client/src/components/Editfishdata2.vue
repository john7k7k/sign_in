<template>
  <div class="text-white  idtext mt-8 font-weight-black">ID:</div>
  <div class="text-white font-weight-black fishIDtext">{{ FishId }}</div>
  <v-card width="300" class="datacard">
            <v-list-item title="電量:" class="mt-4">
              <v-text-field    :readonly="true">{{ FishBc }}</v-text-field>
            </v-list-item>
            <v-list-item title="錯誤:" >
                <v-text-field   :readonly="true">{{ FishErr }}</v-text-field>
            </v-list-item>
            <v-list-item title="狀態:" >
              <v-text-field    :readonly="true" >{{ selectactive }}</v-text-field>
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
      <v-avatar class="fishimage" size="450" rounded="0" style="position: relative;">
      <v-img class="mt-6 pt-3 pr-7 " src="../assets/1.png"></v-img>
      
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
    }
        
        
      
    },
    }
  </script>
  
  <style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
      transition: transform 0.2s ease-in-out;
    }
.datacard{
  margin-left: 120px;
  margin-top: 144px;
  position: absolute;
}
.idtext{
  top: 80px;
  font-size: 50px;
  margin-left: 120px;
}
.fishIDtext{
  font-size: 85px;
  position: absolute;
  margin-left: 120px;
  top: 180px;
}
.vector {
  width: 1018px;
  height: 20px;
  position: absolute;
  left: 466px;
  top: 660px;
}
.fishimage{
  position: absolute;
  left: 600px;
  transform: scale(1.2);
}
.colorcard{
  transform: scale(0.8);
  position: absolute;
  left: 65%;
  margin-top: 265px;
}
.setcolorbuttom{
  left: 75%;
}
  </style>



  

  
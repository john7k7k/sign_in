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
    export default {
      data() {
        return {
        FishId: localStorage.getItem("EditId"),
        FishBc: localStorage.getItem("EditBc"),
        FishErr: localStorage.getItem("EditErr"),
        FishActive: localStorage.getItem("EditActive"),
        token:null,
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
        
        }
      },
      methods:{
      editColor () {
        const rgbaColor =["","","","",""]
        for (let i = 0; i < 5; i++){
          rgbaColor[i] = hexToRGBA(this.pickers[i])
        }
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
            "http://20.89.131.34:443/api/v1/fish/control/",{
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
                alert("變更顏色成功")
              }
              else
              alert("變更顏色失敗")
          })
          .catch(err=> {
              console.log(err);
              alert('變更顏色失敗');
          })
        },
        ChangeDatas(){
          if(this.afterEditId == null){
              this.afterEditId = this.FishId
          }
          if(this.afterEditBc == null){
            this.afterEditBc = this.FishBc
          }
          if(this.afterEditErr == null){
            this.afterEditErr = this.FishErr
          }
          alert(this.selectactive)
          alert(this.afterEditId)
          alert(this.afterEditBc)
          alert(this.afterEditErr)
    }
        
        
      
    },
    }
  </script>
  
  <style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
      transition: transform 0.2s ease-in-out;
    }
  </style>


<template>
    <v-container>
      <v-row no-gutters justify="center" class="mt-10">
        <v-card width="1024" mx-auto>
          <v-toolbar dark color="blue-accent-1">
            <v-btn icon dark  route to ="/Fishdatas-Section1">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>編輯魚資料</v-toolbar-title>
            <v-spacer Hidden only on xs></v-spacer>
            <v-toolbar-items>
              <v-btn variant="text" @click="ChangeDatas"> 儲存 </v-btn>
            </v-toolbar-items>
          </v-toolbar>
            <v-list-subheader class="mx-4">基本資料</v-list-subheader>
            
            <v-row class="d-flex justify-space-around">
               <v-col>
                  <v-list-item title="ID">
                    <v-text-field title="ID:" :label="FishId" :placeholder="FishId" v-model="afterEditId"></v-text-field>
                  </v-list-item>
               </v-col>
               <v-col>
                  <v-list-item title="電量:" >
                    <v-text-field  :label="FishBc" :placeholder="FishBc" v-model="afterEditBc"></v-text-field>
                  </v-list-item>
               </v-col>
            </v-row>
            
            
            
            <v-row class="d-flex justify-space-around">
               <v-col>
                  <v-list-item title="錯誤:" >
                      <v-text-field  :label="FishErr" :placeholder="FishErr" v-model="afterEditErr"></v-text-field>
                  </v-list-item>
               </v-col>
               <v-col>
                  <v-list-item title="狀態:" >
                    <v-select
        v-model="selectactive"
        :items="active"
      ></v-select>
                  </v-list-item>
               </v-col>
            </v-row>
                
            
          
          <v-divider></v-divider>
          <v-list lines="two" subheader>
            <v-list-subheader>LED顏色設定</v-list-subheader>
            <v-list-item >
             <v-row>
              <v-col>
                <t3> 左眼:<v-dialog
                          v-model="dialogs[0]"
                          width="1024"
                          :scrim="false"
                          transition="dialog-bottom-transition">
                            <template v-slot:activator="{ props }">
                              <v-btn
                                flat
                                class="mx-3"
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
                <t3> 右眼:<v-dialog
                          v-model="dialogs[1]"
                          width="1024"
                          :scrim="false"
                          transition="dialog-bottom-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                  flat
                                  class="mx-3"
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
                          :scrim="false"
                          transition="dialog-bottom-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                  flat
                                  class="mx-3"
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
                          :scrim="false"
                          transition="dialog-bottom-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                  flat
                                  class="mx-3"
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
                          :scrim="false"
                          transition="dialog-bottom-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                  flat
                                  class="mx-3"
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
                    class="mt-4 "
                    variant="outlined"
                    size="small"
                    @click="editColor" > 顏色設定完成 </v-btn>
          </v-list-item>
        </v-list>
        </v-card>
      </v-row>
    </v-container>
  </template>
  

  
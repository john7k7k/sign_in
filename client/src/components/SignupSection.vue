<template>
  <v-tabs v-model="tab" color="deep-purple-accent-4 " align-tabs="center" class="mt-6 ml-7 mr-7">
      <v-tab value="one">註冊機構</v-tab>
      <v-tab value="two">註冊部門</v-tab>
      <v-tab value="three">新增水池</v-tab>
      
    </v-tabs>
    
    <v-card-text class="ml-7 mr-7">
      <v-window v-model="tab" >
        <v-window-item value="one" >
          <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="新機構名稱">
            <v-text-field
              v-model="NewInstruction"
              title="ID:"
              :rules="[required]"
              inputmode="numeric"
            ></v-text-field>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item title="新機構代碼">
            <v-text-field
              v-model="NewInstructionCode"
              title="ID:"
              :rules="[required]"
              inputmode="numeric"
            ></v-text-field>
          </v-list-item>
        </v-col>
      </v-row>
        </v-window-item>

        <v-window-item value="two">
          <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="選擇機構">
            <v-select v-model="SelectInstruction" :items="InstructionName" :rules="[required]"></v-select>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item >
            <v-select v-show="false"  :items="InstructionName" ></v-select>
          </v-list-item>
        </v-col>
      </v-row>
          <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="新部門名稱">
            <v-text-field
              v-model="NewDepart"
              title="ID:"
              :rules="[required]"
              inputmode="numeric"
            ></v-text-field>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item title="新部門代碼">
            <v-text-field
              v-model="NewDepartCode"
              title="ID:"
              :rules="[required]"
              inputmode="numeric"
            ></v-text-field>
          </v-list-item>
        </v-col>
      </v-row>
        </v-window-item>

        <v-window-item value="three">
          <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="選擇機構">
            <v-select v-model="SelectInstruction" :items="InstructionName" :rules="[required]"></v-select>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item title="選擇部門">
            <v-select v-model="SelectDepart" :items="processSectionName(SelectInstruction)" :rules="[required]"></v-select>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="新水池名稱">
            <v-text-field
              v-model="NewPool"
              title="ID:"
              :rules="[required]"
              inputmode="numeric"
            ></v-text-field>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item title="新水池代碼">
            <v-text-field
              v-model="NewPoolCode"
              title="ID:"
              :rules="[required]"
              inputmode="numeric"
            ></v-text-field>
          </v-list-item>
        </v-col>
      </v-row>
        </v-window-item>
      </v-window>
    </v-card-text>
    <div class="d-flex justify-end signinbuttombg ml-7 mr-7" >
        <v-btn  @click="Signin(tab)" :disabled="SigninButtonDisabled" v-model="tab" class="mt-3 mr-10 mb-16" color="blue-accent-2"> 註冊 </v-btn>
    </div>



</template>

<script>
import axios from 'axios';
export default {
    data(){
      return{
        poolsCode:JSON.parse(localStorage.getItem("PoolsCode")),
        poolName: JSON.parse(localStorage.getItem("PoolsName")),
        instructionCode:JSON.parse(localStorage.getItem("InstructionCode")),
        InstructionName:JSON.parse(localStorage.getItem("InstructionName")),
        NewInstruction:null,
        NewInstructionCode:null,
        SelectInstruction:null,
        SelectDepart:null,
        NewDepart:null,
        NewDepartCode:null,
        NewPool:null,
        NewPoolCode:null,
        tab:null,
        keyvalueMapping :[],

      }

    },
    created() {
        this.formNameMapping(this.instructionCode,this.InstructionName);
        this.formNameMapping(this.poolsCode,this.poolName);
    },
    computed:{
        SigninButtonDisabled(){
            const isValidInput = (input) => {
                return typeof input === 'string' && input.trim() !== "" ;
            };
            const isNewInstructionValid = isValidInput(this.NewInstruction);
            const isNewInstructionCodeValid = isValidInput(this.NewInstructionCode);
            const isSelectInstructionValid = isValidInput(this.SelectInstruction);
            const isNewDepartValid = isValidInput(this.NewDepart);
            const isNewDepartCodeValid = isValidInput(this.NewDepartCode);
            const isSelectDepartValid = isValidInput(this.SelectDepart);
            const isNewPoolValid = isValidInput(this.NewPool);
            const isNewPoolCodeValid = isValidInput(this.NewPoolCode);
            return !((isNewInstructionValid && isNewInstructionCodeValid) || (isSelectInstructionValid && isNewDepartValid && isNewDepartCodeValid) || (isSelectInstructionValid && isSelectDepartValid && isNewPoolValid && isNewPoolCodeValid));
      },
    },
    methods:{
        formNameMapping(code,name,){
          const keyValueMapping = {};
          for (let i = 0; i < code.length; i++) {
            const key = code[i];
            const value = name[i];
            
            keyValueMapping[key] = value;
          }
          this.keyvalueMapping.push(keyValueMapping);
        },
        processSectionName(str) {
            for (const key in this.keyvalueMapping[0]) {
                if (this.keyvalueMapping[0][key] === str) {
                const result = [];
                for (const subKey in this.keyvalueMapping[1]) {
                    if (subKey.startsWith(key)) {
                    result.push(this.keyvalueMapping[1][subKey]);
                    }
                }
                return result.length > 0 ? result : ["無部門"];
                }
            }
            return ["無部門"];
        },
        Signin(tab){
        if (tab === "one"){
          axios.post(
            "/api/v1/instruction",{
            "instruction":{"code": this.NewInstructionCode,
                           "name": this.NewInstruction
                          },
                        },{
                headers: {
                  Authorization: `Bearer ${this.token}`
                }
              }
          )
          .then(async res=> {
              console.log(res);
              if(res.status == 200){
                this.dialognew = false
                this.$Message.success('新增成功');
                
              }
          })
          .catch(err=> {
              console.log(err);
              this.dialog = false
              this.$Message.error('新增失敗');
          })
        }else if(tab === "two"){
          axios.post(
            "/api/v1/depart",{
            "depart":{"code": this.NewDepartCode,
                      "name": this.NewDepart
                      },
            "instruction":{"code": this.SelectInstruction}
                        },{
                headers: {
                  Authorization: `Bearer ${this.token}`
                }
              }
          )
          .then(async res=> {
              console.log(res);
              if(res.status == 200){
                this.dialognew = false
                this.$Message.success('新增成功');
                
              }
          })
          .catch(err=> {
              console.log(err);
              this.dialog = false
              this.$Message.error('新增失敗');
          })
        }else{
          axios.post(
            "/api/v1/pool",{
            "instruction":{"code": this.SelectInstruction},
            "depart":{"code": this.SelectDepart},
            "pool":{"code": this.NewPoolCode,
                    "name": this.NewPool }
                        },{
                headers: {
                  Authorization: `Bearer ${this.token}`
                }
              }
          )
          .then(async res=> {
              console.log(res);
              if(res.status == 200){
                this.dialognew = false
                this.$Message.success('新增成功');
                
              }
          })
          .catch(err=> {
              console.log(err);
              this.dialog = false
              this.$Message.error('新增失敗');
          })
        }
      },
    }



}



</script>
<style>
.v-slide-group__content,.v-card-text,.signinbuttombg{
  background-color: white;
}
</style>
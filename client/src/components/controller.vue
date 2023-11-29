<template>
    <v-container>
    <div class="font-weight-black d-flex justify-center mt-3 text-white text-h4">遙控器清單</div>
    <v-btn  @click="Newcontrollermodal = true" size="large" class=" mr-8 mt-6  mb-6" color="green-darken-3">新增遙控器</v-btn>
    <Modal
          v-model="Newcontrollermodal"
          title="新增遙控器"
          :closable="false"
          ok-text="新增"
          @on-ok="newdatas"
          @on-cancel="cancel">
          <v-row class="d-flex justify-space-around">
        <v-col>
          <v-list-item title="新遙控器名稱(ID)">
            <v-text-field
              v-model="NewcontrollerID"
              title="ID:"
              :rules="[required]"
              inputmode="numeric"
            ></v-text-field>
          </v-list-item>
        </v-col>
        <v-col>
          <v-list-item title="選擇想控制的ID">
            <v-select v-model="Newcontrollid" :items="NewFishId" :rules="[required]"></v-select>
          </v-list-item>
        </v-col>
      </v-row>
          </Modal>
    <Table border :columns="columns" :data="datas">
        <template #ID="{ row }">
            <strong>{{ row.id }}</strong>
        </template>
        <template #action="{row, index }">
            <Button type="primary" size="small" style="margin-right: 5px" @click="row.changeactive = true">編輯</Button>
            <Modal  v-model="row.changeactive" :title="'控制器' + row.ID + ' 功能管理'" :closable="false" @on-ok="changeFishActive(row,row.selectActive)" @on-cancel="cancel">
              <Table border :columns="activecolumns" :data="acitvedata">
                <template #control="{ row }">
                    <strong>{{ row.control }}</strong>
                </template>
                <template #controlaction="{row}">
                  <RadioGroup class="radio-group " v-model="row.selectActive">
                <Radio class="radio" label="true">開啟</Radio>
                <Radio class="radio" label="false">關閉</Radio>
              </RadioGroup> 
                </template>
            </Table>
                        
          </Modal>
            <Button type="warning" size="small" @click="remove(index)">刪除</Button>
        </template>
    </Table>
    
    </v-container>
    
    
  </template>
  
  <script>
import axios from 'axios';

    export default {
      data() {
        return {
            token:localStorage.getItem('token'),
            isMobileScreen: false,
            IP:process.env.VUE_APP_IP,
            sectionOrigin:localStorage.getItem('UserSection'),
            Username: localStorage.getItem('UserName'),
            poolsCode:JSON.parse(localStorage.getItem("PoolsCode2")),
            poolName: JSON.parse(localStorage.getItem("PoolsName2")),
            instructionCode:JSON.parse(localStorage.getItem("InstructionCode2")),
            InstructionName:JSON.parse(localStorage.getItem("InstructionName2")),
            DepartCode:JSON.parse(localStorage.getItem("DepartCode2")),
            DepartName:JSON.parse(localStorage.getItem("DepartName2")),
            columns: [
                    {
                        title: '遙控器編號',
                        slot: 'ID'
                    },
                    {
                        title: '當前控制的魚',
                        key: 'fish'
                    },
                    {
                        title: '區域',
                        key: 'location'
                    },
                    {
                        title: '編輯功能',
                        slot: 'action',
                        width: 250,
                        align: 'center'
                    }
                ],
                activecolumns: [
                    {
                        title: '遙控器按鍵功能',
                        slot: 'control'
                    },
                    {
                        title: '狀態',
                        slot: 'controlaction',
                        width: 250,
                        align: 'center'
                    }
                ],
                acitvedata: [
                    {
                      control: '前進',
                      changeactive:false,
                      selectActive:"true",
                    },
                    {
                      control: '左轉',
                      changeactive:false,
                      selectActive:"true",
                    },
                    {
                      control: '右轉',
                      changeactive:false,
                      selectActive:"true",
                    },
                    {
                      control: '上浮',
                      changeactive:false,
                      selectActive:"true",
                    },
                    {
                      control: '平游',
                      changeactive:false,
                      selectActive:"true",
                    },
                    {
                      control: '下潛',
                      changeactive:false,
                      selectActive:"true",
                    },
                    {
                      control: '變換LED顏色',
                      changeactive:false,
                      selectActive:"true",
                    },
                    {
                      control: '切換模式',
                      changeactive:false,
                      selectActive:"true",
                    },
                    {
                      control: '進入自動',
                      changeactive:false,
                      selectActive:"true",
                    },
                    {
                      control: '退出自動',
                      changeactive:false,
                      selectActive:"true",
                    },
                ],
                Newcontrollermodal:false,
                keyvalueMapping :[],
                FishId:[],
                NewFishId:[],
                NewcontrollerID:"",
                Newcontrollid:"",
                datas:[],

              
        }
      },
      computed: {
        
  },
  created() {
    this.formNameMapping(this.instructionCode,this.InstructionName);
    this.formNameMapping(this.DepartCode,this.DepartName);
    this.formNameMapping(this.poolsCode,this.poolName);
    this.RefreshDatas2();
    this.FishId.forEach((section) => {
                  section.forEach(fish =>{
                    this.NewFishId.push(fish)
                  })
                })
    this.accountdata();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenSize);
  },
  methods: {
    RefreshDatas2() {
          for (var i = 0; i < this.poolsCode.length; i++) {
            const fish0 = "fish0" + this.poolsCode[i];
            const fish1 = "fish1" + this.poolsCode[i];
            const fish2 = "fish2" + this.poolsCode[i];

            const fish1Data = localStorage.getItem(fish1);
            const parsedFish1Data = JSON.parse(fish1Data);
            const fish0Data = localStorage.getItem(fish0);
            const parsedFish0Data = JSON.parse(fish0Data);
            const fish2Data = localStorage.getItem(fish2);
            const parsedFish2Data = JSON.parse(fish2Data);
            const combinedFishIds = [...parsedFish1Data, ...parsedFish0Data, ...parsedFish2Data];
            const parsedFishIds = combinedFishIds.map((str) => {
              const num = parseInt(str, 10);
              const paddedNum = num.toString().padStart(7, '0'); 
              return paddedNum;

            });
            this.FishId.push(parsedFishIds); 
          }
      },
    accountdata(){
        axios.get(
          "http://localhost:3000"+"/api/v1/controller/",{
    headers: {
      Authorization: `Bearer ${this.token}`
    },
    
  }
          )
          .then(res=> {
              console.log(res);
                res.data.forEach(item => {
                  this.datas.push({
                    id: item.id,
                    fish: item.fish,
                    location: item.location,
                    exist: item.exist,
                    forward: item.forward,
                    left: item.left,
                    right: item.right,
                    floating: item.floating,
                    diving: item.diving,
                    middle: item.middle,
                    switch_mode: item.switch_mode,
                    led: item.led,
                    auto: item.auto,
                    leave_auto: item.leave_auto,
                  });
                
                
                
              });
              })

          .catch(err=> {
              console.log(err);
          })
        
      },
    formNameMapping(code,name,){
          const keyValueMapping = {};
          for (let i = 0; i < code.length; i++) {
            const key = code[i];
            const value = name[i];
            
            keyValueMapping[key] = value;
          }
          this.keyvalueMapping.push(keyValueMapping);
        },
      confirm (name,index,num) {
                this.$Modal.confirm({
                    title: '確定要刪除此帳號嗎?',
                    onOk: () => {
                        this.remove(name,index,num);
                    },
                    onCancel: () => {
                        
                    }
                });
            },
      updateScreenSize() {
        this.isMobileScreen = window.innerWidth <= 768; 
      },
      newdatas () {
        if(this.NewcontrollerID ==""){
          this.$Message.error('需輸入遙控器名稱');
          return;
        }else if(this.Newcontrollid ==""){
          this.$Message.error('需選擇要控制的ID');
          return;
        }
        axios.post(
          "http://localhost:3000"+"/api/v1/controller/add",{
            "controllerID": this.NewcontrollerID,
            "fish": this.Newcontrollid,
            "location": "002001001"
                        },{
                headers: {
                  Authorization: `Bearer ${this.token}`
                }
              }
          )
          .then(async res=> {
              console.log(res);
              if(res.status == 200){
                this.$Message.success('新增遙控器成功');
                
              }
              else{
                this.dialog = false
                this.$Message.error('新增遙控器失敗');
              }
              
          })
          .catch(err=> {
              console.log(err);
              this.dialog = false
              this.$Message.error('新增遙控器失敗');
          })

        },

    },
    }
  </script>
  
  <style scoped>
.radio-group {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
  }
  .radio {
    flex-basis: calc(50% - 10px); 
    margin: 5px; 
    width: 45%;
  }
  @media screen and (max-width: 600px){
  }
  </style>
  
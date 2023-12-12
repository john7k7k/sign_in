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
        <template #ID="{ row,index }">
            
            <p class="d-flex flex-no-wrap justify-space-between"><strong>{{ row.name }}</strong><Button   icon="md-create" size="small" @click="row.NameModal = true"></Button></p>
          <Modal v-model="row.NameModal" :title="'變更遙控器名稱 '" :closable="false" @on-ok="changeControlActive(index)" @on-cancel="cancel" ok-text="變更">
                 
              <v-list-item title="新遙控器名稱">
            <v-text-field
              v-model="changecontrolname[index]"
            ></v-text-field>
          </v-list-item>        
          </Modal>
        </template>
        <template #fish="{ row,index}">
          <p class="d-flex flex-no-wrap justify-space-between">{{ row.fish.substring(3) }}<Button   icon="md-create" size="small" @click="row.ActiveModal = true"></Button></p>
          <Modal v-model="row.ActiveModal" :title="'變更遙控器 ' + row.id + ' 控制的魚ID'" :closable="false" @on-ok="changeControlActive(index)" @on-cancel="cancel" ok-text="變更">
              <RadioGroup class="radio-group" v-model="controlfishid[index]">
                <Radio v-for="id in NewFishId" :key="id" :label="id">{{ id.substring(3) }}</Radio>
              </RadioGroup>           
          </Modal>
        </template>
        <template #location="{ row,index}">
          <p class="d-flex flex-no-wrap justify-space-between">{{ row.location }}<Button   icon="md-create" size="small" @click="row.LocationModal = true"></Button></p>
          <Modal v-model="row.LocationModal" :title="'變更遙控器 ' + row.id + ' 控制的魚ID'" :closable="false" @on-ok="changeControlActive(index)" @on-cancel="cancel" ok-text="變更">
              <RadioGroup class="radio-group" v-model="controllocation[index]">
                <Radio v-for="i in poolsCode.length" :key="poolsCode[i-1]" :label="poolsCode[i-1]">{{ poolName[i-1] }}({{ poolsCode[i-1] }})</Radio>
              </RadioGroup>           
          </Modal>
        </template>
        <template #action="{row,index}">
            <Button type="primary" size="small" style="margin-right: 5px" @click="row.changeactive = true">編輯</Button>
            <Modal :styles="{top: '20px'}"  v-model="row.changeactive" :title="'控制器' + row.id + ' 功能管理'" ok-text="變更" :closable="false" @on-ok="changeControlActive(index)" @on-cancel="cancel" >
              <Table border :columns="activecolumns" :data="acitvedata[index]">
                <template #control="{ row }">
                    <strong>{{ row.control }}</strong>
                </template>
                <template #controlaction="{row}">
                  <RadioGroup class="radio-group " v-model="row.selectActive" @input="handleRadioInput(row,index, $event)">
                <Radio class="radio" label="1">開啟</Radio>
                <Radio class="radio" label="0">關閉</Radio>
              </RadioGroup> 
                </template>
            </Table>
                        
          </Modal>
            <Button type="warning" size="small" @click="confirm(row.id)">刪除</Button>
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
                        slot: 'fish',
                        width: 250,
                        align: 'left'
                    },
                    {
                        title: '區域',
                        slot: 'location',
                        width: 250,
                        align: 'left'
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
                acitvedata:[],
                Newcontrollermodal:false,
                keyvalueMapping :[],
                FishId:[],
                NewFishId:[],
                NewcontrollerID:"",
                Newcontrollid:"",
                datas:[],
                controlfishid:[],
                controllocation:[],
                changecontrolname:[],
              
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
          /**/"/api/v1/controller/",{
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
                    ActiveModal:false,
                    LocationModal:false,
                    name:item.name,
                    NameModal:false,
                  });
                this.controlfishid.push(item.fish);
                this.controllocation.push(item.location);
                this.changecontrolname.push(item.name);
                this.acitvedata.push([
                    {
                      control: '前進',
                      changeactive:false,
                      selectActive:item.forward.toString(),
                    },
                    {
                      control: '左轉',
                      changeactive:false,
                      selectActive:item.left.toString(),
                    },
                    {
                      control: '右轉',
                      changeactive:false,
                      selectActive:item.right.toString(),
                    },
                    {
                      control: '上浮',
                      changeactive:false,
                      selectActive:item.floating.toString(),
                    },
                    {
                      control: '平游',
                      changeactive:false,
                      selectActive:item.middle.toString(),
                    },
                    {
                      control: '下潛',
                      changeactive:false,
                      selectActive:item.diving.toString(),
                    },
                    {
                      control: '變換LED顏色',
                      changeactive:false,
                      selectActive:item.led.toString(),
                    },
                    {
                      control: '切換模式',
                      changeactive:false,
                      selectActive:item.switch_mode.toString(),
                    },
                    {
                      control: '進入自動',
                      changeactive:false,
                      selectActive:item.auto.toString(),
                    },
                    {
                      control: '退出自動',
                      changeactive:false,
                      selectActive:item.leave_auto.toString(),
                    },
                ])
                
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
          /**/"/api/v1/controller/add",{
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
                location.reload();
              }
              else{
                this.$Message.error('新增遙控器失敗');
              }
              
          })
          .catch(err=> {
              console.log(err);
              this.$Message.error('新增遙控器失敗');
          })

        },
        confirm (id) {
                this.$Modal.confirm({
                    title: `確定要刪除遙控器 ${id} 嗎?`,
                    onOk: () => {
                        this.remove(id);
                    },
                    okText:"確定",
                    onCancel: () => {
                        
                    }
                });
            },
    remove(id){
        axios.post(
          /**/"/api/v1/controller/delete",
            {
              "controllerID":id,
            },
            {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
          )
          .then(async res=> {
              console.log(res);
              this.$Message.success('刪除成功');
              location.reload();
          })
          .catch(err=> {
              console.log(err);
              this.$Message.error('刪除失敗');
          })
      },
      changeControlActive(index){
        if(this.changecontrolname[index] == ""){
          this.$Message.error('遙控器名稱不可留白');
          return;
        }
        axios.post(
          /**/"/api/v1/controller/revise",
            {
              "controllerID": this.datas[index].id,
              
              "enble": {
                  "fish": this.controlfishid[index],
                  "location":this.controllocation[index],
                  "name":this.changecontrolname[index],
                  "exist": 1,
                  "forward": Number(this.acitvedata[index][0].selectActive),
                  "left": Number(this.acitvedata[index][1].selectActive),
                  "right": Number(this.acitvedata[index][2].selectActive),
                  "floating": Number(this.acitvedata[index][3].selectActive),
                  "diving": Number(this.acitvedata[index][5].selectActive),
                  "middle": Number(this.acitvedata[index][4].selectActive),
                  "switch_mode": Number(this.acitvedata[index][7].selectActive),
                  "led": Number(this.acitvedata[index][6].selectActive),
                  "auto": Number(this.acitvedata[index][8].selectActive),
                  "leave_auto": Number(this.acitvedata[index][9].selectActive)
              }
            },
            {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
          )
          .then(async res=> {
              console.log(res);
              this.$Message.success('更改成功');
              setTimeout(function() {
                location.reload();
              }, 1500);
              
          })
          .catch(err=> {
              console.log(err);
              this.$Message.error('更改失敗');
          })
      },
      handleRadioInput(row,index) {
        row.selectActive = row.selectActive === "1" ? "0" : "1";
        this.acitvedata[index].forEach((item) => {
      if (item.control === row.control) {
        item.selectActive = row.selectActive;
      }
    });
      },
      cancel(){
        location.reload();
      }

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
  
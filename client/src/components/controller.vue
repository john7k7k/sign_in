<template>
    <v-container>
    <div class="font-weight-black d-flex justify-center mt-3 text-white text-h4">遙控器清單</div>
    <v-btn  @click="Binmodal = true" size="large" class=" mr-8 mt-6  mb-6" color="green-darken-3">新增遙控器</v-btn>
    <Table border :columns="columns" :data="data">
        <template #ID="{ row }">
            <strong>{{ row.ID }}</strong>
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
//import axios from 'axios';

    export default {
      data() {
        return {
            token:localStorage.getItem('token'),
            isMobileScreen: false,
            IP:process.env.VUE_APP_IP,
            sectionOrigin:localStorage.getItem('UserSection'),
            Username: localStorage.getItem('UserName'),
            poolsCode:JSON.parse(localStorage.getItem("PoolsCode")),
            poolName: JSON.parse(localStorage.getItem("PoolsName")),
            instructionCode:JSON.parse(localStorage.getItem("InstructionCode")),
            InstructionName:JSON.parse(localStorage.getItem("InstructionName")),
            columns: [
                    {
                        title: '遙控器編號',
                        slot: 'ID'
                    },
                    {
                        title: '編輯功能',
                        slot: 'action',
                        width: 250,
                        align: 'center'
                    }
                ],
                data: [
                    {
                      ID: '9002',
                      changeactive:false,
                    },
                    {
                      ID: '9003',
                      changeactive:false,
                    },
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
        }
      },
      computed: {
        
  },
  created() {
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenSize);
  },
  methods: {
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
  
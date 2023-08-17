<template>
    <v-container>
    <div class="d-flex justify-center mt-3"><h2>帳號清單</h2></div>
    
    
    </v-container>
    <div class="mt-4 mb-2"><h4>全區</h4></div>
    <Table :columns="columns" :data="dataWithFallback">
      <template #level="{row, index }">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.level }}<Button v-show="fallbackRow.showbtn"  icon="md-create"  size="small" @click="changelevel(index)"></Button></p>
            
        </template>
        <template #section="{row, index }">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.section }}<Button v-show="fallbackRow.showbtn" icon="md-create" size="small" @click="changesection(index)"></Button></p>
            
        </template>
      <template #action="{row, index }">
            <Button v-show="row.showbtn" type="error" size="small" @click="remove(row.name,index,1)">刪除</Button>
        </template>
    </Table>

    <div class="mt-4 mb-2"><h4>北科</h4></div>
  <Table :columns="columns" :data="dataWithFallback2">
    <template #level="{row, index }">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.level }}<Button v-show="fallbackRow2.showbtn" icon="md-create"  size="small" @click="remove(row.name,index,1)"></Button></p>
            
        </template>
        <template #section="{row, index }">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.section }}<Button v-show="fallbackRow2.showbtn" icon="md-create" size="small" @click="remove(row.name,index,1)"></Button></p>
            
        </template>
    <template #action="{row, index }">
            <Button v-show="fallbackRow2.showbtn" type="error" size="small" @click="remove(row.name,index,2)">刪除</Button>
        </template>
  </Table>

  <div class="mt-4 mb-2"><h4>海科</h4></div>
  <Table :columns="columns" :data="dataWithFallback3">
    <template #level="{row, index }">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.level }}<Button v-show="fallbackRow3.showbtn" icon="md-create" size="small" @click="remove(row.name,index,1)"></Button></p>
            
        </template>
        <template #section="{row, index }">
            <p class="d-flex flex-no-wrap justify-space-between">{{ row.section }}<Button v-show="fallbackRow3.showbtn" icon="md-create" size="small" @click="remove(row.name,index,1)"></Button></p>
            
        </template>
    <template #action="{row, index }">
            <Button v-show="fallbackRow3.showbtn" type="error" size="small" @click="remove(row.name,index,3)">刪除</Button>
        </template>
  </Table>
  </template>
  
  <script>
import axios from 'axios';

    export default {
      data() {
        return {
            userdatas:[],
            token:localStorage.getItem('token'),
            show: false,
            columns: [
                    {
                        title: '使用者名稱',
                        key: 'name'
                    },
                    {
                        title: 'Email',
                        key: 'email',
          
                    },
                    {
                        title: '權限',
                        slot: 'level',
                        width: 250,
                        align: 'left'
                    },
                    {
                        title: '所屬區域',
                        slot: 'section',
                        width: 250,
                        align: 'left'
                    },
                    {
                        title: '註冊時間',
                        key: 'registrationTime'
                    },
                    {
                        title: ' ',
                        slot: 'action',
                        width: 100,
                        align: 'center'
                    }
                ],
                data: [],
                data2: [],
                data3: [],
                IP:process.env.VUE_APP_IP,
                fallbackRow: {
              name: '',
              level: '無資料',
              section: '',
              showbtn:false,
            },
            fallbackRow2: {
              name: '',
              level: '無資料',
              section: '',
              showbtn:false,
            },
            fallbackRow3: {
              name: '',
              level: '無資料',
              section: '',
              showbtn:false,
            }
        }
      },
      computed: {
        dataWithFallback() {
          return this.data.length > 0 ? this.data : [this.fallbackRow];
        },
        dataWithFallback2() {
          return this.data2.length > 0 ? this.data2 : [this.fallbackRow2];
        },
        dataWithFallback3() {
          return this.data3.length > 0 ? this.data3 : [this.fallbackRow3];
        }
  },
      methods: {
      accountdata(){
        axios.get(
            "/api/v1/account/list/?section=001",{
    headers: {
      Authorization: `Bearer ${this.token}`
    },
    
  }
          )
          .then(res=> {
              console.log(res);
              for(const obj of res.data){
                const {email,level,registrationTime,section,username,userID} = obj;
                const newData = {
                    username,
                    email,
                    level,
                    registrationTime,
                    section,
                    userID,
                    show:false,
                }
                this.userdatas.push(newData)
            }
                res.data.forEach(item => {
                const sectionResult = this.TranSection(item.section);
                const usernameResult = item.username
                let showbtn = true;
                if (sectionResult === "全區") {
                  if(usernameResult === "123") showbtn = false
                  this.data.push({
                    email: item.email,
                    level: this.Tranlevel(item.level),
                    passcode: item.passcode,
                    registrationTime: this.formatDate(item.registrationTime),
                    section: sectionResult,
                    userID: item.userID,
                    name: item.username,
                    showbtn
                  });
                } else if (sectionResult === "北科") {
                  this.data2.push({
                    email: item.email,
                    level: this.Tranlevel(item.level),
                    passcode: item.passcode,
                    registrationTime: this.formatDate(item.registrationTime),
                    section: sectionResult,
                    userID: item.userID,
                    name: item.username
                  });
                } else if (sectionResult === "海科") {
                  this.data3.push({
                    email: item.email,
                    level: this.Tranlevel(item.level),
                    passcode: item.passcode,
                    registrationTime: this.formatDate(item.registrationTime),
                    section: sectionResult,
                    userID: item.userID,
                    name: item.username
                  });
                }
                const index = this.data.findIndex(item => item.name === "123");
                if (index !== -1) {
                    const itemToMove = this.data.splice(index, 1)[0];
                    this.data.unshift(itemToMove);
                }
                if(this.data2.length > 0){
                  this.fallbackRow2.showbtn = true
                }
                if(this.data3.length > 0){
                  this.fallbackRow3.showbtn = true
                }
              });
              })
          .catch(err=> {
              console.log(err);
          })
        
      },
      toggleShow(index) {
      this.userdatas[index].show = !this.userdatas[index].show
    },
    formatDate(timestamp) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}-${month}-${day}`;
  },
  TranSection(section) {
        if (section == "001") {
          return "全區";
        } else if(section == "002"){
          return "北科";
        } 
        else if(section == "003"){
          return "海科";
        }else{
          return section
        }
      },
      Tranlevel(level){
        if (level < 30) {
          return "管理者"
        } else {
          return "遊客"
        }
      },
      remove(username,index,num){
        axios.post(
          "/api/v1/account/remove_user",
            {
              "username":username,
            },
            {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
          )
          .then(res=> {
              console.log(res);
              alert('刪除成功');
              if(num === 1){
                this.data.splice(index, 1);
              }else if (num === 2){
                this.data2.splice(index, 1);
              }else{
                this.data3.splice(index, 1);
              }
              location.reload();
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              alert('刪除失敗');
          })
      },
      changelevel(index){
        console.log(index)
      },
      changesection(index){
        console.log(index)
      }

    },
    
    
    mounted() {
      this.accountdata();
    },
    }
  </script>
  
  <style>
  .section1{
    padding-left: 290px;
  }

  @media screen and (max-width: 600px){
    .section1{
    padding-left: 10px;
  }
  }
  </style>
  
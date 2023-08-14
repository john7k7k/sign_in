<template>
    <v-container>
    <div class="d-flex justify-center mt-3"><h2>帳號清單</h2></div>
    
    
    </v-container>
    <div class="mt-4 mb-2"><h4>全區</h4></div>
    <Table :columns="columns" :data="dataWithFallback">
      <template #action="{ index }">
            <Button  type="primary" size="small" style="margin-right: 5px" @click="show2(index)">編輯</Button>
            <Button  type="error" size="small" @click="remove(index)">刪除</Button>
        </template>
    </Table>

    <div class="mt-4 mb-2"><h4>北科</h4></div>
  <Table :columns="columns" :data="dataWithFallback2">
    <template #action="{ index }">
            <Button  type="primary" size="small" style="margin-right: 5px" @click="show2(index)">編輯</Button>
            <Button  type="error" size="small" @click="remove(index)">刪除</Button>
        </template>
  </Table>

  <div class="mt-4 mb-2"><h4>海科</h4></div>
  <Table :columns="columns" :data="dataWithFallback3">
    <template #action="{ index }">
            <Button v-show="fallbackRow.showbtn" type="primary" size="small" style="margin-right: 5px" @click="show2(index)">編輯</Button>
            <Button v-show="fallbackRow.showbtn" type="error" size="small" @click="remove(index)">刪除</Button>
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
                      type: 'expand',
                      width: 50,
                      render: (h, { row: { email, registrationTime } }) => {
                        if (this.data.length > 0) {
                            return h('div', [
                            h('div', 'email: ' + email),
                            h('div', '註冊時間: ' + registrationTime)
                          ]);
                          } else {
                            return null;
                          }
                      }
                    },
                    {
                        title: '使用者名稱',
                        key: 'name'
                    },
                    {
                        title: '權限等級',
                        key: 'level',
          
                    },
                    {
                        title: '所屬區域',
                        key: 'section'
                    },
                    {
                        title: '編輯',
                        slot: 'action',
                        width: 150,
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
            }
        }
      },
      computed: {
        dataWithFallback() {
          return this.data.length > 0 ? this.data : [this.fallbackRow];
        },
        dataWithFallback2() {
          return this.data.length > 0 ? this.data2 : [this.fallbackRow];
        },
        dataWithFallback3() {
          return this.data.length > 0 ? this.data3 : [this.fallbackRow];
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

                if (sectionResult === "全區") {
                  this.data.push({
                    email: item.email,
                    level: this.Tranlevel(item.level),
                    passcode: item.passcode,
                    registrationTime: this.formatDate(item.registrationTime),
                    section: sectionResult,
                    userID: item.userID,
                    name: item.username
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
      remove(index){
        axios.post(
            "/api/v1/account/remove_user",
            {
              "username":this.data[index].name,
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
              this.data.splice(index, 1);
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              alert('刪除失敗');
          })
      },
      show2(index){
        alert(index)
        
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
  
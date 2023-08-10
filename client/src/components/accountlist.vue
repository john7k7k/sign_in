<template>
    <v-container>
    <div class="d-flex justify-center mt-3"><h2>帳號清單</h2></div>
    
    
    </v-container>
    <div class="mt-4 mb-2"><h4>全區</h4></div>
    <Table :columns="columns" :data="data"></Table>
  </template>
  
  <script>
import axios from 'axios';

    export default {
      data() {
        return {
            userdatas:[],
            token:null,
            show: false,
            columns: [
                        {
                      type: 'expand',
                      width: 50,
                      render: (h, { row: { email, registrationTime } }) => {
                        return h('div', [
                            h('div', 'email: ' + email),
                            h('div', '註冊時間: ' + registrationTime)
                          ]);
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
                ],
                data: [],
        }
      },
      methods: {
      accountdata(){
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split("=");
            if (cookie[0] === "token") {
            const token = cookie[1];
            this.token = token;
            break;
            }
        }
        axios.get(
            "http://20.89.131.34:443/api/v1/account/list/?section=001",{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
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
            this.data = res.data.map(item => ({
              email: item.email,
              level: item.level,
              passcode: item.passcode,
              registrationTime: this.formatDate(item.registrationTime),
              section: item.section,
              userID: item.userID,
              name: item.username
            }));
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
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  editRow(row) {
      console.log('编辑行：', row);
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
  
<template>
    <div class="mt-4 mb-2"><h4>北科</h4></div>
    <Table :columns="columns" :data="data"></Table>
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
                        render: (h, { row: { name, age } }) => {
                            return h('div', name + '-' + age)
                        }
                    },
                    {
                        title: '使用者名稱',
                        key: 'name'
                    },
                    {
                        title: '權限等級',
                        key: 'level'
                    },
                    {
                        title: '所屬區域',
                        key: 'section'
                    }
                ],
                data: [],
            username:[],
            level:[],
            section:[],
            IP:process.env.VUE_APP_IP,
        }
      },
      methods: {
      accountdata(){
        axios.get(
            "/api/v1/account/list/?section=002",{
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
                    name:username,
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
              level: 10,
              passcode: item.passcode,
              registrationTime: item.registrationTime,
              section: "001",
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
  
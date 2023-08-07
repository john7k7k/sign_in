<template>
    <v-container>
    <div class="d-flex justify-center"><h2>帳號清單</h2></div>
    <div class="section1 mt-4"><h4>全區</h4></div>
    <v-card class="mx-auto mt-2" max-width="600" v-for="user in userdatas" :key="user">
    <div class="d-flex align-center justify-space-between pl-4" >
      <h3>{{user.username}}</h3>
      <v-card-actions>
        <v-btn
          :icon="user.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="toggleShow(user.userID-1)"
        ></v-btn>
      </v-card-actions>
    </div>

    <v-expand-transition>
      <div v-show="user.show">
        <v-divider></v-divider>

        <v-card-text>
          <div>Email: {{ user.email }}</div>
          <v-divider class="ma-3"></v-divider>
          <div class="d-flex align-center justify-space-between">權限等級: {{ user.level }} <v-btn
                color="white"
                icon="mdi-square-edit-outline"
                size="small"
              ></v-btn></div>
          <v-divider class="ma-3"></v-divider>
          <div class="d-flex align-center justify-space-between">所屬區域: {{ user.section }} <v-btn
                color="white"
                icon="mdi-square-edit-outline"
                size="small"
              ></v-btn></div>
          <v-divider class="ma-3"></v-divider>
          <div>註冊時間: {{ user.registrationTime }}</div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
    </v-container>
  </template>
  
  <script>
import axios from 'axios';

    export default {
      data() {
        return {
            userdatas:[],
            token:null,
            show: false,
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
  
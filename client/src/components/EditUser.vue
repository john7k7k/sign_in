<template>
    <v-container>
      <v-row no-gutters justify="center" class="mt-10">
        <v-card width="1024" class="mx-auto">
          <v-toolbar class="text-white" color="teal-lighten-3">
            <v-toolbar-title class="ml-5">個人基本資料</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
  
          <v-row class="d-flex justify-start">
            <v-list-item class="ml-4 mr-auto mt-15 font-weight-black"
              >使用者名稱</v-list-item 
            >
            <v-list-item
              class="mt-15 mr-4 text-center flex-grow-1"
              style="margin-left: -230px"
            >
              <t4>{{ username }}</t4>
            </v-list-item>
          </v-row>
          <v-divider class="ma-3"></v-divider>
          <v-row class="d-flex justify-start">
            <v-list-item class="ml-4 mt-5 mr-auto font-weight-black"
              >Email</v-list-item
            >
            <v-list-item class="mt-5 ml-9 text-center flex-grow-1">
              <t4>{{ email }}</t4>
            </v-list-item>
          </v-row>
          <v-divider class="ma-3"></v-divider>
          <v-row class="d-flex justify-start">
            <v-list-item class="ml-4 mr-auto mt-5 font-weight-black"
              >註冊時間</v-list-item
            >
            <v-list-item class="mt-5 mr-8 text-center flex-grow-1">
              <t4>{{ registrationTime }}</t4>
            </v-list-item>
          </v-row>
          <v-divider class="ma-3"></v-divider>
          <v-row class="d-flex justify-start">
            <v-list-item class="ml-4 mr-auto mt-5 font-weight-black"
              >權限</v-list-item
            >
            <v-list-item class="mt-5 mr-4 text-center flex-grow-1">
              <t4>{{ level }}</t4>
            </v-list-item>
            <v-list-item class="mt-5">
              <v-btn
                color="white"
                icon="mdi-square-edit-outline"
                size="small"
              ></v-btn>
            </v-list-item>
          </v-row>
          <v-divider class="ma-3"></v-divider>
          <v-row class="d-flex justify-start">
            <v-list-item class="ml-4 mr-auto mt-5 font-weight-black"
              >所屬區域</v-list-item
            >
            <v-list-item class="mt-5 mr-16 text-center flex-grow-1">
              <t4>{{ section }}</t4>
            </v-list-item>
            <v-list-item class="mt-5">
              <v-btn
                color="white"
                icon="mdi-square-edit-outline"
                size="small"
              ></v-btn>
            </v-list-item>
          </v-row>
          <v-divider class="ma-3"></v-divider>
        </v-card>
      </v-row>
    </v-container>
  </template>
  
  <script>
    export default {
      data() {
        return {
            username: localStorage.getItem('UserName'),
            email: localStorage.getItem('UserEmail'),
            level: localStorage.getItem('UserLevel'),
            section:localStorage.getItem('UserSection'),
            registrationTime: localStorage.getItem('registrationTime')
        }
      },
      methods: {
      TranSection() {
        if (this.section == "001") {
          this.section = "全區";
        } else if(this.section == "002"){
          this.section = "北科";
        } 
        else {
          this.section = "海科";
        }

        
        if (this.level < 30) {
          this.level = "管理者"
        } else {
          this.level = "遊客"
        }
      },
    },
    
    mounted() {
      this.TranSection();
    },
    }
  </script>
  
  <style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
      transition: transform 0.2s ease-in-out;
    }
  </style>
  
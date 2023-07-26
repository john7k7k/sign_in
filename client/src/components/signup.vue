<template>
    <v-container>
      
      <v-card class="mx-auto px-6 py-8 " max-width="344" color="deep-purple-darken-4">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="account"
            :readonly="loading"
            :rules="[required]"
            class="mb-2 "
            clearable
            label="使用者名稱"
            
          ></v-text-field>

          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Email"
            placeholder="Enter your Email"
          ></v-text-field>
          
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="密碼"
            placeholder="Enter your password"
          ></v-text-field>

          <v-select v-model="SelectSection" :items="section" density="comfortable"
      label="選擇區域"></v-select>
  
          <br>
  
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            註冊
          </v-btn>
        </v-form>
      </v-card>
    
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  const CryptoJS = require("crypto-js");
    export default {
      data: () => ({
        form: false,
        email:null,
        account: null,
        password: null,
        token:'',
        loading: false,
        section:[
          "北科",
          "海科"
        ],
        SelectSection:null,
      }),
  
      methods: {
        onSubmit () {
          if (!this.form) return
          this.loading = true
  
          
          axios.post(
            "http://20.89.131.34:443/api/v1/account/sign_up",
            {
              "account":this.account,
              "mail":this.email,
              "password":CryptoJS.MD5(this.password + "kowkoww151s5ww").toString() ///註冊時未加密
            },
          )
          .then(res=> {
              console.log(res);
              if(res.status == '200'){
                  alert("註冊成功!\n3秒後將會自動返回登入頁面..");
                  setTimeout(() => (this.loading = false), 2000)
                  window.location.replace("/login"); //括號內加上+res.data.token
              }else alert("註冊失敗!請再刷新螢幕重新註冊一次")
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              
              alert('註冊失敗');
          })
        },
        required (v) {
          return !!v || 'Field is required'
        },
      }
    }
  </script>
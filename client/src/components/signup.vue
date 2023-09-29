<template>
    <v-container>
      
      <v-card class="pa-3 cardbg" max-width="400" >
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-btn variant="text" route to = "/login" class="d-flex justify-end " color="indigo-accent-4"><div class="login-text">登入</div></v-btn>
        <div class="titleword mb-4 ml-2 text-white">註冊帳戶</div>
        <div class=" ml-2 mb-1 text-blue-grey-lighten-5 textdistance">使用者名稱</div> 
          <v-text-field
            density="compact"
            v-model="account"
            :readonly="loading"
            :rules="[required]"
            class="mb-1.5 mr-2 ml-2 text-white"
            placeholder=""
            bg-color="rgba(255, 255, 255, 0.2)"
          ></v-text-field>
          <div class="ml-2 mb-1 text-blue-grey-lighten-5 textdistance">Email</div>
          <v-text-field
            density="compact"
            v-model="email"
            :readonly="loading"
            :rules="[required,emailRule]"
            class="mb-1.5 mr-2 ml-2 text-white"
            placeholder=""
            bg-color="rgba(255, 255, 255, 0.2)"
          ></v-text-field>
          <div class="ml-2 mb-1 text-blue-grey-lighten-5 textdistance">密碼</div>
          <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            density="compact"
            @click:append-inner="visible = !visible"
            placeholder=""
            class="ml-2 mr-2 text-white"
            bg-color="rgba(255, 255, 255, 0.2)"
          ></v-text-field>
          <div class="ml-2 mb-1 text-blue-grey-lighten-5 textdistance">選擇區域</div>
          <v-select v-model="SelectSection" :items="section" density="comfortable" :rules="[required]" bg-color="rgba(255, 255, 255, 0.2)" class="ml-2 mr-2 text-white"></v-select>
          <br>
          <v-snackbar :timeout="1000"  rounded="pill">
      <template v-slot:activator="{ props }">
        <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            class="mb-8 sign-in-buttom "
            v-bind="props"
            width="250"
          >註冊
          </v-btn>
      </template>
    </v-snackbar>
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
        visible: false,
        IP:process.env.VUE_APP_IP,
      }),
  
      methods: {
        onSubmit () {
          if (!this.form) return
          this.loading = true
          
            axios.post(
            "/api/v1/account/sign_up",
            {
              "username":this.account,
              "mail":this.email,
              "password":CryptoJS.MD5(this.password + "kowkoww151s5ww").toString(),
              "section":this.transection(this.SelectSection),
              "level": 80
            },
          )
          .then(res=> {
              console.log(res);
              if(res.status == '200'){
                  alert("請至註冊信箱中點選驗證信進行驗證");
                  setTimeout(() => (this.loading = false), 2000)
                  window.location.replace(`/login`); //括號內加上+res.data.token
              }else alert("註冊失敗!請刷新螢幕重新註冊一次")
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              
              alert('註冊失敗');
          })
        },
        required (v) {
          return v !== null && v.trim() !== '' || '此區為必填區域'
        },
        emailRule(v) {
  return /.+@.+\..+/.test(v) || 'Email 格式不正確';
},
transection(){
  if(this.SelectSection === "北科"){
    return "002"
  }else if(this.SelectSection === "海科"){
    return "003"
  }else if(this.SelectSection === "先鋒"){
    return "004"
  }else{
    return "003"
  }
}
      }
    }
  </script>

  <style>
.cardbg {
  border-radius: 30px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
}
.login-text{
  margin-left: 50%;
  font-size: large;
  letter-spacing: 6px;
}
.titleword{
  font-size: 20px;
  letter-spacing: 6px;
}
.textdistance{
  letter-spacing: 6px;
}
.sign-in-buttom{
  border-radius: 80px;
  left: 15%;
}


</style>
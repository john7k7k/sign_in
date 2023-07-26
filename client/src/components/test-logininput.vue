<template>
    <v-container>
      
      <v-card class="mx-auto pr-3  " max-width="800" max-height="1000" color="white" >
        <div class="container">
        <v-card class="left" cover
            image="https://news-data.pts.org.tw/media/125928/cover.jpg">
          
        </v-card>
        <div class="right">
          <v-form v-model="form" @submit.prevent="onSubmit" >
        <h1 class="text-center mb-3">仿生魚監控站</h1>
        <div class="text-subtitle-1 text-black">使用者名稱</div>  
        <v-text-field
            v-model="account"
            :readonly="loading"
            :rules="[required]"
            class="mb-2 "
            clearable
            placeholder="Enter your UserName"
          ></v-text-field>
          <div
        class="text-black text-subtitle-1  d-flex align-center justify-space-between"
      >
        密碼

        <a
          class="text-caption text-decoration-underline text-white"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
          v-show="false"
        >
          忘記密碼?</a
        >
      </div>
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            @click:append-inner="visible = !visible"
            
            placeholder="Enter your password"
          ></v-text-field>
  
          <br>
  
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            class="mb-6"
          >
            登入
          </v-btn>
          </v-form>
        </div>
      </div>
        
      </v-card>
    
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  const CryptoJS = require("crypto-js");
    export default {
      data: () => ({
        form: false,
        salt:  "kowkoww151s5ww",
        account: null,
        password: null,
        token:'',
        visible: false,
        loading: false,
      }),
  
      methods: {
        onSubmit () {
          const saltedPassword = this.password + this.salt;
          const hashedPassword = CryptoJS.MD5(saltedPassword).toString();
          if (!this.form) return
          this.loading = true
          axios.post(
            "http://20.89.131.34:443/api/v1/account/login",
            {
              "username":this.account,
              "password":hashedPassword
            },
          )
          .then(res=> {
              console.log(res);
              this.loading = false;
              if(res.status == 200){
                const fish001Data = res.data.fishesID["001"];
                const fish10Values = [];
                const fish11Values = [];
                const fish12Values = [];
                Object.entries(fish001Data).forEach(([key, value]) => {
                  if (value === 1) {
                    fish11Values.push(key);
                  } else if (value === 2) {
                    fish12Values.push(key)
                  } else {
                    fish10Values.push(key)
                  }
                });
                const fish002Data = res.data.fishesID["002"];
                const fish20Values = [];
                const fish21Values = [];
                const fish22Values = [];
                Object.entries(fish002Data).forEach(([key, value]) => {
                  if (value === 1) {
                    fish21Values.push(key)
                  } else if (value === 2) {
                    fish22Values.push(key)
                  } else {
                    fish20Values.push(key)
                  }
                });
                localStorage.setItem("fish10", JSON.stringify(fish10Values));
                localStorage.setItem("fish11", JSON.stringify(fish11Values));
                localStorage.setItem("fish12", JSON.stringify(fish12Values));
                localStorage.setItem("fish20", JSON.stringify(fish20Values));
                localStorage.setItem("fish21", JSON.stringify(fish21Values));
                localStorage.setItem("fish22", JSON.stringify(fish22Values));
                localStorage.setItem("UserName",res.data.username)
                localStorage.setItem("UserEmail",res.data.email)
                localStorage.setItem("UserLevel",res.data.level)
                localStorage.setItem("UserSection",res.data.section)
                const timestamp = res.data.registrationTime
                const date = new Date(timestamp);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; 
                const day = date.getDate();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                localStorage.setItem("registrationTime",formattedDate)
                document.cookie = "token=" + res.data.token + "; path=/";
                window.location.replace(`http://localhost:8080/home`); //括號內加上+res.data.token http://20.89.131.34:443/static/dist/home
                //localStorage.getItem("fish")
                //JSON.parse
              }
              else
              alert("登入失敗")
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              alert('登入失敗');
          })
        },
        required (v) {
        return !!v || 'Field is required'
      },
        
      }
    }
  </script>


<style>
.container {
  display: flex;
}

.left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right {
  flex: 1;
  padding-left: 20px; /* 調整 form 與圖片間的間距 */
}

.image {
  max-width: 100%;
  max-height: 100%;
}
</style>
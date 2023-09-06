<template>
    <v-container>
      
      <v-card class="mx-auto px-8 py-11  " max-width="344"  color="white" >
        <div class="container">
        
          <v-form v-model="form" @submit.prevent="onSubmit" >
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
  
          
          <v-snackbar :timeout="2000" color="blue-grey" rounded="pill">
      <template v-slot:activator="{ props }">
        <v-btn
            rounded="pill"
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            class="mb-3"
            v-bind="props"
          >
            登入
          </v-btn>
      </template>
    </v-snackbar>
          </v-form>
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
        IP:process.env.VUE_APP_IP,
      }),
  
      methods: {
        onSubmit () {
          const saltedPassword = this.password + this.salt;
          const hashedPassword = CryptoJS.MD5(saltedPassword).toString();
          if (!this.form) return
          this.loading = true
          localStorage.setItem("username",this.account)
          axios.post(
            "/api/v1/account/login",
            {
              "username":this.account,
              "password":hashedPassword
            },
          )
          .then(res=> {
              console.log(res);
              this.loading = false;
              if(res.status == 200){
                localStorage.setItem("UserName",res.data.username)
                localStorage.setItem("UserEmail",res.data.email)
                localStorage.setItem("UserLevel",res.data.level)
                localStorage.setItem("UserSection",res.data.section)
                const timestamp = res.data.registrationTime
                const date = new Date(timestamp * 1000); 
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
                const day = date.getDate().toString().padStart(2, '0'); 
                const hours = date.getHours().toString().padStart(2, '0'); 
                const minutes = date.getMinutes().toString().padStart(2, '0'); 
                const seconds = date.getSeconds().toString().padStart(2, '0'); 
                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                localStorage.setItem("registrationTime",formattedDate)
                localStorage.setItem("token",res.data.token)
                document.cookie = "token=" + res.data.token + "; path=/";
                const poolTable = res.data.poolTable;
                const poolLocations = poolTable.map(pool => pool.id);
                const poolnames = poolTable.map(pool => pool.name);
                const instructiontable = res.data.instructionTable;
                const instructioncode =  instructiontable.map(ins => ins.id);
                const instructionname =  instructiontable.map(ins => ins.name);
                localStorage.setItem("PoolsCode", JSON.stringify(poolLocations));
                localStorage.setItem("PoolsName", JSON.stringify(poolnames));
                localStorage.setItem("InstructionCode", JSON.stringify(instructioncode));
                localStorage.setItem("InstructionName", JSON.stringify(instructionname));
                localStorage.setItem("UserImage", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU");
                window.location.replace(`/home`); //括號內加上+res.data.token http://20.89.131.34:443/static/dist/home
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
        return !!v || '此區為必填區域'
      },
        
      }
    }
  </script>

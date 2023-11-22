<template>
    <v-container>
      <v-card class=" pa-3 cardbg" max-width="400"    >
        <v-form v-model="form" @submit.prevent="onSubmit" >
          <v-btn variant="text" route to = "/sign/up" class="mt-2   d-flex justify-end " color="indigo-accent-4"><div class="sign-up-text">註冊</div></v-btn>
          
        <div class="titleword mb-5 ml-2 text-white">使用者登入</div>
        <div class=" ml-2 mb-1 text-blue-grey-lighten-5 textdistance">使用者ID</div>  
        <v-text-field
          density="compact"
          v-model="account"
          :readonly="loading"
          :rules="[required]"
          class="mb-3 mr-2 ml-2 textfield text-white"
          placeholder=""
          bg-color="rgba(255, 255, 255, 0.15)"
        ></v-text-field>
          <div
        class="text-blue-grey-lighten-5   d-flex align-center justify-space-between ml-2 mb-1 textdistance"
      >密碼
        <a
          class="text-caption text-decoration-underline text-blue ml-2 textdistance"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
          v-if="false"
        >
          忘記密碼?</a
        >
      </div>
          <v-text-field
            dark
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            density="compact"
            placeholder=""
            class="ml-2 mr-2 text-white"
            @click:append-inner="visible = !visible"
            bg-color="rgba(255, 255, 255, 0.15)"
          ></v-text-field>
          <br>
  
          
          <v-snackbar :timeout="1000"  rounded="pill">
      <template v-slot:activator="{ props }">
        <v-btn
            :loading="loading"
            type="submit"
            variant="elevated"
            class="mb-12 loginbuttom"
            v-bind="props"
            width="150"
          > </v-btn>
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
        salt:  "kowkoww151s5ww",
        account: null,
        password: null,
        token:'',
        visible: false,
        loading: false,
        IP:process.env.VUE_APP_IP,
        usertoken:localStorage.getItem('token'),
      }),
      async created() {
        await this.loadnewdata();

        },
      methods: {
        onSubmit () {
          const saltedPassword = this.password + this.salt;
          const hashedPassword = CryptoJS.MD5(saltedPassword).toString();
          if (!this.form) return
          this.loading = true
          localStorage.setItem("username",this.account)
          axios.post(
            "https://pre.aifish.cc"+"/api/v1/account/login",
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
                if(res.data.section == "001" && res.data.level <=10) window.location.replace(`/select/instruction`);
                else window.location.replace(`/home`);
              }
              else
              this.$Message.error('登入失敗');
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              this.$Message.error('登入失敗');
          })
        },
        required (v) {
        return !!v || '此區為必填區域'
      },
      async loadnewdata() {
          try {
            const response = await axios.get(
              "/api/v1/account",
              {
                headers: {
                  Authorization: `Bearer ${this.usertoken}`
                }
              }
            );

            console.log(response);
            if (response.status === 200) {
              window.location.replace(`/home`);
            }
          } catch (error) {
            //console.log(error);
          }
          },
        
      }
    }
  </script>

  <style scoped>
  .cardbg {
  border-radius: 30px;
  background-image: linear-gradient(to right bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.15));
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(1px);
  border: 3px solid rgba(255, 255, 255, 0.2);
}
.textfield{
  border-radius: 360px;
}
.titleword{
  font-size: 20px;
  letter-spacing: 6px;
}
.sign-up-text{
  margin-left: 50%;
  font-size: large;
  letter-spacing: 6px;
}
.textdistance{
  letter-spacing: 6px;
}

.loginbuttom{
  border-radius: 80px;
  background-image: url('../assets/登入鈕改.png');
  background-position: center;
  background-size: 101% 101%;
  left: 30%;
  transform: scale(1.1);
}








</style>

<template>
      <v-container>
      <v-row no-gutters justify="center" >
        <v-card width="1024" class=" usercard">
          <v-toolbar class="text-white" color="teal-lighten-3">
            <v-toolbar-title class="text-t4">個人基本資料</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-row class="ml-3 mt-4">
            <v-avatar :image="imageUrl" size="100"></v-avatar>
            <div class="mt-19  custom-margin"  @click="executeFunction"><v-btn @click="modal = true" flat class="text-decoration-underline word">更改頭貼照片</v-btn></div>
            <div class="mt-19  custom-margin"  @click="executeFunction"><v-btn @click="passwordmodal = true" flat class="text-decoration-underline word">更改密碼</v-btn></div>
            <Modal
              v-model="modal"
              title="變更頭貼"
              :closable="false"
              @on-ok="uploadImage"
              @on-cancel="cancel">
              <input type="file" ref="fileInput" @change="select" />
          </Modal>
          <Modal
              v-model="passwordmodal"
              title="變更帳戶密碼"
              :closable="false"
              @on-ok="changepassword"
              @on-cancel="cancel">
              <div class="text-black  d-flex align-center justify-space-between ml-2 mb-1 textdistance" >新密碼</div>
              <v-text-field
                dark
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                v-model="newpassword"
                :readonly="loading"
                :rules="[required]"
                density="compact"
                placeholder=""
                class="ml-2 mr-2 text-black"
                @click:append-inner="visible = !visible"
              ></v-text-field>
              <div class="text-black  d-flex align-center justify-space-between ml-2 mb-1 textdistance" >確認新密碼</div>
              <v-text-field
                dark
                :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible2 ? 'text' : 'password'"
                v-model="newpassword2"
                :readonly="loading"
                :rules="[required]"
                density="compact"
                placeholder=""
                class="ml-2 mr-2 text-black"
                @click:append-inner="visible2 = !visible2"
              ></v-text-field>
          </Modal>
          <Modal
              v-model="checkmodal"
              title="變更帳戶密碼"
              :closable="false"
              @on-ok="checkpassword"
              @on-cancel="cancel">
              <div class="text-black  d-flex align-center justify-space-between ml-2 mb-1 textdistance" >驗證碼</div>
              <v-text-field
                dark
                v-model="checkcode"
                density="compact"
                placeholder=""
                class="ml-2 mr-2 text-black"
              ></v-text-field>
          </Modal>
          </v-row>
          <div class="box">
            <div class="item1">使用者名稱</div>
            <div class="item2">{{ username }}</div>
          </div>
          <v-divider class="ma-3"></v-divider>
          <div class="box">
            <div class="item1">Email</div>
            <div class="item2">{{ email }}</div>
          </div>
          <v-divider class="ma-3"></v-divider>
          <div class="box">
            <div class="item1">註冊時間</div>
            <div class="item2">{{ registrationTime }}</div>
          </div>
          <v-divider class="ma-3"></v-divider>
          <div class="box">
            <div class="item1">權限</div>
            <div class="item2">{{ level }}</div>
          </div>
          <v-divider class="ma-3"></v-divider>
          <div class="box">
            <div class="item1">所屬區域</div>
            <div class="item2">{{ section }}</div>
          </div>
          <v-divider class="ma-3"></v-divider>
        </v-card>
      </v-row>
    </v-container>
  </template>

<style scoped>
.custom-margin {
margin-top: 70px; 
color: blue;
}
.usercard{
margin-top: 8%;
}
.box{
  display: flex;
  width: 100%;
  margin-top: 3%;
}
.item1{
  width: 50%;
  justify-content: start;
  position: relative;
  left: 3%;
  font-weight: bold;
  font-size: 16px;
}
.item2,.word{
  font-size: 16px;
}
@media screen and  (min-width: 601px) and (max-width: 1024px){
  .usercard{
margin-top: 30%;

}
.box{
  display: flex;
  width: 100%;
  margin-top: 8%;
}
.item1{
  width: 50%;
  justify-content: start;
  position: relative;
  left: 3%;
  font-weight: bold;
  font-size: 22px;
}
.item2,.word{
  font-size: 22px;
}
}
@media screen and (min-width: 401px) and (max-width: 600px){
  .usercard{
margin-top: 50%;

}
.box{
  display: flex;
  width: 100%;
  margin-top: 8%;
}
.item1{
  width: 50%;
  justify-content: start;
  position: relative;
  left: 3%;
  font-weight: bold;
  font-size: 15px;
}
.item2,.word{
  font-size: 15px;
}
}
@media screen and (max-width: 400px) {
  .usercard{
margin-top: 20%;

}
.box{
  display: flex;
  width: 100%;
  margin-top: 8%;
}
.item1{
  width: 50%;
  justify-content: start;
  position: relative;
  left: 3%;
  font-weight: bold;
  font-size: 12px;
}
.item2,.word{
  font-size: 12px;
}
}
</style>
  
  <script>
  import axios from 'axios';
  const CryptoJS = require("crypto-js");
    export default {
      data() {
        return {
            username: localStorage.getItem('UserName'),
            email: localStorage.getItem('UserEmail'),
            level: localStorage.getItem('UserLevel'),
            section:localStorage.getItem('UserSection'),
            registrationTime: localStorage.getItem('registrationTime'),
            IP:process.env.VUE_APP_IP,
            modal:false,
            passwordmodal:false,
            token:localStorage.getItem('token'),
            imageUrl: require("../assets/nabarlogo.png"),
            visible: false,
            visible2: false,
            newpassword:"",
            newpassword2:"",
            salt:  "kowkoww151s5ww",
            checkmodal:false,
            checkcode:"",
        }
      },
      methods: {
      TranSection() {
        if(this.username === "123"){
          this.level = "最高管理員"
        }else if (this.level === "10" && this.section === "001") {
          this.level = "總管理員"
        }else if (this.level === "20" && this.section === "001") {
          this.level = "全區管理員"
        }else if (this.level === "30" && this.section === "001") {
          this.level = "全區工程師"
        }else if (this.level === "10" ) {
          this.level = "分區總管"
        }else if (this.level === "20" ) {
          this.level = "分區管理員"
        }else if (this.level === "30" ) {
          this.level = "分區工程師"
        }else if (this.level === "40" ) {
          this.level = "作業員"
        } else {
          this.level = "用戶"
        }


        if (this.section == "001") {
          this.section = "全區";
        } else if(this.section == "002"){
          this.section = "北科";
        } 
        else {
          this.section = "海洋科技博物館";
        }

        
      },
      select(e){
        this.selectFile = e.target.files[0]
      },
      uploadImage() {
        if (typeof this.selectFile === 'undefined') {
          this.$Message.error('尚未選擇圖片');
          return;
        }
        const formData = new FormData()
        formData.append('image',this.selectFile)
        axios.post(
          process.env.VUE_APP_SEVER+"/api/v1/account/sticker",formData,{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              
              if(res.status == 200){
                this.$Message.success('變更成功');
                location.reload();
              }
              else
              this.$Message.error('變更失敗');
          })
          .catch(err=> {
              console.log(err);
              this.$Message.error('變更失敗');
          })
      },
      fetchImage(){
        axios.get(
          process.env.VUE_APP_SEVER+"/api/v1/account/sticker", { responseType: 'blob', headers: {
          Authorization: `Bearer ${this.token}`
        }}) 
              .then(res=> {
              console.log(res);
              const imageUrl = URL.createObjectURL(new Blob([res.data]));
              this.imageUrl = imageUrl;
          })
          .catch(err=> {
              console.log(err);
          })
      },
      changepassword () {
          const saltedPassword = this.newpassword + this.salt;
          const hashedPassword = CryptoJS.MD5(saltedPassword).toString();
          if (this.newpassword != this.newpassword2) {
            this.$Message.error('密碼不相同 請重新輸入!');
            return
          }
          axios.post(
            process.env.VUE_APP_SEVER+"/api/v1/account/reset_password",
            {
              "username":this.username,
              "mail": this.email,
              "password":hashedPassword
            },
          )
          .then(res=> {
              console.log(res);
              if(res.status == 200){
                this.$Message.success('已寄出驗證信到個人信箱以便做進一步驗證');
                this.checkmodal = true;
                
              }
              else
              this.$Message.error('變更密碼失敗');
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              this.$Message.error('變更密碼失敗');
          })
        },
        checkpassword () {
          axios.post(
            process.env.VUE_APP_SEVER+"/api/v1/account/reset_password_check",
            {
              "username":this.username,
              "code": this.checkcode
            },
          )
          .then(res=> {
              console.log(res);
              if(res.status == 200){
                this.$Message.success('變更密碼成功');
                
              }
              else
              this.$Message.error('變更密碼失敗');
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              this.$Message.error('變更密碼失敗');
          })
        },
    },
    
    mounted() {
      this.TranSection();
    },
    created(){
      this.fetchImage();
    }
    }
  </script>
  
  
  
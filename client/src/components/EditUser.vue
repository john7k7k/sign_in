<template>
    <v-container>
      <v-row no-gutters justify="center" class="mt-10">
        <v-card width="1024" class="mx-auto">
          <v-toolbar class="text-white" color="teal-lighten-3">
            <v-toolbar-title class="ml-5">個人基本資料</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-row class="ml-3 mt-4">
            <v-avatar :image="imageUrl" size="100"></v-avatar>
            <div class="mt-19  custom-margin"  style="color: blue;" @click="executeFunction"><v-btn @click="modal = true" flat class="text-decoration-underline">更改頭貼照片</v-btn></div>
            <div class="mt-19  custom-margin"  style="color: blue;" @click="executeFunction"><v-btn @click="passwordmodal = true" flat class="text-decoration-underline">更改密碼</v-btn></div>
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
              @on-ok="uploadImage"
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
          </v-row>
        
          <v-row class="d-flex justify-start">
            <v-list-item class="ml-6 mr-auto mt-8 font-weight-black"
              >使用者名稱</v-list-item 
            >
            <v-list-item
              class="mt-8 mr-4 text-center flex-grow-1"
              style="margin-left: -230px"
            >
              <t4>{{ username }}</t4>
            </v-list-item>
          </v-row>
          <v-divider class="ma-3"></v-divider>
          <v-row class="d-flex justify-start">
            <v-list-item class="ml-6 mt-5 mr-auto font-weight-black"
              >Email</v-list-item
            >
            <v-list-item class="mt-5 mr-2 text-center flex-grow-1">
              <t4>{{ email }}</t4>
            </v-list-item>
          </v-row>
          <v-divider class="ma-3"></v-divider>
          <v-row class="d-flex justify-start">
            <v-list-item class="ml-6 mr-auto mt-5 font-weight-black"
              >註冊時間</v-list-item
            >
            <v-list-item class="mt-5 mr-10 text-center flex-grow-1">
              <t4>{{ registrationTime }}</t4>
            </v-list-item>
          </v-row>
          <v-divider class="ma-3"></v-divider>
          <v-row class="d-flex justify-start">
            <v-list-item class="ml-6 mr-auto mt-5 font-weight-black"
              >權限</v-list-item
            >
            <v-list-item class="mt-5 mr-7 text-center flex-grow-1">
              <t4>{{ level }}</t4>
            </v-list-item>
            <v-list-item class="mt-5">
              <v-btn
                v-show="false"
                color="white"
                icon="mdi-square-edit-outline"
                size="small"
              ></v-btn>
            </v-list-item>
          </v-row>
          <v-divider class="ma-3"></v-divider>
          <v-row class="d-flex justify-start">
            <v-list-item class="ml-6 mr-auto mt-5 font-weight-black"
              >所屬區域</v-list-item
            >
            <v-list-item class="mt-5 mr-14 pr-14 text-center flex-grow-1">
              <t4>{{ section }}</t4>
            </v-list-item>
            <v-list-item class="mt-5">
              <v-btn
                v-show="false"
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
  import axios from 'axios';
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
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU",
            visible: false,
            visible2: false,
            newpassword:"",
            newpassword2:""
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
          this.section = "海科";
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
          "/api/v1/account/sticker",formData,{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              
              if(res.status == 200){
                this.$Message.success('變更成功');
                this.fetchImage();
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
          "/api/v1/account/sticker", { responseType: 'blob', headers: {
          Authorization: `Bearer ${this.token}`
        }}) 
              .then(res=> {
              console.log(res);
              const imageUrl = URL.createObjectURL(new Blob([res.data]));
              this.imageUrl = imageUrl;
              localStorage.setItem("UserImage", this.imageUrl);
          })
          .catch(err=> {
              console.log(err);
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
  
  <style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
      transition: transform 0.2s ease-in-out;
    }
    .custom-margin {
  margin-top: 70px; 
}

  </style>
  
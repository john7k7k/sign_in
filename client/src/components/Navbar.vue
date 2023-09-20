<template>
  <div>
  <v-toolbar
    class=" pt-1 pb-2"
    dark
    color="black"
  >
  <v-app-bar-nav-icon v-if="isMobileScreen" class="" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <div v-if="!isMobileScreen" >
      <v-btn class="ml-5 navbartext" value="home1"  href="/home">主頁</v-btn>
      <v-btn  value="about" href="/user" class="navbartext">個人資料</v-btn>
      <v-btn  value="data" href="/fish/list" v-if="fishlistshow" class="navbartext">仿生魚清單</v-btn>
      <v-btn  v-if="userlistshow" value="accountdata" href="/account/list" class="navbartext">帳號清單</v-btn>
      <v-btn  v-if="signupSectionshow" value="signupsection" href="/sign/up/pool" class="navbartext">註冊機構/水池</v-btn>
      <v-btn  value="out" @click="logout" href="/login" class="navbartext">登出</v-btn>
    </div>
    <v-spacer ></v-spacer>
    <div>
      <v-avatar class=" mr-8 " :image="imageUrl" :size="isMobileScreen ? 41:45"></v-avatar>
      
    </div>
    
    <v-btn v-show="false" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    
  </v-toolbar>
  <div class=" text-white usernametext ">{{ username }}</div>
</div>


  <v-navigation-drawer v-model="drawer" temporary class="#CE93D8">
    <v-list-item
      :prepend-avatar="imageUrl"
      :title="username" 
      :subtitle="userLevelText"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav >
      <v-list-item
        prepend-icon="mdi-home"
        title="主頁"
        value="home1"
        ref="homeItem"
        route to = "/home"
      ></v-list-item>
        <v-list-item
          prepend-icon="mdi-square-edit-outline"
          title="個人資料設定"
          value="about"
          route to = "/user"
        ></v-list-item>
        <v-list-item
          v-show="fishlistshow"
          prepend-icon="mdi mdi-clipboard-text-search-outline"
          title="仿生魚資料清單"
          value="data"
          route to = "/fish/list"
        ></v-list-item>
        <v-list-item
          v-show="userlistshow"
          prepend-icon="mdi mdi-clipboard-text-search-outline"
          title="帳號資料清單"
          value="accountdata"
          route to = "/account/list"
        ></v-list-item>
        <v-list-item
          v-show="signupSectionshow"
          prepend-icon="mdi mdi-clipboard-text-search-outline"
          title="註冊機構/部門水池"
          value="signupsection"
          route to = "/sign/up/pool"
        ></v-list-item>
      <v-list-item
        prepend-icon="mdi-export"
        title="登出"
        value="out"
        @click="logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
  

</template>
<script>
import axios from 'axios';

export default {
data() {
  return {
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    drawer: null,
    userimage: "",
    imageUrl: localStorage.getItem('UserImage'),
    username: localStorage.getItem('UserName'),
    level: localStorage.getItem('UserLevel'),
    token:localStorage.getItem('token'),
    section:localStorage.getItem('UserSection'),
    userlistshow:false,
    fishlistshow:false,
    signupSectionshow:false,
    links: [
      { icon: "", text: "", route: "/" },
      { icon: "", text: "", route: "/" },
      { icon: "", text: "", route: "/" }
    ],
    IP:process.env.VUE_APP_IP,
    userlogo:"../assets/card.png",
    
  }
},
mounted() {
        window.addEventListener('resize', this.updateScreenSize);
        this.updateScreenSize();
      },
beforeUnmount() {
        window.removeEventListener('resize', this.updateScreenSize);
      },
methods: {
  updateScreenSize() {
        this.isMobileScreen = window.innerWidth <= 768; 
      },
  userlevel() {
    if (this.level === "5" ) {
      this.userlistshow = true;
      this.fishlistshow = true;
      this.signupSectionshow = true;
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP54Z1Z-evI0ehyLLk56FXAlFwVHskrj7CmQ&usqp=CAU"
      return "最高管理員";
    } else if (this.level === "10" && this.section === "001"){
      this.fishlistshow = true;
      this.userlistshow = true;
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
      return "總管理員";
    } else if (this.level === "20" && this.section === "001"){
      this.fishlistshow = true;
      this.userlistshow = true;
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
      return "全區管理員";
    } else if (this.level === "30" && this.section === "001"){
      this.fishlistshow = true;
      this.userlistshow = true;
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
      return "全區工程師";
    }else if (this.level === "10"){
      this.fishlistshow = true;
      this.userlistshow = true;
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
      return "分區總管";
    }else if (this.level === "20"){
      this.fishlistshow = true;
      this.userlistshow = true;
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
      return "分區管理員";
    }else if (this.level === "30"){
      this.fishlistshow = true;
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
      return "分區工程師";
    }else if (this.level === "40" || this.level === "50" || this.level === "60" || this.level === "70"){
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
      return "管理員";
    }else {
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
      return "用戶";
    }
  },
  logout(){
    axios.post(
          "/api/v1/account/logout",{},{
  headers: {
    Authorization: `Bearer ${this.token}`
  }
}
        )
        .then(res=> {
            console.log(res);
            
            if(res.status == 200){
              this.$Message.success('登出成功');
              document.cookie = "token=" + res.data.token + "; path=/";
              window.location.replace(`/login`); 
            }
            else
            this.$Message.error('登出失敗');
        })
        .catch(err=> {
            console.log(err);
            this.loading = false;
            this.$Message.error('登出失敗');
        })
  },
  routehome() {
    this.$refs.homeItem.$el.click();
    this.$router.push('/home');
    
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
            localStorage.setItem("isMobileScreen",this.isMobileScreen)
        })
        .catch(err=> {
            console.log(err);
        })
    },
},
computed: {
  userLevelText() {
    return this.userlevel();
  }
},
created(){
  this.fetchImage();
  
}
}
</script>

<style>
.navbartext{
  font-size: 17px;
}
.usernametext {
  font-size: 15px;
  position: absolute; 
  top: 70px;
  left: 95.6%;
  z-index: 2;
}
  .dialog-bottom-transition-enter-active,
  .dialog-bottom-transition-leave-active {
    transition: transform 0.2s ease-in-out;
  }
  @media screen and (max-width: 600px) {
    .usernametext {
  font-size: 15px;
  position: absolute; 
  top: 60px;
  left: 83%;
  z-index: 2;
}

  }
  
  
  
</style>



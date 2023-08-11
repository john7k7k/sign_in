<template>
    <div>
    <v-toolbar
      dark
      prominent
      color="cyan-lighten-3"
    >
      
      <v-avatar>
        <v-img
          src="../assets/nabarlogo.png"
          alt="logo"
        ></v-img>
      </v-avatar>
      <v-toolbar-title ><v-btn class="font-weight-black" @click="routehome"><h2>仿生魚監控站</h2></v-btn></v-toolbar-title>

      <v-spacer Hidden only on xs></v-spacer>

      <v-btn v-show="false" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-toolbar>
  </div>

  
    <v-navigation-drawer v-model="drawer" temporary class="#CE93D8">
      <v-list-item
        :prepend-avatar="userimage"
        :title="username" 
        :subtitle="userLevelText"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav >
        <v-list-item
          prepend-icon="mdi-home"
          title="主頁"
          value="home1"
          route to = "/home"
        ></v-list-item>
          <v-list-item
            prepend-icon="mdi-square-edit-outline"
            title="個人資料設定"
            value="about"
            route to = "/UserData"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi mdi-clipboard-text-search-outline"
            title="仿生魚資料清單"
            value="data"
            route to = "/FishDataList"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi mdi-clipboard-text-search-outline"
            title="帳號資料清單"
            value="accountdata"
            route to = "/AccountList"
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
      username: localStorage.getItem('UserName'),
      level: 30,
      token:null,
      links: [
        { icon: "", text: "", route: "/" },
        { icon: "", text: "", route: "/" },
        { icon: "", text: "", route: "/" }
      ],
      IP:process.env.VUE_APP_IP,
    }
  },
  methods: {
    userlevel() {
      if (this.level < 50) {
        this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP54Z1Z-evI0ehyLLk56FXAlFwVHskrj7CmQ&usqp=CAU"
        return "管理員";
      } else {
        this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
        return "遊客";
      }
    },
    logout(){
      const cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].split("=");
          if (cookie[0] === "token") {
          const token = cookie[1];
          this.token = token;
          break;
  }
}
      axios.post(
            "http://"+this.IP+"/api/v1/account/logout",{},{
    headers: {
      Authorization: `Bearer ${this.token}`
    }
  }
          )
          .then(res=> {
              console.log(res);
              
              if(res.status == 200){
                alert("登出成功")
                document.cookie = "token=" + res.data.token + "; path=/";
                window.location.replace(`/`); 
              }
              else
              alert("登出失敗")
          })
          .catch(err=> {
              console.log(err);
              this.loading = false;
              alert('登出失敗');
          })
    },
    routehome() {
      this.$router.push('/home');
    }
  },
  computed: {
    userLevelText() {
      return this.userlevel();
    }
  }
}
</script>

<style>
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
      transition: transform 0.2s ease-in-out;
    }

    
    
  </style>



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
      <v-toolbar-title ><v-btn class="font-weight-black" value="home1" @click="routehome"><h2>仿生魚監控站</h2></v-btn></v-toolbar-title>

      <v-spacer Hidden only on xs></v-spacer>

      <v-btn v-show="false" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-toolbar>
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
      links: [
        { icon: "", text: "", route: "/" },
        { icon: "", text: "", route: "/" },
        { icon: "", text: "", route: "/" }
      ],
      IP:process.env.VUE_APP_IP,
      userlogo:"../assets/card.png"
    }
  },
  methods: {
    userlevel() {
      if (this.level === "5" ) {
        this.userlistshow = true;
        this.fishlistshow = true;
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
            "http://"+this.IP+"/api/v1/account/sticker", { responseType: 'blob', headers: {
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
    .dialog-bottom-transition-enter-active,
    .dialog-bottom-transition-leave-active {
      transition: transform 0.2s ease-in-out;
    }

    
    
  </style>



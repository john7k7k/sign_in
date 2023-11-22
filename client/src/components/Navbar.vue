<template>
  <div>
  <v-toolbar
  :key="desktopKey"
    class="  pb-2 navbar"
    dark
  >
  <template v-slot:prepend> 
      <v-img
        src="../assets/logo北科.png"
        alt="logo"
        width="70"
        class="logoimage"
        v-if="!isMobileScreen"
      ></v-img>
    
      </template>
  <v-app-bar-nav-icon v-if="isMobileScreen"  class="ml-4" @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
    <div v-if="!isMobileScreen" >
      <v-btn class="ml-5 navbartext font-weight-bold" value="home1"  href="/home">主頁</v-btn>
      <v-btn  v-if="SelectSectionshow" class="navbartext font-weight-bold text-white" @click="loadnewdata">選擇機構</v-btn>
      <v-btn  value="data" href="/fish/list" v-if="fishlistshow" class="navbartext font-weight-bold">仿生魚清單</v-btn>
      <v-btn  v-if="userlistshow" value="accountdata" href="/account/list" class="navbartext font-weight-bold">帳號清單</v-btn>
      <v-btn  v-if="signupSectionshow" value="signupsection" href="/sign/up/pool" class="navbartext font-weight-bold">註冊機構/水池</v-btn>
      <v-btn  v-if="controllershow" value="controller" href="/controller" class="navbartext font-weight-bold">遙控器設定</v-btn>
      <v-btn  value="out" @click="logout"   class="navbartext font-weight-bold text-white">登出</v-btn>
    </div>
    <v-spacer ></v-spacer>
    <div  class=" text-white navbartext font-weight-bold mt-2">{{ username }}</div>
    <div>
      <v-btn  value="about" href="/user" ><v-avatar class=" mr-4 " :image="imageUrl" :size="isMobileScreen ? 41:45"></v-avatar></v-btn>
      
      
    </div>
    
    <v-btn v-show="false" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    
  </v-toolbar>
  
</div>


  <v-navigation-drawer v-model="drawer" temporary class="drawerbg" width="300">
    <v-list-item
      prepend-icon="mdi mdi-close"
      class="text-white"
      :title="username" 
      :subtitle="userLevelText"
      @click.stop="drawer = !drawer"
    ></v-list-item>

    <v-divider class="text-white"></v-divider>

    <v-list density="compact" nav >
      <v-list-item
        prepend-icon="mdi-home"
        title="主頁"
        value="home1"
        ref="homeItem"
        class="text-white "
        route to = "/home"
      ></v-list-item>
      <v-list-item
        v-if="SelectSectionshow"
        prepend-icon="mdi mdi-hand-pointing-up"
        title="選擇機構"
        value="select"
        class="text-white "
        @click="loadnewdata"
      ></v-list-item>
        <v-list-item
          prepend-icon="mdi-square-edit-outline"
          title="個人資料設定"
          value="about"
          route to = "/user"
          class="text-white"
        ></v-list-item>
        <v-list-item
          v-show="fishlistshow"
          prepend-icon="mdi mdi-clipboard-text-search-outline"
          title="仿生魚資料清單"
          value="data"
          route to = "/fish/list"
          class="text-white"
        ></v-list-item>
        <v-list-item
          v-show="userlistshow"
          prepend-icon="mdi mdi-clipboard-text-search-outline"
          title="帳號資料清單"
          value="accountdata"
          route to = "/account/list"
          class="text-white"
        ></v-list-item>
        <v-list-item
          v-show="signupSectionshow"
          prepend-icon="mdi mdi-clipboard-text-search-outline"
          title="註冊機構/部門水池"
          value="signupsection"
          route to = "/sign/up/pool"
          class="text-white"
        ></v-list-item>
      <v-list-item
        prepend-icon="mdi-export"
        title="登出"
        value="out"
        @click="logout"
        class="text-white"
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
    SelectSectionshow:false,
    userlistshow:false,
    fishlistshow:false,
    signupSectionshow:false,
    controllershow:false,
    links: [
      { icon: "", text: "", route: "/" },
      { icon: "", text: "", route: "/" },
      { icon: "", text: "", route: "/" }
    ],
    IP:process.env.VUE_APP_IP,
    userlogo:"../assets/card.png",
    desktopKey: 0,
  }
},
watch: {
    screenWidth(newWidth) {
      this.updateScreenSize(newWidth);
    },
  },   
mounted() {
    window.addEventListener('resize', () => {
      this.updateScreenSize(this.screenWidth);
    });
    this.updateScreenSize(this.screenWidth); 
  },
  beforeUnmount() {
    window.removeEventListener('resize', () => {
      this.updateScreenSize(this.screenWidth);
    });
  },
methods: {
  updateScreenSize() {
        this.isMobileScreen = window.innerWidth <= 768; 
        if (this.isMobileScreen) {
        this.desktopKey += 1;
      }
      },
  userlevel() {
    if (this.level === "5" ) {
      this.SelectSectionshow = true;
      this.userlistshow = true;
      this.fishlistshow = true;
      this.signupSectionshow = true;
      this.controllershow = true;
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP54Z1Z-evI0ehyLLk56FXAlFwVHskrj7CmQ&usqp=CAU"
      return "最高管理員";
    } else if (this.level === "10" && this.section === "001"){
      this.SelectSectionshow = true ;
      this.fishlistshow = true;
      this.userlistshow = true;
      this.controllershow = true;
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
      return "總管理員";
    } else if (this.level === "20" && this.section === "001"){
      this.fishlistshow = true;
      this.userlistshow = true;
      this.userimage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1f4J_Qn_tU9gsrwEcIxIdFzgGYVt_mbCjDg&usqp=CAU"
      return "全區管理員";
    } else if (this.level === "30" && this.section === "001"){
      this.fishlistshow = true;
      this.userlistshow = false;
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
              localStorage.setItem("token","")
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
    async loadnewdata() {
          try {
            const res = await axios.get(
              "https://pre.aifish.cc"+"/api/v1/account",
              {
                headers: {
                  Authorization: `Bearer ${this.token}`
                }
              }
            );

            console.log(res);
            if (res.status === 200) {
                const poolTable = res.data.poolTable;
                const poolLocations = poolTable.map(pool => pool.id);
                const poolnames = poolTable.map(pool => pool.name);
                const instructiontable = res.data.instructionTable;
                const instructioncode =  instructiontable.map(ins => ins.id);
                const instructionname =  instructiontable.map(ins => ins.name);
                const departTable = res.data.departTable;
                const departcode =  departTable.map(ins => ins.id);
                const departname =  departTable.map(ins => ins.name);
                localStorage.setItem("PoolsCode", JSON.stringify(poolLocations));
                localStorage.setItem("PoolsName", JSON.stringify(poolnames));
                localStorage.setItem("InstructionCode", JSON.stringify(instructioncode));
                localStorage.setItem("InstructionName", JSON.stringify(instructionname));
                localStorage.setItem("DepartCode", JSON.stringify(departcode));
                localStorage.setItem("DepartName", JSON.stringify(departname));
                window.location.replace(`/select/instruction`);
            }
          } catch (error) {
            //console.log(error);
          }
          },
},
computed: {
  screenWidth() {
      return window.innerWidth;
    },
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
.logoimage{
  transform: scale(2.3);
}
.drawerbg{
  background-color:  rgba(0, 0, 0, 0.8);
}
.navbar{
  z-index: 2;
  background-color: rgba(0, 0, 0, 0); 
}
.navbartext{
  color: white;
  font-size: 17px;
}
.usernametext {
  font-size: 18px;
  position: absolute;
  right: 1px;
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
  top: 70px;
  left: 83%;
  z-index: 2;
}

  }

  @media screen and (min-width: 601px) and (max-width: 1024px){
    .usernametext {
      font-size: 18px;
      position: absolute; 
      top: 6.5%;
      left: 91.4%;
      z-index: 2;
    }
  }
  
  @media screen and (min-width: 768px) and (max-width: 1200px) and (orientation: landscape){
    .usernametext {
      font-size: 18px;
      position: absolute; 
      top: 9%;
      left: 94%;
      z-index: 2;
    }
  }
  
</style>



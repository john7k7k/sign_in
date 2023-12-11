<template>
  <div class="wrapper">
    <div class="content">

      <div class="navbar">
        <v-img src="@/assets/logo北科.png" class = "logo" />
        <router-link to="/homepage">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/services">Services</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/login">Login</router-link>
      </div>

      <main>
      <div  class="say">
        <v-img src="@/assets/OIP.jpg" class = "fish" />
       <div class="text">
       <br>
國立台北科技大學「仿生機械魚」躍上大銀幕，成為春節強檔電影《素還真》裡的霹靂黃金魚，北科大講座教授、考試委員姚立德帶著學生研究團隊，使用AI技術學習模擬真魚游動，再將程式寫進晶片裡控制馬達，耗時1年不斷調整改進，終於得以讓機械魚栩栩如生自然游動。

姚立德說，這是台灣最悠久的技職領航學府，與台灣最悠久的娛樂文化藝術，所激盪出最美的擬真科技。

他說，魚類是仿生學的重要研究對象之一，具有優於現行水下載具的超高游動能力、游動效率及游動速度。仿生魚在機構設計上比照真實魚類的流體外型，研究團隊長時間大量拍攝魚的游動，蒐集分析海量運動數據後，使用AI技術學習模擬，再將程式寫進晶片裡控制馬達，才能讓機械魚栩栩如生自然游動。

而仿生魚原本沒有「魚皮」及「魚鱗組」，為了讓電影呈現更加寫實，霹靂團隊提出可以做一件衣服，用磁鐵讓魚鱗牢牢貼在機械魚身上，並邀請紡織產業綜合研究所、威灝國際等陣容，一起克服尺寸縮小、著裝等各種困難，三方合作才完成「黃金魚」通體金黃鱗片的外皮。

霹靂國際總經理、《素還真》總監製黃亮勛說，霹靂傳奇英雄「素還真」風靡全台超過30年，今年終於將素還真不為人知的少年故事搬上電影銀幕，是台灣電影結合在地先進仿生科技的絕美呈現。

姚立德也說，學校全力支持霹靂仿生魚的產學合作，結合AI科技與人文藝術，善盡大學社會責任，實現跨領域、跨產業的深度技術交流，未來仿生機械魚可輔助研究魚群效應，在工程應用方面亦能進行水下探勘、水質檢測。
       </div>
       </div>
      </main>
    </div>

    <footer>
      <p>&copy; NTUT LAB-314</p>
    </footer>
  </div>
</template>

<script>
 

export default {
  components: {
    
  },
  data() {
    return {
      swiperOption:{

      }
    }
  },
  
}
</script>

<style>

body, html {
  height: 100%;
  margin: 0;
}


.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.logo {
    height: 120px;
    width: 120px;
    float: left;
    top: -50px;
    left: -30px;
}
.text{
    left: -30px;
    width: 1350px;
}
.navbar {
  background-color: #333;
  color: #fff;
  padding: 1rem;
}

.navbar a {
  color: #fff;
  margin-right: 1rem;
  text-decoration: none;
}

main {
  padding: 2rem;
  color: white;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
}

.fish {
    height: 200px;
    width: 200px;
    float: left;
    top: 10px;
    left: -60px;
}
.say{
    background-color: #221111;
    height: 220px;
    top: -130px;
    border-radius: 50px;
}

</style>

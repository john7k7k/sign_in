<template>
  <div id="app">
    <nav>
      <ul>
        <li><a href="javascript:void(0)" v-scroll-to="'#about'">自我簡介</a></li>
        <li><a href="javascript:void(0)" v-scroll-to="'#life'">我的生活</a></li>
        <li><a href="javascript:void(0)" v-scroll-to="'#work'">我的工作</a></li>
        <li><a href="javascript:void(0)" v-scroll-to="'#goals'">大小目標</a></li>
        <li><a href="javascript:void(0)" v-scroll-to="'#relationship'">感情經歷</a></li>
      </ul>
    </nav>
    <div class="content">
      <section id="about" class="section">
        <h2>自我簡介</h2>
        <img src="@/assets/about.jpg" alt="自我簡介圖片">
        <li><strong>我是</strong>: 鄭子強</li>
          <li><strong>職業</strong>: 開發仿生機器魚、兼職程式講師</li>
          <li><strong>教育背景</strong>: 
            <ul>
              <li>NTUT EE</li>
              <li>國立嘉義高工 電機科</li>
            </ul>
          </li>
        <p>{{ aboutText }}</p>
        
      </section>
      <section id="life" class="section">
        <h2>我的生活</h2>
        <img src="@/assets/life.jpg" alt="自我簡介圖片">
        <p>{{ lifeText }}</p>
        
      </section>
      <section id="work" class="section">
        <h2>我的工作</h2>
        <img src="@/assets/work.jpg" alt="自我簡介圖片">
        <p>{{ workText }}</p>

      </section>
      <section id="goals" class="section">
        <h2>大小目標</h2>
        <img src="@/assets/goals.jpg" alt="自我簡介圖片">
        <p>{{ goalsText }}</p>
      </section>
      <section id="relationship" class="section">
        <h2>感情經歷</h2>
        <img src="@/assets/relationship.jpg" alt="自我簡介圖片">
        <p>{{ relationshipText }}</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aboutText: '',
      lifeText: '',
      workText: '',
      goalsText: '',
      relationshipText: ''
    };
  },
  created() {
    this.loadTextContent();
  },
  methods: {
    async loadTextContent() {
      this.aboutText = require('@/assets/text/about.js');
      this.lifeText = require('@/assets/text/life.js');
      this.workText = require('@/assets/text/work.js');
      this.goalsText = require('@/assets/text/goals.js');
      this.relationshipText = require('@/assets/text/relationship.js');
    },
    async fetchText(path) {
      const response = await fetch(path);
      return await response.text();
    }
  }
};
</script>


<style>
/* 基础样式 */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  color: #333;
}

#app {
  text-align: center;
}

/* 导航栏样式 */
nav {
  background-color: #4CAF50;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin: 0 15px;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: color 0.3s;
}

nav ul li a:hover {
  color: #ffeb3b;
}

/* 内容区样式 */
.content {
  padding-top: 80px; /* 避免内容被固定导航栏遮挡 */
}

.section {
  padding: 60px 20px;
  background-color: white;
  margin: 20px auto;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s;
}

.section:hover {
  transform: translateY(-5px);
}

.section h2 {
  color: #4CAF50;
  font-size: 2rem;
  margin-bottom: 15px;
}

/* 自我简介列表样式 */
section#about ul {
  list-style-type: none;
  padding: 0;
  text-align: left; /* 左对齐列表项 */
}

section#about li {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 10px;
  color: #333;
  padding-left: 20%;
  position: relative;
  text-align: left;
}

section#about li::before {
  content: '•';
  color: #4CAF50;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1.5em;
}

section#about ul li {
  padding-left: 15%;
}

/* 图片样式 */
.section img {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 响应式样式 */
@media (max-width: 600px) {
  nav ul li {
    margin: 0 10px;
  }

  nav ul li a {
    font-size: 1rem;
  }

  .section {
    padding: 40px 10px;
    width: 95%;
  }

  .section h2 {
    font-size: 1.5rem;
  }

  .section p {
    font-size: 1rem;
  }
}
</style>
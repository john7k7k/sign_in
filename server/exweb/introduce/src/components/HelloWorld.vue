<template>
  <div id="app">
    <nav>
      <ul>
        <li><a href="#about">自我簡介</a></li>
        <li><a href="#life">我的生活</a></li>
        <li><a href="#work">我的工作</a></li>
        <li><a href="#goals">大小目標</a></li>
        <li><a href="#relationship">感情經歷</a></li>
      </ul>
    </nav>
    <section id="about">
      <h2>自我簡介</h2>
      <p>這裡是關於你的自我介紹。</p>
      <img src="@/assets/about.jpg" alt="自我簡介圖片">
    </section>
    <section id="life">
      <h2>我的生活</h2>
      <p>這裡描述你的日常生活。</p>
      <img src="@/assets/life.jpg" alt="生活圖片">
    </section>
    <section id="work">
      <h2>我的工作</h2>
      <p>這裡介紹你的工作經歷。</p>
      <img src="@/assets/work.jpg" alt="工作圖片">
    </section>
    <section id="goals">
      <h2>大小目標</h2>
      <p>這裡描述你的目標。</p>
      <img src="@/assets/goals.jpg" alt="目標圖片">
    </section>
    <section id="relationship">
      <h2>感情經歷</h2>
      <p>這裡分享你的感情經歷。</p>
      <img src="@/assets/relationship.jpg" alt="感情經歷圖片">
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav ul {
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0;
}

nav ul li {
  margin: 0 15px;
}

nav ul li a {
  text-decoration: none;
  color: #42b983;
}

section {
  margin: 50px 0;
}

section img {
  width: 300px;
  height: auto;
  margin-top: 10px;
}
</style>

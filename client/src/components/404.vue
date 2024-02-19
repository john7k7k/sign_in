<template>
  <header>
    <img class="logo" :src="require('@/assets/deadfish.svg')" width="200"  />
    <div class="center">
      <h1>404</h1>
      <h3>
        似乎發生了某些問題
        <p></p>
        <a href="/login">--&gt;回登入畫面</a>
      </h3>
    </div>
  </header>
    
  </template>
  
<style> 
  .logo {
  display: block;
  margin: 0 auto 0;
  }

  h1 {
    font-weight: 500;
    font-size: 10rem;
    position: relative;
  }
  
  h3 {
    font-size: 1.8rem;
  }
  
  .center h1,
  .center h3 {
    text-align: center;
  }
  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-left: 50vh;
      margin: 0 8rem 0 0;
      height: 100vh;
    }
    .logo {
      margin: 0 8rem 0 0;
    }
  }
</style>
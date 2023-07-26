<template>
    <div class="login">
      <loginnavbar class="loginnavbar-bg"></loginnavbar>
      <div class="v-application__wrap">
        <!-- 其他內容，例如 Sign In 標題和 logininput -->
        <h1 class="text-center my-3 text-white">
          Sign In
        </h1>
        <logininput></logininput>
        
      </div>
    </div>
  </template>
  
  <script>
  // Components
  import loginnavbar from '@/components/loginnavbar.vue';
  import logininput from '@/components/logininput.vue';
  export default {
    name: 'login',
    components: { loginnavbar, logininput },
    data: () => ({
      //
    }),
  };
  </script>
  
  <style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    height: 100%;
  }
  .login {
    /* 背景圖片的 URL 放在 url() 函數中，並用引號包裹 */
    background-image: url('https://media.istockphoto.com/id/464976012/photo/perfect-sky-and-ocean.jpg?s=612x612&w=0&k=20&c=_4LA6E0fDOjXLZnEAWtnuVOj8suPyfOfI-yCNVrwXoc=');
    /* 設定背景圖片大小，這裡使用 cover 讓圖片填滿整個容器 */
    background-size: cover;
    /* 設定背景圖片位置，這裡使用 center 讓圖片水平垂直置中 */
    background-position: center;
    /* 避免背景圖片重複顯示 */
    background-repeat: no-repeat;
    /* 設定共同的父元素的寬度和高度，使其包含內部元素 */
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  /* 調整 login-navbar 的樣式 */
  .loginnavbar-bg {
    /* 設定 login-navbar 的寬度和高度 */
    height: 100px; /* 調整 login-navbar 的高度，視需要調整數值 */
    /* 設定 login-navbar 的背景色或其他樣式 */
    background-color: rgba(0, 0, 0, 0); /* 使用半透明背景以免影響背景圖片的可視性 */
  }
  
  
  </style>
  
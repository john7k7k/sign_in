# 前端語法及架構

## 布署
```
npm install//會自動下載所有所需的函式檔
```

### 查看網頁頁面
```
cd .\aifiweb\client\  進到client資料夾
npm run serve  啟動頁面
```

### 前端上傳網頁準備
```
1.npm run build //在client資料夾中進行，執行完回自動在public中產生index.html檔
2.index.html檔中把<title>標題那行程式改成<link rel="icon" type="image/png" href="img/北科logo.ico">
        <title>仿生魚監控站</title>  
3.上傳到github
4.上傳伺服器
```

### 頁面程式架構
```
<template>頁面顯示
  
</template>

<script>收跟發api、資料處理

</script>

<style>//頁面排版

.class名稱 {
    css語言
  }
@media screen and (max-width: 600px) {
  手機版適用的css
}
@media screen and (min-width: 601px) and (max-width: 1024px) {
  電腦適用的css
}

@media screen and (min-width: 768px) and (max-width: 1200px) and (orientation: landscape) {
  平板適用的css
  }

</style>

```
### 前端檔案架構
- [404.vue](client/src/components/404.vue) .................................................................................404畫面物件內容
```

components
│      404.vue -->404畫面物件內容
│      accountlist.vue
│      controller.vue
│      Editfishdata2.vue
│      EditUser.vue
│      fishdata.vue
│      Fishlist2.vue
│      loading.vue
│      logininput.vue
│      loginnavbar.vue
│      Navbar.vue
│      selectInstruction.vue
│      signinnavbar.vue
│      signup.vue
│      SignupSection.vue
│      struct.txt
│      totaldataCard.vue
│      
├─plugins
│      vuetify.js
│      webfontloader.js
│      
├─router
│      index.js
│      
├─store
│      actions.js
│      getter.js
│      index.js
│      mutations.js
│      mutations_type.js
│      
├─swiper
│      Swiper.js
│      
└─views
        AccountList.vue
        Controllerview.vue
        Editdatas.vue
        error404.vue
        FishDatalist.vue
        FishdataView.vue
        HomeView.vue
        Login.vue
        Nav.vue
        SelectInstruction.vue
        SignUp.vue
        SignupSectionview.vue
        UserData.vue


```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

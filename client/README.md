# 前端語法及架構

## 布署
```
npm install//會自動下載所有所需的函式檔
```

### 查看網頁頁面
```
cd .\aifiweb\client\  進到client資料夾
到.env檔中 把VUE_APP_SEVER=""改成VUE_APP_SEVER="https://pre.aifish.cc"
npm run serve  啟動頁面
```

### 前端上傳網頁準備
```
1.到.env檔中 把VUE_APP_SEVER="https://pre.aifish.cc"改成VUE_APP_SEVER=""
2.npm run build //在client資料夾中進行，執行完回自動在public中產生index.html檔
3.index.html檔中把<title>標題那行程式改成<link rel="icon" type="image/png" href="img/北科logo.ico">
        <title>仿生魚監控站</title>  
4.上傳到github
5.上傳伺服器
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
### 檔案架構
- components
- [404.vue](src/components/404.vue) .................................................................................404錯誤畫面物件
- [accountlist.vue](src/components/accountlist.vue) ...................................................................帳戶清單物件
- [controller.vue](src/components/controller.vue) ....................................................................遙控器清單物件
- [Editfishdata2.vue](src/components/Editfishdata2.vue) .....................................................顏色設定物件
- [EditUser.vue](src/components/EditUser.vue) ...............................................................更改個資物件
- [fishdata.vue](src/components/fishdata.vue) .................................................................仿生魚卡片物件
- [Fishlist2.vue](src/components/Fishlist2.vue) ..............................................................仿生魚清單物件
- [loading.vue](src/components/loading.vue) ..................................................................載入動畫物件
- [logininput.vue](src/components/logininput.vue) ..............................................................登入輸入框物件
- [loginnavbar.vue](src/components/loginnavbar.vue) .............................................................登入上方導覽列
- [Navbar.vue](src/components/Navbar.vue) ..........................................................................導覽列
- [selectInstruction.vue](src/components/selectInstruction.vue) ....................................................選擇區域物件
- [signinnavbar.vue](src/components/signinnavbar.vue) .................................................................註冊上方導覽列
- [signup.vue](src/components/signup.vue) .................................................................................註冊輸入框物件
- [SignupSection.vue](src/components/SignupSection.vue) ...............................................................註冊區域物件
- [totaldataCard.vue](src/components/totaldataCard.vue) ...............................................................主頁物件
- [maintenanceList.vue](src/components/maintenanceList.vue) ...............................................................維修清單物件

- router
- [index.js](src/router/index.js) .....................................................所有畫面的路由設定資訊

- swiper
- [Swiper.js](src/swiper/Swiper.js) .....................................................主頁及選擇區域畫面卡片輪轉功能

- views
- [AccountList.vue](src/views/AccountList.vue) .....................................................帳戶清單畫面
- [Controllerview.vue](src/views/Controllerview.vue) .....................................................控制器清單畫面
- [Editdatas.vue](src/views/Editdatas.vue) .....................................................魚顏色設定畫面
- [error404.vue](src/views/error404.vue) .....................................................錯誤404畫面
- [FishDatalist.vue](src/views/FishDatalist.vue) .....................................................仿生魚清單畫面
- [FishdataView.vue](src/views/FishdataView.vue) .....................................................仿生魚卡片畫面
- [HomeView.vue](src/views/HomeView.vue) .....................................................主頁畫面
- [Login.vue](src/views/Login.vue) .....................................................登入畫面

- [Nav.vue](src/views/Nav.vue) .....................................................導覽條畫面
- [SelectInstruction.vue](src/views/SelectInstruction.vue) .....................................................選擇區域畫面
- [SignUp.vue](src/views/SignUp.vue) .....................................................註冊畫面
- [SignupSectionview.vue](src/views/SignupSectionview.vue) .....................................................註冊區域畫面
- [UserData.vue](src/views/UserData.vue) .....................................................個人資料畫面
- [Maintenance-list](src/views/Maintenance-list) .....................................................維修清單畫面

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

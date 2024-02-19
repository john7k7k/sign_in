<template>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, shrink-to-fit=no" />
    <div class="login">
      <loginnavbar class="loginnavbar-bg"></loginnavbar>
      <div class="box">
        <div class="item1"></div>
        <div class="item2">
          <logininput class="logininput"></logininput>
        </div>
      </div>
  </div>
</template>

<style scoped>

.login {
  background-image: url('../assets/登入頁面第二版.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height:100%;
  overflow-y: hidden;
  overflow: hidden;
}
.loginnavbar-bg {
  height: 100px; 
  background-color: rgba(0, 0, 0, 0); 
  position: fixed;
}
.box{
  display: flex;
  width: 100%;
  height: 100%;
}
.box .item1{
  width: 50%;
}
.box .item2{
  width: 50%;
  margin: auto ;

}
@media screen and  (min-width: 1025px) and (max-width: 1680px){

}
@media screen and  (min-width: 601px) and (max-width: 1024px){
  .login {
  background-image: url('../assets/登入畫面手機背景.jpg');
  background-size:cover;
  background-position:center;
  background-position-y:25%;
  width: 100%;
  height: 100%;
  overflow-y: hidden
}
.box{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.box .item1{
  width: 0%;
  height: 40%;
}
.box .item2{
  width: 100%;

}
}
@media screen and (min-width: 401px)and (max-width: 600px) {
  .login {
  background-image: url('../assets/登入畫面手機背景.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: hidden
}
.box{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.box .item1{
  width: 0%;
  height: 35%;
}
.box .item2{
  width: 100%;

}
}
@media screen and (max-width: 400px) {
  .login {
  background-image: url('../assets/登入畫面手機背景.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: hidden
}
.box{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.box .item1{
  width: 0%;
  height: 35%;
}
.box .item2{
  width: 100%;

}
.logininput {
  transform: scale(0.8);
}

}


</style>

<script>
import loginnavbar from '@/components/loginnavbar.vue';
import logininput from '@/components/logininput.vue';
export default {
  name: 'login',
  components: { logininput ,loginnavbar},
  data: () => ({
    //
  }),
};
</script>



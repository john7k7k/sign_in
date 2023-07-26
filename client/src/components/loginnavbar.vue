<template>
    <v-toolbar prominent>
      <template v-slot:prepend> 
      <v-img
        src="https://cnc.ntut.edu.tw/var/file/4/1004/img/1544/Taipei-Tech-Logo.png"
        alt="logo"
        width="70"
        
      ></v-img>
    
      </template>
      
      <v-spacer ></v-spacer>
      <v-spacer ></v-spacer>
      <v-toolbar-items>
        <v-divider
        inset
        vertical
        ></v-divider>
      <v-btn variant="text" route to = "/SignUp" class=" rounded-button text "><h3>註冊</h3></v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </template>

<style>
.rounded-button {
  border-radius: 100px; 
}
.text{
  color: blue;
}

@media screen and (max-width: 600px) {
  .text {
    padding-left: 60px;
    color: white;
  }
  .divider{
    padding-left: 200px;
  }

}
</style>
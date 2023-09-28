<template>
    <v-toolbar prominent>
      <template v-slot:prepend> 
      <v-img
        src="../assets/logo北科.png"
        alt="logo"
        width="70"
        class="logoimage"
      ></v-img>
    
      </template>
      
      <v-spacer ></v-spacer>
      <v-spacer ></v-spacer>
      <v-toolbar-items>
        <v-divider
        inset
        vertical
        ></v-divider>
      <v-btn v-if="false" variant="text" route to = "/sign/up" class=" rounded-button text "><h3>註冊</h3></v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </template>

<style>
.logoimage{
  transform: scale(2.3);
}
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

@media screen and (min-width: 601px) and (max-width: 1024px) {
  .text {
    padding-left: 60px;
    color: white;
  }
  .divider{
    padding-left: 200px;
  }
}
</style>
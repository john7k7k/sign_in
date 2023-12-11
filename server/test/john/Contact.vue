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

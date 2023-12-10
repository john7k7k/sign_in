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
       <div class="outbox">
            <swiper
            loop="true"
            :modules="modules"
            :slides-per-view="1"
            :space-between="50"
           
            navigation
            :pagination="{ clickable: true }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            class="inbox"
        >
            <swiper-slide><v-img src="@/assets/fishimage2.png" width="700" /></swiper-slide>
            <swiper-slide><v-img src="@/assets/fishimage3.png"  width="700"/></swiper-slide>
            <swiper-slide><v-img src="@/assets/fishimage4.png"  width="700"/></swiper-slide>
            <swiper-slide><v-img src="@/assets/fishimage5.png"  width="700"/></swiper-slide>
           
        </swiper>
    </div>
      </main>
    </div>

    <footer>
      <p>&copy; NTUT LAB-314</p>
    </footer>
  </div>
</template>

<script>
  import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption:{

      }
    }
  },
  setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar, A11y],
      };
    },
    methods: {
  swiperNext() {
    const swiper = document.querySelector('.swiper').swiper;
    swiper.slideNext();
  },
  swiperPrev() {
    const swiper = document.querySelector('.swiper').swiper;
    swiper.slidePrev();
  },
}
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

.outbox{
  position: relative;
  padding: 0 50px;
  margin: auto;
  width: 1000px;
  height: 500px;
}
.inbox{
  margin-top: 10px;
  margin-left: 110px;
  position: initial;
}
</style>

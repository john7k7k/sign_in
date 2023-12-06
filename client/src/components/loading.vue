<template>
    
    <div class="loader ">
      <span v-for="i in 7" :key="i" :style="{ animationDelay: i * 0.2 + 's' }"></span>
    </div>
    <div class="text-center burnword mb-8" >正在燒錄中</div>
    <svg v-show="false">
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          type="matrix"
          in="blur"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 10 -5"
        />
      </filter>
    </svg>
  </template>
  
  <script>
  export default {
    name: 'YourComponentName',
  };
  </script>
  
  <style scoped>
  .loader {
    width: 300px;
    height: 300px;
    position: relative;
    justify-self: center;
    filter: url(#gooey);
    transform: scale(0.5);
  }
  
  .loader span {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    transform: rotate(45deg);
    animation: rotate 2s ease-in-out infinite;
  }
  
  .loader span:before {
    content: '';
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    background-color: #0093e9;
    background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
    box-shadow: 0 0 15px blue;
  }
  
  @keyframes rotate {
    to {
      transform: rotate(405deg);
    }
  }

  .burnword{
    letter-spacing: 6px;
    font-size: larger;
  }
  </style>
  
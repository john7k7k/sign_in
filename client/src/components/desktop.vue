<template>
    <div class="desktop1-container">
      <div class="desktop1-desktop1">
        <div class="desktop1-frame1">
          <img
            src="../assets/card.png"
            alt="Rectangle3231"
            class="desktop1-rectangle3"
          />
          <img
            src="../assets/card.png"
            alt="Rectangle2224"
            class="desktop1-rectangle2"
          />
          <img
            src="../assets/card.png"
            alt="Rectangle2230"
            class="desktop1-rectangle21"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Desktop1'
  }
  </script>
  
  <style scoped>
  .desktop1-container {
    width: 100%;
    display: flex;
    overflow: auto;
    min-height: 100vh;
    align-items: center;
    flex-direction: column;
  }
  .desktop1-desktop1 {
    gap: 10px;
    width: 100%;
    height: 1024px;
    display: flex;
    overflow: hidden;
    position: relative;
    align-items: flex-start;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
  }
  .desktop1-frame1 {
    gap: 142px;
    top: 337px;
    left: 6px;
    width: 1428px;
    display: flex;
    position: absolute;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
  }
  .desktop1-rectangle3 {
    width: 800px;
    height: 540px;
  }
  .desktop1-rectangle2 {
    width: 800px;
    height: 540px;
  }
  .desktop1-rectangle21 {
    width: 800px;
    height: 540px;
  }
  </style>
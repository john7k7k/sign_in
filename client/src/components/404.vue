<script setup>
import Test from '../components/404test.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="../assets/deadfish.svg" width="200" height="200" />
  </header>

  <main>
    <Test />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 8rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

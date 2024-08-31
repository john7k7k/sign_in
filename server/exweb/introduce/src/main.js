import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import scrollTo from './directives/scrollTo';

const app = createApp(App);

app.directive('scroll-to', scrollTo);

app.use(router).mount('#app');

import * as Vue from 'vue';
import App from './App.vue';
import router from './router';
import { install } from './library';

const app = Vue.createApp(App);
install(app);
app.use(router);
app.mount('#app');
// router.isReady().then(() => app.mount('#app')).catch(e=>console.error);
window.app = app;
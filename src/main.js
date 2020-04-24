import * as Vue from 'vue';
import App from './App.vue';
import router from './router';
import { install } from './library';

const project = Vue.createApp(App);
install(project);
project.use(router);
project.mount('#app');
window.project = project;
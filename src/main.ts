import './style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

/**
 * Component Stacks
 */
import { installComponentStack } from './core/component-stack/plugin';
installComponentStack(app);

app.mount('#app');

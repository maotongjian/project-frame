import '@/assets/scss/main.scss';
import '@/assets/scss/font.scss';
import '@/assets/scss/iconfont.scss';
import 'vant/lib/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import responsivePlugin from '@/plugins/responsive';
import { i18n } from '@/i18n';
import { Loading, Popup, Toast } from 'vant';
import loadingPlugin from '@/plugins/loading';
import clickOutside from '@/directives/clickOutside';

const app = createApp(App);

const pinia = createPinia(App);

app.use(router);
app.use(pinia);
app.use(responsivePlugin);
app.use(i18n);
app.use(Loading);
app.use(loadingPlugin);
app.use(Popup);
app.use(Toast);
app.directive('click-outside', clickOutside);
app.mount('#app');

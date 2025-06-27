import { createApp } from 'vue';
import Loading from '@/components/global/Loading.vue';
import { i18n } from '@/i18n';
import { Loading as VanLoading } from 'vant';

let loadingInstance = null;

export default {
  install(app) {
    const loadingApp = createApp(Loading);
    loadingApp.use(i18n);
    loadingApp.use(VanLoading);
    loadingInstance = loadingApp.mount(document.createElement('div'));
    document.body.appendChild(loadingInstance.$el);

    app.config.globalProperties.$loading = {
      show(text = '') {
        loadingInstance.show(text);
      },
      hide() {
        loadingInstance.hide();
      },
    };
  },
};

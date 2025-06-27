import { useUiStore } from '@/stores/ui';

export default {
  install(app) {
    const uiStore = useUiStore();

    const handleResize = () => {
      uiStore.setIsMobile(window.innerWidth < 1025);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    app.config.globalProperties.$cleanupResponsive = () => {
      window.removeEventListener('resize', handleResize);
    };
  },
};

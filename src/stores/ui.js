import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    isMobile: false,
  }),
  actions: {
    setIsMobile(value) {
      this.isMobile = value;
    },
  },
});

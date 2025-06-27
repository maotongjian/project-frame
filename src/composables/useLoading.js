import { getCurrentInstance } from 'vue';

export function useLoading() {
  const { proxy } = getCurrentInstance();
  return proxy.$loading;
}

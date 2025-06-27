import { useRouter, useRoute } from 'vue-router';
import { DEFAULT_LOCALE, SUPPORT_LOCALES } from '@/i18n';

export function useLocaleRouter() {
  const router = useRouter();
  const route = useRoute();

  function currentLocale() {
    const locale = route.params.locale;
    return SUPPORT_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  }

  function withLocale(path) {
    const locale = currentLocale();
    if (path.startsWith(`/${locale}`)) return path;
    return `/${locale}${path.startsWith('/') ? path : '/' + path}`;
  }

  function pushLocale(to) {
    const locale = currentLocale();

    if (typeof to === 'string') {
      return router.push(withLocale(to));
    } else if (typeof to === 'object' && to.name) {
      return router.push({
        ...to,
        params: {
          ...(to.params || {}),
          locale,
        },
      });
    }
  }

  function replaceLocale(to) {
    const locale = currentLocale();

    if (typeof to === 'string') {
      return router.replace(withLocale(to));
    } else if (typeof to === 'object' && to.name) {
      return router.replace({
        ...to,
        params: {
          ...(to.params || {}),
          locale,
        },
      });
    }
  }

  function localePath(to) {
    const locale = currentLocale();

    if (typeof to === 'string') {
      return withLocale(to);
    } else if (typeof to === 'object' && to.name) {
      return {
        ...to,
        params: {
          ...(to.params || {}),
          locale,
        },
      };
    }
    return to;
  }

  return {
    pushLocale,
    replaceLocale,
    localePath,
    currentLocale,
  };
}

import { useRouter, useRoute } from 'vue-router';
import { DEFAULT_LOCALE, SUPPORT_LOCALES } from '@/i18n';

export function useLocaleRouter() {
  const router = useRouter();
  const route = useRoute();

  function currentLocale() {
    const locale = route.params.locale;
    return SUPPORT_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  }

  function withLocalePath(path) {
    const locale = currentLocale();
    const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
    if (locale === DEFAULT_LOCALE) {
      return `/${cleanPath}`;
    }
    if (cleanPath === '' || cleanPath === locale) {
      return `/${locale}`;
    }
    if (cleanPath.startsWith(`${locale}/`)) {
      return `/${cleanPath}`;
    }
    return `/${locale}/${cleanPath}`;
  }

  function targetLocalePath(path, targetLocale) {
    let cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
    const parts = cleanPath.split('/');
    if (SUPPORT_LOCALES.includes(parts[0])) {
      parts.shift();
    }
    const restPath = parts.join('/');
    if (targetLocale === DEFAULT_LOCALE) {
      return restPath ? `/${restPath}` : '/';
    }
    return restPath ? `/${targetLocale}/${restPath}` : `/${targetLocale}`;
  }

  function routerPush(to) {
    if (typeof to === 'string') {
      return router.push(withLocalePath(to));
    } else if (typeof to === 'object') {
      return router.push({
        ...to,
        path: withLocalePath(to.path),
      });
    }
  }

  function routerReplace(to) {
    if (typeof to === 'string') {
      return router.replace(withLocalePath(to));
    } else if (typeof to === 'object') {
      return router.replace({
        ...to,
        path: withLocalePath(to.path),
      });
    }
  }

  function localePath(to) {
    if (typeof to === 'string') {
      return withLocalePath(to);
    } else if (typeof to === 'object') {
      return {
        ...to,
        path: withLocalePath(to.path),
      };
    }
    return to;
  }

  return {
    routerPush,
    routerReplace,
    localePath,
    currentLocale,
    targetLocalePath,
  };
}

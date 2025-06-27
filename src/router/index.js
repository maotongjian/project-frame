import { createRouter, createWebHistory } from 'vue-router';
import { SUPPORT_LOCALES, DEFAULT_LOCALE, changeLocale } from '@/i18n';
import App from '@/App.vue';
import routes from '@/routes';

const childRoutes = [
  {
    path: 'error',
    name: 'localeError',
    component: () => import('@/pages/Error.vue'),
  },
  {
    path: ':pathMatch(.*)*',
    name: 'localeNotFound',
    component: () => import('@/pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: `/${DEFAULT_LOCALE}`,
    },
    {
      path: '/:locale([a-zA-Z\\-]+)',
      component: App,
      children: childRoutes,
    },
    {
      path: '/error',
      name: 'globalError',
      component: () => import('@/pages/Error.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'globalNotFound',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const locale = to.params.locale || DEFAULT_LOCALE;
  if (locale && !SUPPORT_LOCALES.includes(locale)) {
    return next(`/${DEFAULT_LOCALE}`);
  }
  if (locale) {
    await changeLocale(locale);
  }
  next();
});

router.onError(() => {
  router.push(routes.error.path);
});

export default router;

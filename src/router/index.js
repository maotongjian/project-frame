import { createRouter, createWebHistory } from 'vue-router';
import { SUPPORT_LOCALES, DEFAULT_LOCALE, changeLocale } from '@/i18n';
import routes from '@/routes';

const childRoutes = [
  {
    path: '',
    component: () => import('@/pages/Index.vue'),
  },
  {
    path: 'error',
    component: () => import('@/pages/Error.vue'),
  },
  {
    path: ':pathMatch(.*)*',
    component: () => import('@/pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: childRoutes,
    },
    {
      path: '/:locale([a-zA-Z\\-]+)',
      children: childRoutes,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const locale = to.params.locale || DEFAULT_LOCALE;
  if (locale && !SUPPORT_LOCALES.includes(locale)) {
    return next(routes.notFound.path);
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

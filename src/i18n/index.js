import { createI18n } from 'vue-i18n';
import { nextTick } from 'vue';

export const SUPPORT_LOCALES = ['en', 'es', 'fr'];
export const DEFAULT_LOCALE = 'en';

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {},
});

export function setI18nLanguage(locale) {
  i18n.global.locale.value = locale;
  document.querySelector('html').setAttribute('lang', locale);
}

const localeFiles = import.meta.glob('./locales/*.json');

export async function loadLocaleMessages(locale) {
  const matchKey = `./locales/${locale}.json`;
  const loader = localeFiles[matchKey];
  if (!loader) return;
  const messages = await loader();
  i18n.global.setLocaleMessage(locale, messages.default);
  return nextTick();
}

export async function changeLocale(locale) {
  if (!i18n.global.availableLocales.includes(locale)) {
    await loadLocaleMessages(locale);
  }
  setI18nLanguage(locale);
}

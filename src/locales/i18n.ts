import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Korean from './ko'
import English from './en'

export const getLang = (): string => 'ko'

const resources = {
  ko: {
    translations: Korean,
  },
  en: {
    translations: English,
  },
}

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
  fallbackLng: getLang(),
  initImmediate: true,
  ns: ['translations'],
  defaultNS: 'translations',
  preload: false,
  returnNull: false,
})

export default i18n

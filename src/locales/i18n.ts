import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Korean from './ko'
import English from './en'
import { getUserLanguage } from '@/apis/user'

export const getLang = (): string => 'ko'
export const userLanguage = () => getUserLanguage()

const resources = {
  ko: {
    translations: Korean,
  },
  en: {
    translations: English,
  },
}

i18n
  .use(initReactI18next)
  .init({
    lng: 'ko',
    resources,
    fallbackLng: getLang(),
    initImmediate: true,
    ns: ['translations'],
    defaultNS: 'translations',
    preload: false,
    returnNull: false,
  })
  .then(() => {
    getUserLanguage().then((userLang) => {
      if (userLang) {
        i18n.changeLanguage(userLang)
      }
    })
  })

export default i18n

import i18n from 'i18next'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'react-native-localize'

export const init = async ({
  loadPath,
  useSuspense
}: {
  loadPath: string
  useSuspense: boolean
}): Promise<void> => {
  await i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      react: {
        useSuspense
      },
      compatibilityJSON: 'v3',
      lng: getLocales()[0].languageCode,
      fallbackLng: 'en',
      backend: {
        loadPath
      },
      debug: false,
      ns: ['default'],
      defaultNS: 'default'
    })
}

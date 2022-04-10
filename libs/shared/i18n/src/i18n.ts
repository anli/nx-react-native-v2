import i18n, { Resource } from 'i18next'
import ChainedBackend from 'i18next-chained-backend'
import HttpBackend from 'i18next-http-backend'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'react-native-localize'

export const init = async ({
  bundledResources,
  loadPath,
  useSuspense
}: {
  bundledResources: Resource
  loadPath: string
  useSuspense: boolean
}): Promise<void> => {
  await i18n
    .use(ChainedBackend)
    .use(initReactI18next)
    .init({
      react: {
        useSuspense
      },
      compatibilityJSON: 'v3',
      lng: getLocales()[0].languageCode,
      fallbackLng: 'en',
      backend: {
        backends: [HttpBackend, resourcesToBackend(bundledResources)],
        backendOptions: [
          {
            loadPath
          }
        ]
      },
      debug: false
    })
}

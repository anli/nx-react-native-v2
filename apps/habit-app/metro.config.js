const { withNxMetro } = require('@nrwl/react-native')
const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig()

  const defaultSourceExts = [...sourceExts, 'svg', 'cjs']

  return withNxMetro(
    {
      transformer: {
        getTransformOptions: async () => ({
          transform: {
            experimentalImportSupport: false,
            inlineRequires: true
          }
        }),
        babelTransformerPath: require.resolve('react-native-svg-transformer')
      },
      resolver: {
        assetExts: assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: process.env.RN_SRC_EXT
          ? process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts)
          : defaultSourceExts
      }
    },
    {
      // Change this to true to see debugging info.
      // Useful if you have issues resolving modules
      debug: false,
      // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx'
      extensions: []
    }
  )
})()

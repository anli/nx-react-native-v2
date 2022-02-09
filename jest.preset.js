const rnPreset = require('react-native/jest-preset');

module.exports = {
  ...rnPreset,
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  resolver: '@nrwl/jest/plugins/resolver',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-native|@react-navigation)',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '.generated.'],
	testTimeout: 30000
};

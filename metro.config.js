const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
  firebase: require.resolve('firebase/compat/app'),
};

module.exports = defaultConfig;

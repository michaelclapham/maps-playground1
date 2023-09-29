const path = require("path");

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.alias['react-native'] = 'react-native-web';
  //config.resolve.alias['react-native-maps'] = 'react-native-web-maps';
  config.resolve.alias['react-native-maps'] = path.resolve('./rnm-leaflet');
  return config;
};
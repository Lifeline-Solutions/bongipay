const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Provide React globally so modules that reference an unscoped `React` identifier
  // (classic JSX runtime) don't throw "React is not defined" in the browser.
  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.ProvidePlugin({
      React: 'react',
    })
  );

  return config;
};


module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      // Include NativeWind / react-native-css-interop preset which returns { plugins: [...] }
      require('nativewind/babel'),
    ],
    // Do not list nativewind/babel inside plugins; it is a preset-like factory returning an object.
    plugins: [],
  };
};

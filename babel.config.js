module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // If you add custom plugins, list them here.
    plugins: [
      // Allow parsing of Flow type-only syntax (e.g. `export type {}`) which
      // can appear in packages inside node_modules that ship type-only exports.
      '@babel/plugin-syntax-flow',
    ],
  };
};

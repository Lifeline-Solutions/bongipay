// Project-level wrapper so the bundler loads this first and ensures `React` is present
// for any modules that assume an unscoped `React` identifier.
if (typeof globalThis !== 'undefined' && !globalThis.React) {
  globalThis.React = require('react');
}
// Re-export the real expo-router entry
module.exports = require('expo-router/entry');


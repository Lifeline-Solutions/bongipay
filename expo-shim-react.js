// Ensure React is available as a global for server-side code that expects the classic JSX runtime
// This file is preloaded via NODE_OPTIONS so the dev server and static renderer have global.React
if (!global.React) {
  global.React = require('react');
}
if (!global.ReactDOM) {
  global.ReactDOM = require('react-dom');
}
// Also define on globalThis for environments that prefer it
if (!globalThis.React) {
  globalThis.React = global.React;
}
if (!globalThis.ReactDOM) {
  globalThis.ReactDOM = global.ReactDOM;
}
module.exports = {};

console.log('Starting tailwind config load test');
try {
  const path = require('path');
  const configPath = path.resolve(__dirname, '../tailwind.config.js');
  console.log('Loading', configPath);
  const cfg = require(configPath);
  if (!cfg || Object.keys(cfg).length === 0) {
    throw new Error('Tailwind config appears empty');
  }
  console.log('Tailwind config loaded. Keys:', Object.keys(cfg));
  console.log('Presets length:', (cfg.presets || []).length);
  console.log('Preset[0] type:', typeof (cfg.presets || [])[0]);
  process.exit(0);
} catch (e) {
  console.error('Failed to load Tailwind config:', e);
  process.exit(1);
}

// Used by babel-jest only. Vite compiles the app itself via esbuild/SWC and
// never reads this file.
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
}

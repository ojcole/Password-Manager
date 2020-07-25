const path = require('path');
const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'build');
const htmlPath = path.resolve(srcPath, 'html');
const electronPath = path.resolve(srcPath, 'electron');
const frontendPath = path.resolve(srcPath, 'frontend');

module.exports = {
  srcPath,
  buildPath,
  htmlPath,
  electronPath,
  frontendPath,
};

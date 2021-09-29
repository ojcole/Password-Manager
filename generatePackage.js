'use strict';

const fs = require('fs');

const rawData = fs.readFileSync('package.json');
const previousPackage = JSON.parse(rawData);

previousPackage['main'] = 'main.js';
previousPackage['dependencies'] = {};
previousPackage['devDependencies'] = {};

const devDependencies = ['electron', 'electron-builder'];

devDependencies.forEach((x) => {
  previousPackage.devDependencies[x] = 'latest';
});

delete previousPackage.resolutions;

previousPackage['scripts'] = {
  start: 'npm install && electron ./app',
  pack: 'electron-builder --dir',
  dist: 'electron-builder',
};

fs.writeFileSync('build/package.json', JSON.stringify(previousPackage));

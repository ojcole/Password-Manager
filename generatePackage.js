'use strict';

const fs = require('fs');

const rawData = fs.readFileSync('package.json');
const previousPackage = JSON.parse(rawData);

previousPackage['build'] = {
  appId: 'com.ojcole.${name}',
  productName: 'Password Manager',
  copyright: 'Copyright © 2020 ${author}',
  dmg: {
    contents: [
      {
        x: 110,
        y: 150,
      },
      {
        x: 240,
        y: 150,
        type: 'link',
        path: '/Applications',
      },
    ],
  },
  linux: {
    target: ['AppImage', 'deb'],
  },
  win: {
    target: 'squirrel',
    icon: 'build/icon.ico',
  },
  directories: {
    output: 'dist',
  },
};

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

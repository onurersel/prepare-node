#!/usr/bin/env node

const fs = require('fs');
const process = require('child_process');

const RESOURCES = `${__dirname}/resources`;

const exec = command => new Promise((resolve) => {
  process.exec(command, () => {
    resolve();
  });
});

const createBabelrc = () => {
  const file = fs.readFileSync(`${RESOURCES}/.babelrc`, { encoding: 'utf8' });
  fs.writeFileSync('./.babelrc', file);
};

const createEslintrc = () => {
  const file = fs.readFileSync(`${RESOURCES}/.eslintrc`, { encoding: 'utf8' });
  fs.writeFileSync('./.eslintrc', file);
};

const installPackages = () => exec('yarn init -y')
  .then(() => exec('yarn add --dev babel-eslint eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-native'))
  .then(() => exec('yarn add babel-cli babel-core babel-plugin-transform-runtime babel-preset-es2015 babel-preset-stage-2 babel-runtime'));

(() => {
  createBabelrc();
  createEslintrc();
  return installPackages();
})();

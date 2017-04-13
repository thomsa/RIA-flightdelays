require('babel-polyfill');
import angular from 'angular';
const context = require.context('./app', true, /\.(js|ts|tsx)$/);
context.keys().forEach(context);

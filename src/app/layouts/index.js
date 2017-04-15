
import angular from 'angular';
import main from './main/main-layout.component';
import routes from './layouts.routes.js';

export default angular
    .module('ria-layouts-module', [])
    .config(routes)
    .component('riaMainLayout', main).name;

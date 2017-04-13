/**
 * CONTAINERS MODULE
 * responsible for gathering the containers needed for the application to work
 * containers are workins as pages, they are the highest DOM element on a certain route
 *
 * THE CONTAINER NAMES CAN'T CONTAIN DASHES, THE ROUTER CAN NOT RECOGNIZE THEM AS VALID COMPONENTS
 */
import angular from 'angular';
import main from './main/main-layout.component';
import routes from './layouts.routes.js';

export default angular
    .module('ria-layouts-module', [])
    .config(routes)
    .component('riaMainLayout', main).name;

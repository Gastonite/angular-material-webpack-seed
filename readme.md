# Modern app seed for legacy Angular apps (1.x) 

[![License](http://img.shields.io/:license-mit-blue.svg)](LICENSE)
[![GitHub version](https://badge.fury.io/gh/tarlepp%2Fangular-material-webpack-seed.svg)](https://badge.fury.io/gh/tarlepp%2Fangular-material-webpack-seed)
[![Dependency Status](https://david-dm.org/tarlepp/angular-material-webpack-seed.svg)](https://david-dm.org/tarlepp/angular-material-webpack-seed)
[![devDependency Status](https://david-dm.org/tarlepp/angular-material-webpack-seed/dev-status.svg)](https://david-dm.org/tarlepp/angular-material-webpack-seed#info=devDependencies)

Includes following:
 - [webpack](http://webpack.github.io) (modules, assets bundling)
 - [babel](http://babeljs.io/) (ES2015 support)
 - [ng-annotate](https://github.com/olov/ng-annotate)
 - karma test runner configuration

## Usage

Note: NodeJS 6+ is required.

1. Install dependencies `npm install`
2. Start dev server `npm run dev-server` open [http://localhost:3000](http://localhost:3000)
3. Lint your code `npm run lint`
4. Run unit tests `npm run test`
5. Create build for deployment `npm run build` for production build, or `npm run build-dev` for development build

---

## Getting started
 - [Angular Guide](https://docs.angularjs.org/guide)
 - [Angular Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
 - [Tutorial from BabelJS](http://babeljs.io/docs/learn-es2015/)
 - [Exploring ES6: Upgrade to the next version of JavaScript by Dr. Axel Rauschmayer](http://exploringjs.com/)
 - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
 - [webpack documentation](http://webpack.github.io/docs/) 

---

## Usage advice 

### Directory layout
    ├── build              # build stats
    ├── public             # public folder (webroot for dev server)
    │   ├── _assets        # build results - assets packed by webpack
    │   └── index.html     # one of app entry points, for dev server
    └── src                # app sources
        ├── blocks         # generic helpers
        │   ├── exception  # exception handler
        │   ├── logger     # logger
        │   └── router     # router helper
        ├── core           # application core module
        ├── dependencies   # application dependencies module, specify 3rd party libraries here
        ├── layout         # layout module for applicate
        │   ├── footer     # footer module
        │   ├── header     # header module
        │   └── sidenav    # sidenav module
        ├── modules        # Application modules, this is where you put your own modules
        │   └── about      # Example about module
        ├── app.config.js  # configuration for application, contains API URL and VERSION information
        ├── index.js       # app entry module
        ├── index.scss     # 
        └── index.test.js  # entry point for test karma

### Angular specific conventions

Application organisation rules:

1. Split app into angular "modules" 
    - every module should have own folder, and should be defined in one file which will require all module components and will export module name 
    - module can have nested modules
    - module can require other modules which are direct siblings of it or parent modules, or modules nested in it (if you need to require module that is nested in "sibling" - you you should move it up by hierarchy before requiring it)
2. Keep modules small - if module is too big, maybe it should be few modules 
3. Every file should have only one entity inside it, for example if there is directive which has controller and template - there should be three files, plus likely two for unit tests   
4. Group related resources by folders
5. Name files with suffixes `.directive`, `.controller`, `.factory`, `.service`, `.provider`
6. Use `.test` suffix for test file names

### Directives

1. Prefer to use isolated scopes
2. Use controllerAs syntax 
3. Controller should act as ViewModel, use $scope only if you need it
4. All model layer (data fetching, business logic) should be in services

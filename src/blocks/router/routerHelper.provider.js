// Imports
import angular from 'angular';

/**
 * @desc RouterHelper provider.
 *
 * @ngInject
 */
export default ($locationProvider, $stateProvider, $urlRouterProvider) => {

  const helper = {};

  // We want to use HTML5 mode with routing
  // noinspection JSUnresolvedFunction
  $locationProvider.html5Mode(true);

  // Default config for routerHelper
  helper.config = {
    docTitle: undefined,
    resolveAlways: {},
  };

  /**
   * Method to override default config values.
   *
   * @param {Object} configOverride
   */
  helper.configure = (configOverride) => {
    angular.extend(helper.config, configOverride);
  };

  /**
   * @ngInject
   *
   * @param {*}             $rootScope
   * @param {$location}     $location
   * @param {$state}        $state
   * @param {LoggerService} LoggerService
   * @returns {{
   *    configureStates: configureStates,
   *    getStates: getStates,
   *    stateCounts: {
   *      errors: number,
   *      changes: number,
   *    }
   *  }}
   */
  helper.$get = ($rootScope, $location, $state, LoggerService) => {
    const $urlRouterProvider = $urlRouterProvider;
    const $stateProvider = $stateProvider;
    const config = helper.config;
    const stateCounts = {
      errors: 0,
      changes: 0,
    };

    // Initialize used default variables
    let handlingStateChangeError = false;
    let hasOtherwise = false;

    /**
     * @name  configureStates
     * @desc  Implementation for configureStates method.
     *
     * @param {Object[]}  states
     * @param {string}    [otherwisePath]
     */
    function configureStates(states, otherwisePath = '') {
      // Iterate specified states, add resolves to each one and attach state to router
      states.forEach((state) => {
        $stateProvider.state(state.state, state.config);
      });

      // Set otherwise path
      if (otherwisePath && !hasOtherwise) {
        hasOtherwise = true;

        $urlRouterProvider.otherwise(otherwisePath);
      }
    }

    /**
     * @name  getStates
     * @desc  Implementation for getStates method.
     *
     * @returns {Object[]}
     */
    function getStates() {
      // noinspection JSUnresolvedFunction
      return $state.get();
    }

    // Private functions for service

    /**
     * Method to get toState destination name.
     *
     * @param   {Object}  toState
     * @returns {boolean|string}
     * @private
     */
    function _getDestination(toState) {
      return (toState && (toState.title || toState.name)) || 'unknown target';
    }

    /**
     * Method to determine error message that is shown to user if router error happens.
     *
     * @param   {Object}  error
     * @param   {Object}  toState
     * @returns {string}
     * @private
     */
    function _getErrorMessage(error, toState) {
      return `Error routing to ${_getDestination(toState)}. ${error.data || ''} <br /> 
              ${error.statusText || ''}: ${error.status || ''}`;
    }

    /**
     * Route cancellation:
     *  1) On routing error, go to the default location (/).
     *  2) Provide an exit clause if it tries to do it twice.
     *
     * @private
     */
    function _handleRoutingErrors() {
      $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
        // Oh noes error is already activated
        if (handlingStateChangeError) {
          return;
        }

        stateCounts.errors += 1;
        handlingStateChangeError = true;

        // State requires authenticated user.
        if (error === 'AUTH_REQUIRED') {
          $state.go('auth.login');

          LoggerService.error('Login required');
        } else { // Otherwise show error message and redirect user to root (/)
          LoggerService.warning(_getErrorMessage(error, toState), toState);

          $location.path('/');
        }
      });
    }

    /**
     * Method that will update current document title to match with state specification.
     *
     * @private
     */
    function _updateDocumentTitle() {
      $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        stateCounts.changes += 1;
        handlingStateChangeError = false;

        // data bind to <title>
        $rootScope.title = [
          config.docTitle,
          (toState.title || ''),
        ].join(' ');
      });
    }

    /**
     * Service initialize method. This will activate state change error listener and updates current page title to
     * match with state.
     *
     * @private
     */
    function _init() {
      _handleRoutingErrors();
      _updateDocumentTitle();
    }

    // Specify service methods
    const service = {
      configureStates,
      getStates,
      stateCounts,
    };

    // Initialize service
    _init();

    return service;
  };

};

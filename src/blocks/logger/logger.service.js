/**
 * @desc  LoggerService class.
 *
 * @ngInject
 */
export default ($log, $injector) => {

  const service = {};

  /**
   * Method to create error message.
   *
   * @param {string}  message
   * @param {Object}  [data]
   * @param {string}  [title]
   */
  service.error = (message, data = {}, title = '') => {
    this.showToast(message, data, title);

    // noinspection JSUnresolvedFunction
    $log.error(['Error:', message].join(' '), data, title);
  };

  /**
   * Method to create info message.
   *
   * @param {string}  message
   * @param {Object}  [data]
   * @param {string}  [title]
   */
  service.info = (message, data = {}, title = '') => {
    this.showToast(message, data, title);

    // noinspection JSUnresolvedFunction
    $log.info(['Info:', message].join(' '), data, title);
  };

  /**
   * Method to create success message.
   *
   * @param {string}  message
   * @param {Object}  [data]
   * @param {string}  [title]
   */
  service.success = (message, data = {}, title = '') => {
    this.showToast(message, data, title);

    // noinspection JSUnresolvedFunction
    $log.log(['Success:', message].join(' '), data, title);
  };

  /**
   * Method to create warning message.
   *
   * @param {string}  message
   * @param {Object}  [data]
   * @param {string}  [title]
   */
  service.warning = (message, data = {}, title = '') => {
    this.showToast(message, data, title);

    // noinspection JSUnresolvedFunction
    $log.warn(['Warning:', message].join(' '), data, title);
  };

  // noinspection JSUnusedGlobalSymbols
  /**
   * Generic logger method.
   *
   * @param {*} args
   */
  service.log = (...args) => {
    // noinspection JSUnresolvedFunction
    $log.log(args);
  }

  /**
   * Method to show toast.
   *
   * @param {string}  message
   * @param {Object}  [data]
   * @param {string}  [title]
   */
  service.showToast = (message, data = {}, title = '') => {
    // noinspection JSUnresolvedFunction
    $injector
      .get('$mdToast')
      .showSimple([
        title,
        message,
        (Object.keys(data).length ? data : ''),
      ].join(' '));
  }

};
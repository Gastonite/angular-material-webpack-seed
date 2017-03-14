/**
 * @desc  ExceptionHandler provider.
 *
 * @ngInject
 */
export default () => {

  const config = {
    appErrorPrefix: '',
  };

  /**
   * Configure method for the class.
   *
   * @param {string}  appErrorPrefix
   */
  const configure = (appErrorPrefix) => {
    this.config.appErrorPrefix = appErrorPrefix;
  };

  return {
    configure,
    config,
    $get: () => ({ config })
  }

};
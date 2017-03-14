/**
 * @ngInject
 */

const ErrorInterceptor = ($q, $injector) => {

  const skipErrorMessage = !response.config.skipErrorMessage;

  let message = '';
  let subTitle = '';

  if (response.data && response.data.error) {
    message = response.data.error;
  } else if (response.data && response.data.message) {
    message = response.data.message;
  } else if (typeof response.data === 'string') {
    message = response.data;
  } else if (response.statusText) {
    message = response.statusText;
  } else if (response.status === 0) {
    message = `CORS error with url '${response.config.url}'`;
  } else {
    message = $injector.get('HttpStatusService').getStatusCodeText(response.status);
  }

  if (response.status !== 0) {
    subTitle = ['HTTP status', response.status].join(' ');
  }

  if (message && skipErrorMessage) {
    $injector
      .get('LoggerService')
      .error(message, response, subTitle);
  }

  return $q.reject(response);
};
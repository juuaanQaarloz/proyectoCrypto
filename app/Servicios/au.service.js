(function () {
  'use strict';

  angular
    .module('app')
    .factory('AuInterceptor', AuInterceptor);

  AuInterceptor.$inject = ['$window'];

  /* @ngInject */
  function AuInterceptor($window) {
    var store = $window.localStorage;
    var llave = 'at-finance';

    var service = {
      request: insT
    };

    return service;

    ////////////////

    function insT(config) {

      var t = store.getItem(llave);
      if (t && config.url.indexOf('api.twilio.com') == -1) {
        config.headers = config.headers || {};
        config.headers['x-auth-token'] = t;
      }

      return config;
    };
  }
})();


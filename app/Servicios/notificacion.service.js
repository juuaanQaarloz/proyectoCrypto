(function () {
    'use strict';
    angular.module('app').factory('notificacion', notificacion);
    notificacion.$inject = ['toastr'];

function notificacion(toastr) {

        var overrides = {
            timeOut: 20000,
            positionClass: "toast-top-full-width"
        };

        return {
            mensaje: function (message, tipo, error) {
                toastr[tipo](message, '', overrides, error);
            }
        };
    }
})();
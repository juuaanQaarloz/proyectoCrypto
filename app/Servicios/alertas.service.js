/**
 * Created by Rice on 15-02-05.
 * @description Servicios encargados de desplegar las alertas en el sistema ya sean de error, exito o precaucion
 * de una manera visual para el entendimiento del usuario.
 */
(function () {
    'use strict';

    angular.module('app').factory('alertasServicios', alertasServicios);
    alertasServicios.$inject = ['$rootScope', '$log', '$timeout', '$window', 'toastr', 'notificacion'];

    /* @ngInject */
    function alertasServicios($rootScope, $log, $timeout, $window, toastr, notificacion) {
        var eAspaybAlerta = '';

        var servicios = {
            desplegarMensaje: desplegarMensaje,
            alertaIdle: alertaIdle,
            desplegarSuccess: desplegarSuccess,
            desplegarError: desplegarError,
            desplegarErrorObjeto: desplegarErrorObjeto,
            desplegarInfo: desplegarInfo
        };

        return servicios;

        /*  S E R V I C I O S  D E  L A  F A B R I C A  */
        /**
         * @ngdoc function
         * @name alertaIdle
         * @module eAspayb
         *
         * @param msj (Mensaje a desplegar)
         *
         * @description Funcion que despliega un mensaje de precaucion.
         */
        function alertaIdle(msj) {
            $log.info("Entra al metodo alertaIdle() de alertasServicios");
            toastr.clear();
            $timeout(function(){
                notificacion.mensaje(msj, 'warning', msj);
            }, 350);
            //desplegar(msj, 'warning', 10000);
        }

        /**
         * @ngdoc function
         * @name desplegarMensaje
         * @module eAspayb
         *
         * @param msj (Mensaje a desplegar)
         *
         * @description Funcion que despliega un mensaje de dependiendo
         * del estatus del mensaje, ya sea uno de error o  precaucion
         * por un tiempo definido.
         */
        function desplegarMensaje(msj) {
            $log.info("Entra al metodo desplegarMensaje() de alertasServicios");
            $log.info(msj);

            if (msj.status == 0 || msj.status == 501) {
                toastr.clear();
                $timeout(function(){
                    notificacion.mensaje('No hay conexi\u00F3n a Servicios.', 'error', msj);
                }, 350);
                //desplegar('No hay conexi\u00F3n a Servicios.', 'danger', 2000);
            }

            if (msj.status == 500) {
                toastr.clear();
                $timeout(function(){
                    notificacion.mensaje('Error interno, vuelva a intenarlo.', 'error', msj);
                }, 350);
                //desplegar('Error interno, vuelva a intenarlo.', 'danger', 2000);
            } else if (msj.data == null) {
                toastr.clear();
                $timeout(function(){
                    notificacion.mensaje(msj, 'error', msj);
                }, 350);
                //desplegarError(msj);
            } else {

                var textoE = angular.copy(msj.data.error);


                if(textoE!=undefined){
                    var formateado = textoE.split("~");
                    msj.data.error = formateado[0];
                }else{
                    textoE="Error desconocido : " + msj.data;
                    msj.data={};
                    msj.data.error="Error desconocido : " + msj.data;
                }


                toastr.clear();
                $timeout(function(){
                    notificacion.mensaje(msj.data.error, 'error', textoE);
                }, 350);
                //desplegar(msj.data.error, 'danger', 10000, formateado[1]);
            }

        };

        /**
         * @ngdoc function
         * @name desplegarSuccess
         * @module eAspayb
         *
         * @param msj (Mensaje a desplegar)
         *
         * @description Funcion que despliega un mensaje de exito.
         */
        function desplegarSuccess(msj) {
            $log.info("Entra al metodo desplegarSuccess() de alertasServicios");
            toastr.clear();
            $timeout(function(){
                notificacion.mensaje(msj, 'success', msj);
            }, 350);
            //desplegar(msj, 'success', 10000);
        };

        /**
         * @ngdoc function
         * @name desplegarError
         * @module eAspayb
         *
         * @param msj (Mensaje a desplegar)
         *
         * @description Funcion que despliega un mensaje de error.
         */
        function desplegarError(msj) {
            $log.info("Entra al metodo desplegarError() de alertasServicios");
            $log.info("msj: ");
            $log.info(msj);
            toastr.clear();
            $timeout(function(){
                if((msj.data != null && msj.data != undefined) && (msj.data.error != null && msj.data.error != undefined)){
                    notificacion.mensaje(msj.data.error.toString(), 'error', msj.data.error.toString());
                } else {
                    notificacion.mensaje(msj.toString(), 'error', msj.toString());
                }

            }, 350);
            // desplegar(msj, 'danger', 10000);
        };

        /**
         * @ngdoc function
         * @name desplegarInfo
         * @module eAspayb
         *
         * @param msj (Mensaje a desplegar)
         *
         * @description Funcion que despliega un mensaje de informacion.
         */
        function desplegarInfo(msj) {
            $log.info("Entra al metodo desplegarInfo() de alertasServicios");
            toastr.clear();
            $timeout(function(){
                notificacion.mensaje(msj.toString(), 'info', msj.toString());
            }, 350);
            // desplegar(msj, 'info', 10000);
        };

        /**
         * @ngdoc function
         * @name desplegar
         * @module eAspayb
         *
         * @param msj (Mensaje a desplegar)
         * @param tipo (Tipo de mensaje: error, info, success, warning)
         * @param tiempo (Tiempo a desplegar)
         * @param msjCompleto (Mensaje objeto)
         *
         * @description Funcion que despliega el mensaje segun la configuracion
         * dada en los parametros, esto ya se realiza de forma visual.
         */
        function desplegar(msj, tipo, tiempo, msjCompleto) {
            $log.info("Entra al metodo desplegar() de alertasServicios");
            $log.info("Mensajes del Sistema *****");
            $log.info(msj);
            $log.info(msjCompleto);
            $rootScope.eAspaybAlerta.msj = msj;
            $rootScope.eAspaybAlerta.msjCompleto = msjCompleto;
            $rootScope.eAspaybAlerta.tipo = tipo;

            $timeout(function () {
                $rootScope.eAspaybAlerta = {msj: '', tipo: '', msjCompleto: ''};
            }, tiempo);
        };

        /**
         * @ngdoc function
         * @name desplegarErrorObjeto
         * @module eAspayb
         *
         * @param objeto (Mensaje objeto)
         *
         * @description Funcion que invoca la funcion desplegar pero en modo error.
         */
        function desplegarErrorObjeto(objeto) {
            $log.info("Entra al metodo desplegarErrorObjeto() de alertasServicios");
            toastr.clear();
            $timeout(function(){
                notificacion.mensaje(objeto.data.error, 'error', objeto);
            }, 350);
            //desplegar(objeto.data.error, 'danger', 10000);
        };
    };
})();

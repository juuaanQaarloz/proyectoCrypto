/**
 * Created by Rice on 2014-08-21.
 * @description Servicios que corresponden al modulo de tablas en el cual es encargado de obtener las configuraciones
 * de tables requeridas por cada modulo.
 */
(function () {
    angular.module('tablas')
        .factory('tblsGenerales', tblsGenerales);

    function tblsGenerales($log, tblDatosCargados, tblDatosSeguimiento, tblDatosJustificacion) {

        var servicios = {
            getTabla: getTabla
        };

        return servicios;

        /*  S E R V I C I O S  D E  L A  F A B R I C A  */
        /**
         * @ngdoc function
         * @name getTabla
         * @module tablas
         * @param nombre
         * @description Funcion que obtiene la configuracion de la tabla
         * dependiendo del nombre.
         * @return config
         */
        function getTabla(nombre) {
            var config = undefined;
            if (nombre == 'tblDatosCargados')
                config = tblDatosCargados;
            else if (nombre == 'tblDatosSeguimiento')
                config = tblDatosSeguimiento;
            else if (nombre == 'tblDatosJustificacion')
                config = tblDatosJustificacion;
            else
                config = {};
            return config;
        }
    };
})();
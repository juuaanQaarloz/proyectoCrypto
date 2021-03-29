/**
/**
 * Created by Rice on 15-02-05.
 * @description Filtros del sistema en general.
 */
(function () {
    angular
        .module('xsModulo')
        .filter('palomaotache', palomaotache)
        .filter('fechaSimple', fechaSimple)
        .filter('materia', materia)
        .filter('filtroDinamico', filtroDinamico)
        .filter('offset', offset);

    offset.$inject = [];
    function offset() {
        return function (input, inicio) {
            inicio = parseInt(inicio, 10);
            return input.slice(inicio);
        };
    }
    palomaotache.$inject = [];
    function palomaotache(inverso) {
        return function (valorBoolenano) {
            if (valorBoolenano === 'S') {
                return '\u2713';
            } else {
                return '\u2718';
            }
        };
    }
    materia.$inject = [];
    function materia(inverso) {
        return function (valorBoolenano) {
            if (valorBoolenano == 1 ) {
                return 'Programación Orientada a Objetos';
            } else if (valorBoolenano == 2 ) {
                return 'Programación WEB';
            } else {
                return valorBoolenano;
            }
        };
    }
    fechaSimple.$inject = ['$filter', '$log'];
    function fechaSimple($filter, $log) {
        return function (fechaOriginal) {
            if (fechaOriginal == undefined || fechaOriginal == null) {
                return null;
            } else {
                var myDate = moment(fechaOriginal);
                var fec = myDate.format("DD-MM-YYYY");

                if (fec == 'Invalid date') {
                    return fechaOriginal;
                } else {
                    return fec;
                }
            }

        };
    }
    filtroDinamico.$inject = ['$log', '$filter'];
    function filtroDinamico($log, $filter) {
        return function (dato, filtro) {
            if(filtro){
                if (filtro == 'currency') {
                    return $filter(filtro)(dato, ' ');
                } else {
                    return $filter(filtro)(dato);
                }
            } else return dato;

        };
    };
})();

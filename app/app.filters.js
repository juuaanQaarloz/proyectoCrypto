
/**
 * Created by Rice on 15-02-05.
 * @description Filtros del sistema en general.
 */
(function () {
    angular
        .module('app')
        .filter('unSafe', unSafe);

    unSafe.$inject = ['$sce'];
    function unSafe($sce) {
        return function (val) {
            return val ? $sce.trustAsHtml(val+'') : '';
        };
    }

})();
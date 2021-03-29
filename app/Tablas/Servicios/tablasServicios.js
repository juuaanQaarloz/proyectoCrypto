(function() {
  angular.module('tablas')
    .factory('tblsServicios', tblsServicios);

  function tblsServicios($log, tblsGenerales) {

    var servicios = {
      getTabla: getTabla
    };

    return servicios;

    /**
     * @ngdoc function
     * @name asignarPgetTablaermisosTabla
     * @module tablas
     * @param modulo
     * @param nombretabla
     * @description Funcion que obtiene la configuracion de la tabla
     * dependiendo del modulo y nombre. Para ello dependiendo del modulo
     * se hace el llamdo a su servicio en especifico.
     *
     * @return tblsGenerales.getTabla
     */
    function getTabla(modulo, nombretabla) {
      if (modulo === 'tblsGenerales')
        return tblsGenerales.getTabla(nombretabla);
    }
  }
})();

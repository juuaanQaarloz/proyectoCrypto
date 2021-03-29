(function() {

  /**
   * @ngdoc directive
   * @name xpertysModulo.directive:xsBusqueda
   * @scope
   * @restrict E
   * @description
   * Directiva que tiene la funcionalidad de contenedor para campos de busqueda
   */
  angular
    .module('xsModulo')
    .controller('Busqueda', Busqueda)
    .directive('xsBusqueda', xsBusqueda);

  Busqueda.$inject = ['$scope', '$log'];

  function Busqueda($scope, $log) {
    // Injecta $scope al controlador
    var busquedaCtrl = this;

    busquedaCtrl.inicializar = inicializar;

    /**
     * @ngdoc method
     * @name xpertysModulo.xsBusqueda#inicializar
     * @methodOf xpertysModulo.directive:xsBusqueda
     * @description Es la primera funcion en ejecutarse
     * al cargar esta directiva por cual inicializa variables.
     * Obtiene las variables que le inyectan para establecer si se
     * coplapsa o no el panel y poner el titulo del contenedor
     * @param {boolean} desplegado - Valor booleando para desplegar
     * @param {Object} contenedor - Contenedor esperado
     * @param {string} titulo - Cadena con titulo
     */
    function inicializar(desplegado, contenedor, titulo) {
      if($scope.validar == null  || $scope.validar == undefined){
        $scope.validar = true;
      }
      if (desplegado === 'true') {
        busquedaCtrl.estaDesplegado = true;
      }
      else if(desplegado == true){
        busquedaCtrl.estaDesplegado = true;
      }
      else {
        busquedaCtrl.estaDesplegado = false;
      }
      if(contenedor!=undefined){
        busquedaCtrl.contenedor=true;
      }
      else{
        busquedaCtrl.contenedor=false;
      }
      if(titulo!=undefined){
        busquedaCtrl.titulo = titulo;
      }


     }

    $scope.$watch('desplegado', function (ban) {
      if (ban == 'true') {
        busquedaCtrl.estaDesplegado = true;
      }
      else if(ban==true){
        busquedaCtrl.estaDesplegado = true;
      }
      else {
        busquedaCtrl.estaDesplegado = false;
      }
      $scope.persona = busquedaCtrl.estaDesplegado;
      $log.warn('entro al watch');
    }, true);
    $scope.$watch('busquedaCtrl.estaDesplegado', function (ban) {
      $scope.persona = busquedaCtrl.estaDesplegado;
     }, true);

  }
  xsBusqueda.$inject = ['$log'];

  function xsBusqueda($log) {
    var directiva = {
      restrict: 'E',
      templateUrl: 'Directivas/xsDirectivas/Componentes/xsBusqueda/xsBusqueda.html',
      transclude: 'true',
      scope: {
        desplegado:     '=?',
        busqueda:       '&',
        limpiarCampos:  '&',
        accionColapsar:  '&?',
        validar:        '=?',
        titulo:         '=?',
        contenedor:     '=?',
        tituloDetalle:  '=?',
        persona:        '=?',
        iconoBusqueda:  '=?',
        toggle:         '=?',
        quitar:         '=?',
        contenedorClass: '=?'
      },
      link: funcionLink,
      controller : Busqueda,
      controllerAs: 'busquedaCtrl'
    };

    return directiva;
    /**
     * @ngdoc method
     * @name xpertysModulo.xsBusqueda#funcionLink
     * @methodOf xpertysModulo.directive:xsBusqueda
     * @description Es la funcion que manda a llamar al inicializar
     * despues de que haya cargado la directiva
     */
    function funcionLink(scope, el, atrs, ctrl) {
      ctrl.inicializar(scope.desplegado, scope.contenedor, scope.titulo);
      $log.warn(scope.titulo);
      $log.warn(scope.contenedor);
    }
  }
})();

/**
 * @ngdoc directive
 * @name xpertysModulo.directive:xsMenuAbm
 * @scope
 * @restrict E
 * @description
 * Compomenete complementario de la tabla que muestan las operaciones basicas de la tabla (Agregar, Modificar y Borrar), asi mismo como el menu de contexto,
 * observaciones y auditoria.
 */
angular.module('xsModulo')
  .controller('xsMenuAbmControlador', xsMenuAbmControlador)
  .directive('xsMenuAbm', xsMenuAbm);

xsMenuAbmControlador.$inject = ['$scope', '$log', '$location', 'urlModals', 'eAspaybServicios', 'usuarioSesion',
    'alertasServicios', 'tblsServicios', '$translate', 'observaciones'];

function xsMenuAbmControlador($scope, $log, $location, urlModals, eAspaybServicios, usuarioSesion, alertasServicios,
                              tblsServicios, $translate, observaciones) {

  var xsMenuAbmCtrl = this;
  xsMenuAbmCtrl.botonPersonalizado = false;
  xsMenuAbmCtrl.numeroObservaciones = observaciones;
  xsMenuAbmCtrl.init = init;
  xsMenuAbmCtrl.esValorIncorrecto = esValorIncorrecto;
  xsMenuAbmCtrl.mostrarModal = mostrarModal;
  xsMenuAbmCtrl.mostrarObservacion = mostrarObservacion;
  xsMenuAbmCtrl.indicarOperacion = indicarOperacion;
  $scope.consultarObservacionesMenu = consultarObservacionesMenu;
  activar();

  $scope.$watch('permisos', function (permisos) {
    if (permisos != null && permisos != undefined) {
      xsMenuAbmCtrl.init();
    }
  }, true);

  /**
   * @ngdoc method
   * @name xpertysModulo.xsMenuAbm#activar
   * @methodOf xpertysModulo.directive:xsMenuAbm
   * @description Activar, es la primera funcion en ejecutarse
   * en este caso verifica si la propiedad de la directiva boton
   * personalizado esta activo inicializa la bandera de xsMenuAbmCtrl.botonPersonalizado
   * en true para mostrar el boton en la tabla.
   */
  function activar(){
    //$log.info("Activar controlador de ABM");
    if($scope.botonPersonalizado){
      xsMenuAbmCtrl.botonPersonalizado = true;
    }
  }

  /**
   * @ngdoc method
   * @name xpertysModulo.xsMenuAbm#init
   * @methodOf xpertysModulo.directive:xsMenuAbm
   * @description Funcion que inicializa las banderas para mostrar o no
   * los botones dependiendo de los permisos que tenga la tabla. Esta funciona
   * se invoca cade vez que cambian los permisos de la tabla.
   */
  function init() {
    xsMenuAbmCtrl.noMostrar = false;
    xsMenuAbmCtrl.menuAux = null;

    xsMenuAbmCtrl.esStsValido = false;

    if ($scope.permisos.agregar) {
      xsMenuAbmCtrl.a = true;
      xsMenuAbmCtrl.noMostrar = true;
    }

    if ($scope.permisos.modificar) {
      xsMenuAbmCtrl.m = true;
    }

    if ($scope.permisos.agregar == false) {
      xsMenuAbmCtrl.a = false;
    }
    if ($scope.permisos.modificar == false) {
      xsMenuAbmCtrl.m = false;
    }
    if ($scope.permisos.borrar == false) {
      xsMenuAbmCtrl.b = false;
    }

    if ($scope.permisos.borrar) {
      xsMenuAbmCtrl.b = true;
    }

    if ($scope.permisos.audDML) {
      xsMenuAbmCtrl.dml = true;
    } else {
      xsMenuAbmCtrl.dml = false;
    }


    if (esValorIncorrecto($scope.permisos) || $scope.permisos === {}) {
      //$log.error('La tabla no tiene Permisos para operaciones ABM');
    }

        if (esValorIncorrecto($scope.modals) || $scope.modals === {}) {
            //$log.error('La tabla no contiene Modals');
        }

        if(!$scope.detalleInterno){
            $log.info("Consulta Observaciones de Detalle Interno");

            if ($scope.permisos.observaciones && eAspaybServicios.validarDato($scope.modelo)) {
                xsMenuAbmCtrl.numeroObservaciones[$scope.row + '' + $scope.tabla] = null;

                var arregloNombres = new Array("ID", "TABLA", "GRPLOV");
                var arregloValores = new Array($scope.row, $scope.tabla, $scope.permisos.grpLov);
                var parametrosConsultaGenerica = {
                    pcId_Query: 'cnsNumObservaciones', pcLlave: usuarioSesion.getPcLlave(),
                    pcArrayParametrosName: arregloNombres,
                    pcArrayParametrosValue: arregloValores
                };

                var promesaConsultaGenerica = eAspaybServicios.consultaGenerica(parametrosConsultaGenerica).$promise;
                promesaConsultaGenerica.then(function (respuesta) {
                    if (respuesta.length != 0) {
                        xsMenuAbmCtrl.numeroObservaciones[($scope.row + '' + $scope.tabla)] = respuesta[0].observaciones;
                    }
                });
                promesaConsultaGenerica.catch(function (error) {
                    alertasServicios.desplegarMensaje(error);
                });
            }
        }

        /*$log.info("angular.forEach(xsMenuAbmCtrl.menusTabla");
         $log.info(xsMenuAbmCtrl.menusTabla);

         angular.forEach(xsMenuAbmCtrl.menusTabla, function (menu, cont) {
         $log.info('menu');
         $log.info(menu);
         if(menu.ddl.modal=='modalAgregarObs'){
         $log.info('ifmenu');
         xsMenuAbmCtrl.menuAux = menu;
         xsMenuAbmCtrl.menusTabla.splice(cont,1);
         }
         });*/



    }

    /**
     * @ngdoc method
     * @name xpertysModulo.xsTabla#getRowId
     * @methodOf xpertysModulo.directive:xsTabla
     * @param {Obejct} rowName - Fila seleccionada
     * @description Funcion regresa la fila seleccionada en la tabla.
     * @return {Object} row|$scope.registroSeleccionado - Valor de retorno
     */
    function getRowId(rowName, modelo) {
        if (rowName != null && modelo != null) {
            rowArray = rowName.split('|');
            if (rowArray.length > 1) {
                var row = '';
                for (var i = 0; i < rowArray.length; i++) {
                    row += modelo[rowArray[i]];
                    if (i != rowArray.length - 1) {
                        row += '-';
                    }
                }
                return row
            } else {
                return modelo[rowArray[0]]
            }
        }
    }


    function consultarObservacionesMenu(modelo, row , tabla) {
        $log.info("Consulta de Observaciones de la tabla del Menú!");
        xsMenuAbmCtrl.rowIds = getRowId(row, modelo);

        if ($scope.permisos.observaciones && eAspaybServicios.validarDato(modelo)) {
            xsMenuAbmCtrl.numeroObservaciones[xsMenuAbmCtrl.rowIds + '' + tabla] = null;

            var arregloNombres = new Array("ID", "TABLA", "GRPLOV");
            var arregloValores = new Array(xsMenuAbmCtrl.rowIds, tabla, $scope.permisos.grpLov);
            var parametrosConsultaGenerica = {
                pcId_Query: 'cnsNumObservaciones', pcLlave: usuarioSesion.getPcLlave(),
                pcArrayParametrosName: arregloNombres,
                pcArrayParametrosValue: arregloValores
            };

            var promesaConsultaGenerica = eAspaybServicios.consultaGenerica(parametrosConsultaGenerica).$promise;
            promesaConsultaGenerica.then(function (respuesta) {
                if (respuesta.length != 0) {
                    xsMenuAbmCtrl.numeroObservaciones[xsMenuAbmCtrl.rowIds + '' + tabla] = respuesta[0].observaciones;
                }
            });
            promesaConsultaGenerica.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            });
        }
    }

  /**
   * @ngdoc method
   * @name xpertysModulo.xsMenuAbm#esValorIncorrecto
   * @methodOf xpertysModulo.directive:xsMenuAbm
   * @description Determina que si los permisos son correctos
   * osea no sean null o undefined.
   * @return {boolean} bandera - True (si viene erroneo), false (Si vienen correcto)
   */
  function esValorIncorrecto(parametro) {
    if (parametro == null || parametro == undefined) {
      return true;
    }
    else return false;
  }

  /**
   * @ngdoc method
   * @name xpertysModulo.xsMenuAbm#mostrarModal
   * @methodOf xpertysModulo.directive:xsMenuAbm
   * @param {Object} id - Identificador de modal
   * @param {Object} modal - Modal
   * @description Funcion que abre la modal de forma dinamica por
   * medio del id recibido.
   */
  function mostrarModal(id, modal) {
    if ($scope.form) {
      $location.path('/' + id);
    }
    else {
      if ($scope.inicializarModal != undefined) {
        $scope.inicializarModal();
      }

      angular.element('#' + id).modal('show');

      angular.element('#' + id).on('shown.bs.modal', function () {
        angular.element('#' + id).find('input:first').focus();
      });
    }
  }

  /**
   * @ngdoc method
   * @name xpertysModulo.xsMenuAbm#indicarOperacion
   * @methodOf xpertysModulo.directive:xsMenuAbm
   * @param {string} op - Operacion a realizar
   * @description Funcion que determina que boton fue presionado por medio de
   * la operacion y con eso determina que accion realizara.
   */
  function indicarOperacion(op){
    if(op == 'A'){
      if($scope.accionInsertar != undefined){
        $scope.accionInsertar();
      }
    }

    if(op == 'M'){
      if($scope.accionModificar != undefined){
        $scope.accionModificar();
      }
    }

    if(op == 'B'){
      if($scope.accionEliminar != undefined){
        $scope.accionEliminar();
      }
    }
    //Realiza busqueda
  }

  /**
   * @ngdoc method
   * @name xpertysModulo.xsMenuAbm#inicializar
   * @methodOf xpertysModulo.directive:xsMenuAbm
   * @param {string} grpLov - Grupo de lista de valores
   * @param {boolean} flag - Bandera
   * @param {Object} ddl - Objeto ddl
   * @description Funcion que muestra las observaciones del registro de manera dinamica, se pasa a un metodo
   * la tabla, el registro, el tipo de lov de la observacion y el titlo.
   * @return {string} cadena  - Observacion
   */
  function mostrarObservacion(grpLov, flag, ddl) {
    $log.info('grpLov');
    $log.info(grpLov);
    eAspaybServicios.setObservacion($scope.tabla, $scope.row, grpLov, $translate($scope.titulo).then(function (cadena) {
      return cadena;
    }), flag, ddl)
  }
  $scope.$watch('permisos', function (registro) {

    xsMenuAbmCtrl.esStsValido = false;

    if ($scope.permisos.agregar) {
      //$log.info('Permiso agregar');
      xsMenuAbmCtrl.a = true;
      xsMenuAbmCtrl.noMostrar = true;
    }

    if ($scope.permisos.modificar) {
      //$log.info('Permiso modificar');
      xsMenuAbmCtrl.m = true;
    }

    if ($scope.permisos.borrar) {
      //$log.info('Permiso borrar');
      xsMenuAbmCtrl.b = true;
    }

    if ($scope.permisos.audDML) {
      //$log.info('Permiso auditoria');
      xsMenuAbmCtrl.dml = true;
    } else {
      //$log.info('Permiso auditoria denegado');
      xsMenuAbmCtrl.dml = false;
    }


    if (esValorIncorrecto($scope.permisos) || $scope.permisos === {}) {
      //$log.error('La tabla no tiene Permisos para operaciones ABM');
    }

    if (esValorIncorrecto($scope.modals) || $scope.modals === {}) {
      //$log.error('La tabla no contiene Modals');
    }
  }, true);
}


xsMenuAbm.$inject = ['$log'];

  function xsMenuAbm($log) {
    var directiva =  {
      restrict: 'E',
      scope: {
        form: '=?',
        permisos: '=',
        modals: '=',
        datos: '=',
        modelo: '=',
        cargarMdlA: '&?',
        inicializarModal: '&?',
        cargarMdlM: '&?',
        menusTabla: '=?',
        registroSeleccionado: '=',
        tabla: '@',
        row: '@',
        ejecutarAccion: '&',
        accionAuditoria: '&',
        titulo: '@',
        columnas: '=?',
        ocultarColumnas: '=?',
        accionInsertar: '&?',
        accionModificar: '&?',
        accionEliminar: '&?',
        editarConsultar: '=?',
        ocultarMenuContexto: '=?',
        botonAccion: '&?',
        botonPersonalizado: '=?',
        botonTool: '=?',
        botonHabilitado: '=?',
        menusSimples: '=?',
        ocultarObs: '=?',
        mostrarBotonPersonalizado: '=?',
        consultarObservacionesMenu: '=?',
        botonSinClase: '=?',
        editarValidar: '=?'
      },
      templateUrl: 'Directivas/xsDirectivas/Componentes/xsMenuABM/xsMenuABM.html',
      controller: xsMenuAbmControlador,
      controllerAs: 'xsMenuAbmCtrl'
    };

    return directiva;
  }

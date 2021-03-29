(function () {

    /**
     * @ngdoc directive
     * @name xpertysModulo.directive:xsTabla
     * @scope
     * @restrict E
     * @description
     * Componente/Directiva general de la tabla que se utiliza en toda la aplicacion.
     */
    angular
        .module('xsModulo')
        .controller('TablaControlador', TablaControlador)
        .directive('xsTabla', xsTabla);

    TablaControlador.$inject = ['$log', '$scope', '$window', '$filter','$timeout'];

    function TablaControlador($log, $scope, $window, $filter, $timeout) {
        // Injecta $scope al controlador
        var tablaCtrl = this;

        $scope.mdlA = false;
        $scope.mdlM = false;
        tablaCtrl.contenedor = false;
        tablaCtrl.modificarRow = false;
        tablaCtrl.datosFiltrados = [];
        tablaCtrl.menusRegistroSeleccionado = [];
        tablaCtrl.currentPage = 0;
        tablaCtrl.itemsPerPage = $scope.config.paginacion[0];
        tablaCtrl.flagVigencia = false;
        tablaCtrl.valorAgregarRow = $scope.agregarRowValor;
        tablaCtrl.confColor = {};

        tablaCtrl.editable = $scope.config.editable;
        tablaCtrl.todos = {};

        tablaCtrl.inicializar = inicializar;
        tablaCtrl.initcializarModalA = initcializarModalA;
        tablaCtrl.initcializarModalM = initcializarModalM;
        tablaCtrl.pageCount = pageCount;
        tablaCtrl.irA = irA;
        tablaCtrl.ajustarTamanoPagina = ajustarTamanoPagina;
        tablaCtrl.ocultarDetalle = ocultarDetalle;
        tablaCtrl.ordenarPor = ordenarPor;
        tablaCtrl.paginarAdelante = paginarAdelante;
        tablaCtrl.paginarAtras = paginarAtras;
        tablaCtrl.prevPageDisabled = prevPageDisabled;
        tablaCtrl.primerPagina = primerPagina;
        tablaCtrl.nextPageDisabled = nextPageDisabled;
        tablaCtrl.ultimaPagina = ultimaPagina;
        tablaCtrl.validarStatus = validarStatus;
        tablaCtrl.getRowId = getRowId;
        tablaCtrl.validaVigencia = validaVigencia;
        tablaCtrl.agregarRow = agregarRow;
        tablaCtrl.agregarRowFlag = false;
        tablaCtrl.clcikear = clcikear;
        tablaCtrl.inicializar = inicializar;
        tablaCtrl.styleFila = styleFila;
        tablaCtrl.inciarCampoSelect = inciarCampoSelect;
        $scope.validarCheckBox = validarCheckBox;
        tablaCtrl.seleccionarTodos = seleccionarTodos;
        tablaCtrl.seleccionarTodosDatosTabla = seleccionarTodosDatosTabla;

        function validarDato(valor){
            var bandera = false;
            if (valor != undefined && valor != null && valor != '') {
                bandera = true;
            }
            return bandera;
        }

        $scope.$watch('datos', function (datos, datosAnteriores) {

            if (!validarDato(datos)) {
                datos = [];
            }

            if (!validarDato(datosAnteriores) || datosAnteriores.length == undefined) {
                datosAnteriores = [];
            }
            if (datosAnteriores.length == 0 || tablaCtrl.datosPrincipales == undefined || datos.length == datosAnteriores.length) {
                tablaCtrl.datosPrincipales = datos;
                tablaCtrl.datosBusqueda = angular.extend(datos);
            } else if (datos.length < datosAnteriores.length || datos.length > datosAnteriores.length) {
                tablaCtrl.datosPrincipales = datos;
                tablaCtrl.datosBusqueda = angular.extend(datos);
                //tablaCtrl.datosBusqueda = angular.extend(datos);
                //tablaCtrl.datosPrincipales = angular.extend(tablaCtrl.datosBusqueda);

                var myRedObjects = $filter('filter')(tablaCtrl.datosPrincipales, tablaCtrl.busqueda);
                tablaCtrl.datosPrincipales = myRedObjects;
                primerPagina();
                inicializar();
            }
            tablaCtrl.pageCount();
        }, true);


        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#initcializarModalA
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que se ejecuta de forma externa de la directiva xsMenuABM en la
         * propiedad cargar-mdl-a y a su vez pone en true la propiedad $scope.mdlA. Indicador que cargo dicha modal.
         */
        function initcializarModalA() {
            if ($scope.mdlA == false) {
                $scope.mdlA = true;
            }
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#clcikear
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que se ejecuta al dar clic a un registro de la tabla.
         * Y se valida que tenga la propiedad de detalleInterno para as� mostrar el detalle
         * en la tabla o no.
         */
        function clcikear(registro) {



            if ($scope.detalleInterno != undefined) {
                if ($scope.registroSeleccionado != registro && $scope.detalleInterno) {
                    $scope.detalleInterno = $scope.detalleInterno;
                } else {
                    $scope.detalleInterno = !$scope.detalleInterno;
                }
            }

            //tablaCtrl.consultarObservacionesMenu(registro, $scope.config.idRow, $scope.config.tablaBD );

        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#initcializarModalM
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que se ejecuta de forma externa de la directiva xsMenuABM en la
         * propiedad cargar-mdl-m y a su vez pone en true la propiedad $scope.mdlM. Indicador que cargo dicha modal.
         */
        function initcializarModalM() {
            if ($scope.mdlM == false) {
                $scope.mdlM = true;
            }
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#paginarAtras
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que se ejecuta al presionar el regresar pagina de la tabla,
         * entonces a la pocision actual se le disminuye un valor para relizar el retroceso.
         */
        function paginarAtras() {
            if (tablaCtrl.currentPage > 0) {
                tablaCtrl.currentPage--;
            }
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#prevPageDisabled
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que valida si estamos en la primera pagina de la tabla
         * deshabilite el boton de retrocesos de pagina.
         */
        function prevPageDisabled() {
            return tablaCtrl.currentPage === 0 ? "disabled" : "";
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#pageCount
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion realiza el conteo de registro por pagina.
         */
        function pageCount() {
            if (tablaCtrl.datosPrincipales != null) {
                return Math.ceil(tablaCtrl.datosPrincipales.length / tablaCtrl.itemsPerPage) - 1;
            }
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#paginarAdelante
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que se ejecuta al presionar el siguiente de pagina de la tabla,
         * entonces a la pocision actual se le aumenta un valor para relizar la accion.
         */
        function paginarAdelante() {
            if (tablaCtrl.currentPage < tablaCtrl.pageCount()) {
                tablaCtrl.currentPage++;
            }
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#nextPageDisabled
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que valida si estamos en la ultima pagina de la tabla
         * deshabilite el boton de siguiente de pagina.
         */
        function nextPageDisabled() {
            return tablaCtrl.currentPage === tablaCtrl.pageCount() ? "disabled" : "";
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#ajustarTamanoPagina
         * @methodOf xpertysModulo.directive:xsTabla
         * @param {number} datosPorPagina - Numero de registro por pagina
         *
         * @description Funcion que establece cuantos elementos por pagina
         * pueden visualizarse dependiendo de lo que se ingreso.
         */
        function ajustarTamanoPagina(datosPorPagina) {
            tablaCtrl.primerPagina();
            tablaCtrl.itemsPerPage = datosPorPagina;
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#inicializar
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion inicializa el orden de los elementos de la tabla
         * por la primer columna, si exite el parametro sinOrden entonces no se ordenan.
         */
        function inicializar() {
            //tablaCtrl.itemsPerPage = $scope.config.paginacion[0];
            tablaCtrl.modificarRow = validarDato($scope.modificarRow) ? true : false;
            if (!validarDato($scope.sinOrden) &&
                (validarDato($scope.config.columnas) && $scope.config.columnas.length > 0)) {
                if (tablaCtrl.ordenSeleccionado == null && tablaCtrl.columnaSeleccionada == null) {
                    tablaCtrl.ordenarPor($scope.config.columnas[0].valor, $scope.config.columnas[0].descripcion);
                }
            }else{
                if(Object.prototype.toString.call( $scope.sinOrden ) === '[object Object]')
                    tablaCtrl.ordenarPor($scope.sinOrden.valor, $scope.sinOrden.descripcion);
            }

            if ($scope.contenedor != undefined) {
                tablaCtrl.contenedor = true;
            } else {
                tablaCtrl.contenedor = false;
            }
            if($scope.columnaOrdenar){
                tablaCtrl.ordenSeleccionado = $scope.columnaOrdenar;
            }

        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#irA
         * @methodOf xpertysModulo.directive:xsTabla
         * @param {number} pagina - Numero de pagina donde se quiere ir
         *
         * @description Funcion inicializa la actual pagina a la que solicito el
         * usuario.
         */
        function irA(pagina) {
            tablaCtrl.currentPage = pagina - 1;
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#ocultarDetalle
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que oculta el detalle del registro seleccionado.
         */
        function ocultarDetalle() {
            $scope.ocultar = false;
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#ordenarPor
         * @methodOf xpertysModulo.directive:xsTabla
         * @param {Object} orden - Objeto de orden
         * @param {Object} columna - Objeto de columnas
         * @description Funcion que ordena dada una columna seleccionada.
         */
        function ordenarPor(orden, columna) {
            if (tablaCtrl.ordenSeleccionado == orden) {
                tablaCtrl.ordenSeleccionado = '-' + orden;
            } else {
                tablaCtrl.ordenSeleccionado = orden;
                tablaCtrl.columnaSeleccionada = columna;
            }
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#primerPagina
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion posiciona a la tabla en la primera pagina.
         */
        function primerPagina() {
            tablaCtrl.currentPage = 0;
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#ultimaPagina
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion posiciona a la tabla en la ultima pagina.
         */
        function ultimaPagina() {
            var paginas = tablaCtrl.pageCount();
            tablaCtrl.currentPage = parseInt(paginas);
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#getRowId
         * @methodOf xpertysModulo.directive:xsTabla
         * @param {Obejct} rowName - Fila seleccionada
         * @description Funcion regresa la fila seleccionada en la tabla.
         * @return {Object} row|$scope.registroSeleccionado - Valor de retorno
         */
        function getRowId(rowName) {
            if (rowName != null && $scope.registroSeleccionado != null) {
                rowArray = rowName.split('|');
                if (rowArray.length > 1) {
                    var row = '';
                    for (var i = 0; i < rowArray.length; i++) {
                        row += $scope.registroSeleccionado[rowArray[i]];
                        if (i != rowArray.length - 1) {
                            row += '-';
                        }
                    }
                    return row
                } else {
                    return $scope.registroSeleccionado[rowArray[0]]
                }
            }
        }


        $scope.$watch('registroSeleccionado', function (registro, regsitroAnteriores) {
            if (registro != null && registro != undefined && registro != {}) {
                if (!angular.equals(registro, regsitroAnteriores)) {
                    validarStatus(registro);
                } else {
                    validarStatus(registro);
                }
            }
        }, true);


        $scope.$watch('tablaCtrl.busqueda', function (registro, regsitroAnteriores) {
            if (registro != null && registro != undefined && registro != {}) {


                if (!validarDato(regsitroAnteriores)) {
                    regsitroAnteriores = "";
                }

                if (registro.length == 0) {
                    tablaCtrl.datosPrincipales = angular.extend(tablaCtrl.datosBusqueda);
                    primerPagina();
                    inicializar();
                } else if (registro.length < regsitroAnteriores.length) {
                    tablaCtrl.datosPrincipales = angular.extend(tablaCtrl.datosBusqueda);
                    var myRedObjects = $filter('filter')(tablaCtrl.datosPrincipales, registro);
                    tablaCtrl.datosPrincipales = myRedObjects;
                    primerPagina();
                    inicializar();
                } else {
                    var myRedObjects = $filter('filter')(tablaCtrl.datosPrincipales, registro);
                    tablaCtrl.datosPrincipales = myRedObjects;
                    primerPagina();
                    inicializar();
                }
                $scope.registroSeleccionado = null;
            }
        }, true);

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#validaVigencia
         * @methodOf xpertysModulo.directive:xsTabla
         * @param {Object} registro - Registro seleccionado
         *
         * @description Funcion que valida que la fecha de hoy
         * esten dentro de la vigencia inicio y fin del registro
         * esto se evalua si en el objeto de configuracion de la tabla
         * tiene el indicador de vigencia activo.
         *
         * @return {boolean} tablaCtrl.flagVigencia - True o false
         */
        function validaVigencia(registro) {

            tablaCtrl.flagVigencia = false;
            if ($scope.config.indVigencia != undefined && $scope.config.indVigencia != null) {
                var myDate = new Date();

                var startDate = new Date(registro[$scope.config.indVigencia.inicio]);
                var endDate = new Date(registro[$scope.config.indVigencia.fin]);

                if (startDate < myDate && myDate < endDate) {
                    tablaCtrl.flagVigencia = true;
                    // myDate is between startDate and endDate
                }
            }
            return tablaCtrl.flagVigencia;
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#agregarRow
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que inicializa en true la bandera de
         * tablaCtrl.agregarRowFlag.
         */
        function agregarRow() {
            tablaCtrl.agregarRowFlag = true;
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#validarStatus
         * @methodOf xpertysModulo.directive:xsTabla
         * @param {Object} registro - Registro seleccionado
         * @description Funcion que valida que el registro contenga la propiedad
         * sts dentro de sus atributos. Si la contiene muestra los menus de contexto
         * permitidos con el estatus.
         */
        function validarStatus(registro) {
            tablaCtrl.menusRegistroSeleccionado = [];
            var estatusRegistroSeleccionado = null;
            if (!validarDato($scope.menusSimples)) {
                for (var property in registro) {
                    if (property.indexOf("sts") > -1) {

                        estatusRegistroSeleccionado = registro[property];
                    }
                }
                if ($scope.config.menus != null && $scope.config.menus != undefined) {
                    for (var i = 0; i < $scope.config.menus.length; i++) {
                        for (var j = 0; j < $scope.config.menus[i].stsPermitidos.length; j++) {
                            if ($scope.config.menus[i].stsPermitidos[j] == estatusRegistroSeleccionado) {
                                tablaCtrl.menusRegistroSeleccionado.push($scope.config.menus[i]);
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i < $scope.config.menus.length; i++) {
                    tablaCtrl.menusRegistroSeleccionado.push($scope.config.menus[i]);
                }
            }
        }

        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#styleFila
         * @methodOf xpertysModulo.directive:xsTabla
         * @param {Object} registro - Registro seleccionado
         * @description Funcion que asigna un color a la fila si contiene el indicador
         * indColor que asu vez contien el codigo del color
         */
        function styleFila(registro) {

            var styleFila = '';
            if (validarDato(registro.indColorRow)) {
                styleFila = {
                    "color": registro.indColorRow
                }
            }
            return styleFila;
        }

        function inciarCampoSelect(datos, columna, columnaValida){
            $log.info("");
            tablaCtrl.todos[columna] = {};
            tablaCtrl.todos[columna].valor = 'N';
            tablaCtrl.todos[columna].mostrar = true;
            var datosConPermisos = _.filter(datos, function (cot){
                return cot[columnaValida] == 'S';
            });
            var filtrados = _.filter(datosConPermisos, function (dato){
                return dato[columna] == 'S';
            });
            if(filtrados.length == datosConPermisos.length){
                tablaCtrl.todos[columna].valor = 'S';
            }
            var sinPermisos = _.filter(datos, function (sin){
                return sin[columnaValida] == 'N';
            });
            if(sinPermisos.length == datos.length){
                tablaCtrl.todos[columna].mostrar = false;
            }
        }

        function validarCheckBox(){
            //En este metodo se iniciliaza el combox del header
            $log.info("Datos principales");
            $log.info(tablaCtrl.datosPrincipales);
            $log.info("Datos principales");
            if(validarDato($scope.config.columnas)){
                angular.forEach($scope.config.columnas, function(col){
                    if(col.dato != undefined && $scope.config.permisos.modificar){
                        tablaCtrl.todos[col.valor].valor = 'N';
                        var datosConPermisos = _.filter(tablaCtrl.datosPrincipales, function (con){
                            return con[col.validarCampo] == 'S';
                        });
                        var filtrados = _.filter(datosConPermisos, function (dato){
                            return dato[col.valor] == 'S';
                        });
                        if(filtrados.length == datosConPermisos.length){
                            tablaCtrl.todos[col.valor].valor = 'S';
                        }
                    }
                });
            }
        }
        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#seleccionarTodos
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que inicializa en true la bandera de
         * tablaCtrl.agregarRowFlag.
         */
        function seleccionarTodos(valor, datos, columna, columnaValidacion){
            $log.info("Seleccionar Todos .....> ");
            var filtrar = 'S';
            if(valor == 'S'){
                filtrar = 'N';
            }
            var filtrados = _.filter(datos, function (registro){
                return registro[columna] == filtrar && registro[columnaValidacion] == 'S';
            });
            $scope.actualizarTodos({registros: filtrados, seleccionado: valor, columna: columna});
        }
        /**
         * @ngdoc method
         * @name xpertysModulo.xsTabla#seleccionarTodosDatosTabla
         * @methodOf xpertysModulo.directive:xsTabla
         * @description Funcion que inicializa en true la bandera de
         * tablaCtrl.agregarRowFlag.
         */
        function seleccionarTodosDatosTabla(valor, datos, columna, columnaValidacion) {
            $log.info("Seleccionar Todos los Datos de la tabla que pueden.....> ");
            angular.forEach($scope.datos, function (dato, index) {
               if(dato.inhabilitar != 'S'){
                   dato[columna] = valor;
               }
               if((index + 1) == $scope.datos.length){
                   $scope.modificarRowRegistro();
               }
            });
        }

    }

    xsTabla.$inject = [];

    function xsTabla() {
        var directiva = {
            restrict: 'E',
            transclude: 'true',
            scope: {
                icono: '@',
                titulo: '@',
                tituloDetalle: '@?',
                config: '=',
                datos: '=',
                ocultar: '=?',
                ocultarBusqueda: '=?',
                ocultarex: '=?',
                registroSeleccionado: '=',
                seleccionarRegistro: '&',
                form: '=?',
                menus: '=?',
                ejecutarAccion: '&',
                accionAuditoria: '&',
                inicializarModal: '&?',
                agregarRowValor: '=?',
                agregarRowAccion: '&?',
                valAgregarRow: '&?',
                valMostrarAgregarRow: '&?',
                eliminarRowAccion: '&?',
                mdlA: '=?',
                mdlM: '=?',
                ocultarColumnas: '=?',
                detalleInterno: '=?',
                accionInsertar: '&?',
                accionModificar: '&?',
                accionEliminar: '&?',
                editarConsultar: '=?',
                ocultarMenuContexto: '=?',
                sinOrden: '=?',
                botonAccion: '&?',
                botonPersonalizado: '=?',
                botonTool: '=?',
                botonHabilitado: '=?',
                tablaFooter: '=?',
                valFooter: '=?',
                validaAccionTabla: "=?",
                menusSimples: "=?",
                contenedor: '=?',
                modificarRow: '=?',
                modificarRowRegistro: '&?',
                ocultarObs: '=?',
                mostrarBotonPersonalizado: '=?',
                botonSinClase: '=?',
                validarCheckBox: '=?',
                actualizarTodos: '&?',
                editarValidar: '=?',
                reducirBuscar: '=?',
                ocultarPaginacion: '=?',
                columnaOrdenar: '=?',
                mostraBusquedaMini: '=?',
                abrirModal: '&?'
            },
            controller: TablaControlador,
            controllerAs: 'tablaCtrl',
            templateUrl: 'Directivas/xsDirectivas/Componentes/xsTabla/xsTabla.html',
            link: funcionLink
        };

        return directiva;

        function funcionLink(scope, el, atrs, ctrl) {
            // Si la tabla tiene detalle en su "transcludo"
            if (atrs.ocultar) {
                atrs.ocultar = false;
            }
            ctrl.inicializar();
        }
    }
})();

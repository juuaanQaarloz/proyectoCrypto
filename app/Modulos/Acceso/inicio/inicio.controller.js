(function () {
    'use strict';
    angular
        .module('app')
        .controller('InicioControlador', InicioControlador);

    /* @ngInject */
    function InicioControlador($log, tblsServicios, $timeout, serviciosRest, alertasServicios, $filter) {
        /* jshint validthis: true */
        var inicioCtrl = this;

        /** Obtener configuracion de Tabla **/
        inicioCtrl.tblDatosCargados = tblsServicios.getTabla('tblsGenerales', 'tblDatosCargados');
        inicioCtrl.tblDatosSeguimiento = tblsServicios.getTabla('tblsGenerales', 'tblDatosSeguimiento');
        inicioCtrl.tblDatosSeguimientoJust = tblsServicios.getTabla('tblsGenerales', 'tblDatosSeguimiento');
        inicioCtrl.tblDatosJustificacion = tblsServicios.getTabla('tblsGenerales', 'tblDatosJustificacion');
        inicioCtrl.tblDatosSeguimientoJust.permisos.agregar = true;
        inicioCtrl.tblDatosSeguimientoJust.permisos.borrar = true;
        inicioCtrl.tblDatosSeguimientoJust.permisos.modificar = true;

        /** Variables, Listas, Objetos, banderas **/
        inicioCtrl.bndInicio = true;
        inicioCtrl.planillaAlumnos = 'Modulos/Acceso/inicio/platilla/plantillaAsistencia.xlsx';
        inicioCtrl.profesor = {};
        inicioCtrl.profesor.nombre = 'JUAN CARLOS NUTE HERNANDEZ';
        inicioCtrl.profesor.idProfesor = 1;
        var colores = ['#2283C1', '#509B11', '#A19E05', '#A13705', '#BB1903', '#03B5BB', '#0361BB', '#5E30B2', '#B230AE', '#A1133C'];

        inicioCtrl.mdlAddJustificacion = 'Modulos/Acceso/inicio/modals/mdlAddJustificacion.html';
        inicioCtrl.mdlDelJustificacion = 'Modulos/Acceso/inicio/modals/mdlDelJustificacion.html';
        inicioCtrl.mdlUpdJustificacion = 'Modulos/Acceso/inicio/modals/mdlUpdJustificacion.html';

        /** Configuracion de Datepicker */

        inicioCtrl.opcionesMenu = [
            {idOpcion: 'C', opcion: 'Carga Asistencia Excel', descripcion: 'Con un archivo excel se subira la asistencia de los alumnos'},
            {idOpcion: 'S', opcion: 'Seguimiento de Asistencia', descripcion: 'Analisis de la asistencia del grupo y materia'},
            {idOpcion: 'J', opcion: 'Justificacion de Faltas', descripcion: 'Solo para Justificacion de Faltas a alumnos'},
        ];

        inicioCtrl.clases = [
            {idClase: 1, nombre: 'Programación Orientada a Objetos'},
            {idClase: 2, nombre: 'Programación WEB'},
        ];

        /** Funciones del Controlador **/
        activarControlador();
        inicioCtrl.login = login;
        inicioCtrl.logout = logout;
        inicioCtrl.seleccionarOpcion = seleccionarOpcion;
        inicioCtrl.seleccionarOpcionMenu = seleccionarOpcionMenu;
        inicioCtrl.numeroIndexAleatorio = numeroIndexAleatorio;

        inicioCtrl.limpiarCarga = limpiarCarga;
        inicioCtrl.cargarArchivo = cargarArchivo;
        inicioCtrl.confirmarAsistencia = confirmarAsistencia;

        inicioCtrl.buscarSeguimiento = buscarSeguimiento;
        inicioCtrl.limpiarBuscar = limpiarBuscar;
        inicioCtrl.seleccionarSeguimiento = seleccionarSeguimiento;

        inicioCtrl.buscarSeguimientoJustificacion = buscarSeguimientoJustificacion;
        inicioCtrl.limpiarBuscarJustificar = limpiarBuscarJustificar;
        inicioCtrl.seleccionarJustificacion = seleccionarJustificacion;
        inicioCtrl.abrirModalAgregar = abrirModalAgregar;
        inicioCtrl.abrirModalMod = abrirModalMod;
        inicioCtrl.abrirModalEliminar = abrirModalEliminar;
        inicioCtrl.crudJustificacion = crudJustificacion;
        inicioCtrl.buscarJustificacionByIdCRUD = buscarJustificacionByIdCRUD;
        inicioCtrl.seleccionarJustificacionCRUD = seleccionarJustificacionCRUD;
        inicioCtrl.noHaCambiado = noHaCambiado;

        function activarControlador() {
            angular.forEach(inicioCtrl.opcionesMenu, function (resp) {
                var numero = numeroIndexAleatorio();
                $timeout(function () {
                    resp.color = colores[numero];
                });
            });
            limpiarBuscar();
            limpiarBuscarJustificar();
            limpiarCarga(true);
        }

        function numeroIndexAleatorio() {
            return Math.floor((Math.random() * 11));
        }

        function login() {
            console.log("Esta entrando al metodo de Login");
            var parametros = {
                usuario: inicioCtrl.usuario,
                contrasenia: inicioCtrl.contrasenia
            }
            var promesa = serviciosRest.login(parametros).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length>0){
                    inicioCtrl.bndInicio = false;
                    inicioCtrl.profesor = respuesta[0];
                    alertasServicios.desplegarInfo("Bienvenido Profesor: " + inicioCtrl.profesor.nombre);
                }
            });
            promesa.catch(function (error) {
             alertasServicios.desplegarError(error);
            });
        }

        function seleccionarOpcion(opcion) {
            console.log("Esta entrando al metodo de seleccionarOpcion");
            inicioCtrl.opcionSeleccionada = null;
            $timeout(function () {
                inicioCtrl.opcionSeleccionada = opcion;
            })
        }

        function seleccionarOpcionMenu(indOpcion, visualizar) {
            console.log("Esta entrando al metodo de seleccionarOpcionMenu");
            var opcion = _.filter(inicioCtrl.opcionesMenu, function (opcion) {
                return opcion.idOpcion == indOpcion;
            });
            if(opcion.length>0 && !visualizar){
                seleccionarOpcion(opcion[0]);
            } else if(visualizar){
                return opcion.length>0;
            }
        }


        /************** INICIO SECCION PARA PODER CARGAR ARCHIVO ****************/

        function cargarArchivo() {
            console.log("Esta entrando al metodo de cargarArchivo");
            var fd = new FormData();
            console.log($filter('fechaSimple')(inicioCtrl.fechaAsistencia));
            fd.append('file', inicioCtrl.archivo);
            fd.append('indConfirma', 'N');
            var promesaArchivo = serviciosRest.cargarAlumnosExcel(fd);
            promesaArchivo.then(function (respuesta) {
                console.log(respuesta);
                if(respuesta.data.length > 0) {
                    alertasServicios.desplegarSuccess("Se ha cargado la asistencia correctamente");
                    inicioCtrl.listaDatosCargado = respuesta.data;
                }
            });
            promesaArchivo.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            })
        }

        function confirmarAsistencia() {
            console.log("Esta entrando al metodo de confirmarAsistencia");
            var fd = new FormData();
            fd.append('indConfirma', "S");
            fd.append('file', inicioCtrl.archivo);
            fd.append('fecha', $filter('fechaSimple')(inicioCtrl.fechaAsistencia));
            fd.append('idProfesor', inicioCtrl.profesor.idProfesor);
            fd.append('materia', inicioCtrl.materia);
            var promesaArchivo = serviciosRest.cargarAlumnosExcel(fd);
            promesaArchivo.then(function (respuesta) {
                if(respuesta.data.length > 0) {
                    inicioCtrl.listaDatosCargado = [];
                    alertasServicios.desplegarSuccess("Se ha confirmado la asistencia correctamente");
                    limpiarCarga()
                }
            });
            promesaArchivo.catch(function (error) {
                alertasServicios.desplegarMensaje(error);
            })
        }

        function limpiarCarga(bnd) {
            console.log("Esta entrando al metodo de limpiarBusqueda");
            inicioCtrl.fechaAsistencia = null;
            inicioCtrl.materia = null;
            inicioCtrl.archivo = null;
            inicioCtrl.listaDatosCargado = [];
            if(!bnd)
                inicioCtrl.limpiarArchivo();
        }

        /************** FIN SECCION PARA PODER CARGAR ARCHIVO ****************/



        /************** INICIO SECCION SECCION SEGUIMIENTO ****************/

        function buscarSeguimiento() {
            console.log("Esta entrando al metodo de buscarSeguimiento");
            inicioCtrl.seguimiento = [];
            var parametros = {
                pnIdProfesor: inicioCtrl.profesor.idProfesor,
                pcMateria: inicioCtrl.materiaSeg,
                pcFechaAsistencia: $filter('fechaSimple')(inicioCtrl.fecAsistencia),
                pcMatriculaAlumno: inicioCtrl.matricula
            }
            var promesa = serviciosRest.searchSeguimiento(parametros).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length>0){
                    inicioCtrl.seguimiento = respuesta;
                } else alertasServicios.desplegarMensaje("No existen registros con los parametros ingresados");
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarError(error);
            });
        }

        function limpiarBuscar() {
            inicioCtrl.materiaSeg = null;
            inicioCtrl.fecAsistencia = null;
            inicioCtrl.indAsistio = null;
            inicioCtrl.seguimientoSeleccionado = null;
            inicioCtrl.seguimiento = [];
        }

        function seleccionarSeguimiento(row) {
            inicioCtrl.seguimientoSeleccionado = row;
            buscarJustificacionById(row.idAsistencia);
        }

        function buscarJustificacionById(idAsistencia) {
            console.log("Esta entrando al metodo de buscarJustificacion");
            inicioCtrl.seguimientoJustificacion = [];
            var parametros = {
                pnIdAsitencia: idAsistencia
            };
            var promesa = serviciosRest.searchJustificacion(parametros).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length>0){
                    inicioCtrl.seguimientoJustificacion = respuesta;
                }
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarError(error);
            });
        }

        /************** FIN SECCION SECCION SEGUIMIENTO ****************/


        /************** INICIO SECCION SECCION JUSTIFICACIONES ****************/

        function buscarSeguimientoJustificacion() {
            console.log("Esta entrando al metodo de buscarSeguimiento");
            inicioCtrl.justificacionSeguimiento = [];
            var parametros = {
                pnIdProfesor: inicioCtrl.profesor.idProfesor,
                pcMateria: inicioCtrl.materiaJustificacion,
                pcFechaAsistencia: $filter('fechaSimple')(inicioCtrl.fecAsistenciaJust),
                pcMatriculaAlumno: inicioCtrl.matriculaJustificacion,
                pcIndAsitencia: 'N'
            }
            var promesa = serviciosRest.searchSeguimiento(parametros).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length>0){
                    inicioCtrl.justificacionSeguimiento = respuesta;
                } else alertasServicios.desplegarMensaje("No existen registros con los parametros ingresados");
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarError(error);
            });
        }

        function buscarJustificacionByIdCRUD(idAsistencia) {
            console.log("Esta entrando al metodo de buscarJustificacion");
            inicioCtrl.justificacionCRUD = [];
            var parametros = {
                pnIdAsitencia: idAsistencia
            };
            var promesa = serviciosRest.searchJustificacion(parametros).$promise;
            promesa.then(function (respuesta) {
                if(respuesta.length>0){
                    inicioCtrl.justificacionCRUD = respuesta;
                }
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarError(error);
            });
        }

        function limpiarBuscarJustificar() {
            inicioCtrl.materiaJustificacion = null;
            inicioCtrl.fecAsistenciaJust = null;
            inicioCtrl.matriculaJustificacion = null;
            inicioCtrl.matriculaJustificacion = null;
            inicioCtrl.justificacion = [];
        }

        function seleccionarJustificacion(row) {
            inicioCtrl.justificacionSeleccionado = row;
            inicioCtrl.justificacionCRUD = [];
            buscarJustificacionByIdCRUD(inicioCtrl.justificacionSeleccionado.idAsistencia);
        }
        function seleccionarJustificacionCRUD(row) {
            inicioCtrl.justificaCRUDSeleccionado = row;
            inicioCtrl.justificaCRUDEditable = angular.copy(inicioCtrl.justificaCRUDSeleccionado);
        }

        function abrirModalAgregar() {
            inicioCtrl.nuevoJustificacion = {};
            inicioCtrl.nuevoJustificacion.autorizado = null;
            angular.element('#mdlAddJustificacion').modal('show');
        }
        function abrirModalMod() {
            angular.element('#mdlUpdJustificacion').modal('show');
        }
        function abrirModalEliminar() {
            angular.element('#mdlDelJustificacion').modal('show');
        }

        function noHaCambiado() {
            return !angular.equals(inicioCtrl.justificaCRUDEditable, inicioCtrl.justificaCRUDSeleccionado);
        }

        function crudJustificacion(tipo) {
            var parametros = {};
            parametros.pcAccion = tipo;
            if(tipo == 'INSERT'){
                parametros.idAsistencia = inicioCtrl.justificacionSeleccionado.idAsistencia;
                parametros.matricula = inicioCtrl.justificacionSeleccionado.matricula;
                parametros.nombreAlumno = inicioCtrl.justificacionSeleccionado.nombreAlumno;
                parametros.indAsistencia = inicioCtrl.justificacionSeleccionado.indAsistencia;
                parametros.idProfesor = inicioCtrl.justificacionSeleccionado.idProfesor;
                parametros.fechaAsistencia = inicioCtrl.justificacionSeleccionado.fechaAsistencia;
                parametros.materia = inicioCtrl.justificacionSeleccionado.materia;
                parametros.motivo = inicioCtrl.nuevoJustificacion.motivo;
                parametros.autorizado = inicioCtrl.nuevoJustificacion.autorizado;
            } else if(tipo == 'DELETE'){
                parametros.idJustificacion = inicioCtrl.justificaCRUDEditable.idJustificacion;
            } else if(tipo == 'UPDATE'){
                parametros.idJustificacion = inicioCtrl.justificaCRUDEditable.idJustificacion;
                parametros.motivo = inicioCtrl.justificaCRUDEditable.motivo;
                parametros.autorizado = inicioCtrl.justificaCRUDEditable.autorizado;
            }
            var promesa = serviciosRest.crudJustificacion(parametros).$promise;
            promesa.then(function (respuesta) {
                inicioCtrl.justificaCRUDSeleccionado = null;
                buscarJustificacionByIdCRUD(inicioCtrl.justificacionSeleccionado.idAsistencia);
                angular.element('#mdlAddJustificacion').modal('hide');
                angular.element('#mdlUpdJustificacion').modal('hide');
                angular.element('#mdlDelJustificacion').modal('hide');
            });
            promesa.catch(function (error) {
                alertasServicios.desplegarError(error);
            });

        }

        /************** FIN SECCION SECCION JUSTIFICACIONES ****************/

        function logout() {
            inicioCtrl.usuario = null;
            inicioCtrl.contrasenia = null;
            inicioCtrl.profesor = null;
            limpiarBuscar();
            limpiarBuscarJustificar();
            limpiarCarga(true);
            $timeout(function () {
                alertasServicios.desplegarInfo("Acaba de Cerrar Sesión Correctamente");
                inicioCtrl.bndInicio = true;
            });
        }

    }
})();

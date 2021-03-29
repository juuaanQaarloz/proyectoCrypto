(function () {
    /**
     * Craeted by ADOM 04/01/2017
     */
    'use strict';

    angular.module('app').factory('tablaServicios', tablaServicios);
    tablaServicios.$inject = ['$log', '$translate', '$filter'];

    /* @ngInject */
    function tablaServicios($log, $translate, $filter) {


        var servicios = {
            crearTabla: crearTabla,
            agregarHeaders: agregarHeaders,
            crearCabecerasColumnas: crearCabecerasColumnas,
            llenarTabla: llenarTabla,
            anadirContenedor: anadirContenedor,
            anadirTablaFooter: anadirTablaFooter
        };

        return servicios;

        /**
         * @ngdoc function
         * @name crearTabla
         * @module eAspayb
         *
         * @param style (Style general para la tabla)
         *
         * @description Funcion que genera un elemento html{Table} y
         * agrega estilos a la misma.
         */
        function crearTabla(style) {
            var tabla = document.createElement('table');
            if (style) {
                var styles = style.split("|");
                if (styles.length > 0) {
                    angular.forEach(styles, function (sty) {
                        var style = sty.split(":");
                        tabla.style[style[0].trim()] = style[1];
                    });
                }
            }
            return tabla;
        }

        /**
         * @ngdoc function
         * @name agregarHeaders
         * @module eAspayb
         *
         * @param tabla (Elemento html table)
         * @param headers (Array de los elementos que encabezaran la tabla )
         *
         * @description Funcion que genera un thead para la tabla recibida
         * y la llena con los valores recibidos
         *
         *  var header = [
         {etiqueta:'NOMBRE',valor: "nombre asesor", colspan: 3},
         {etiqueta:'GENERADO',valor: usuarioSesion.nombre, colspan: 3},
         {etiqueta: 'EDOCTA', colspan: 3, stylecol: stylecol},

         ];
         *
         */
        function agregarHeaders(tabla, headers) {

            var tabla = tabla;
            var header = tabla.createTHead();

            if (headers) {
                angular.forEach(headers, function (element) {

                    var row = tabla.insertRow();

                    if (element.rowspan != null || element.rowspan != undefined) {
                        row.rowSpan = element.rowspan;
                    }

                    if (element.stylerow) {
                        var styles = element.stylerow.split("|");
                        if (element.stylerow.length > 0) {
                            angular.forEach(styles, function (sty) {
                                var style = sty.split(":");
                                cell1.style[style[0].trim()] = style[1];
                            });
                        }
                    }

                    var cell1 = row.insertCell();
                    if (element.colspan != null || element.rowspan != undefined) {
                        cell1.colSpan = element.colspan;
                    }

                    if (element.stylecol) {
                        var styles = element.stylecol.split("|");
                        if (styles.length > 0) {
                            angular.forEach(styles, function (sty) {
                                var style = sty.split(":");
                                cell1.style[style[0].trim()] = style[1];
                            });
                        }
                    }

                    if (element.etiqueta && element.valor) {
                        cell1.innerHTML = $filter('translate')(element.etiqueta) + " : " + element.valor;
                    }
                    else if (element.etiqueta && !element.valor) {
                        cell1.innerHTML = $filter('translate')(element.etiqueta);
                    } else {
                        cell1.innerHTML = element.valor;
                    }
                });
            }

            tabla.insertRow();

            return tabla;
        }


        /**
         * @ngdoc function
         * @name crearCabecerasColumnas
         * @module eAspayb
         *
         * @param tabla (Elemento html table)
         * @param columnas (Array de los elementos que encabezaran la tabla )
         * @param style (Estilo para las cabeceras de la tabla )
         *
         * @description Funcion que genera un thead para la tabla recibida
         * y la llena con los valores recibidos
         *
         * var columnas = [
         *              {llave: 'totalMtoComisionesValidadas', etiqueta: 'TOTALCOMVALIDADAS', filtro: 'currency'},
         *              {llave: 'totalMtoComisionesNoValidadas', etiqueta: 'TOTALCOMNOVALIDADAS', filtro: 'currency'},
         *              {llave: 'totalMtoComisiones', etiqueta: 'TOTALCOMISIONES', filtro: 'currency'}
         *];
         *
         *var styleHeader = 'background: rgb(0,128,0) | color:white | text-align:center | font-weight: normal !important;';
         *
         */
        function crearCabecerasColumnas(tabla, columnas, style) {
            var tabla = tabla;
            var row = tabla.insertRow();

            angular.forEach(columnas, function (columna) {
                var cell1 = row.insertCell();
                if (columna.etiqueta) {
                    cell1.innerHTML = $filter('translate')(columna.etiqueta);
                } else {
                    cell1.innerHTML = columna.valor;
                }

                if (style) {
                    var styles = style.split("|");
                    if (styles.length > 0) {
                        angular.forEach(styles, function (style) {
                            var sty = style.split(":");
                            cell1.style[sty[0].trim()] = sty[1];
                        });
                    }
                }
            });
            return tabla;
        }


        /**
         * @ngdoc function
         * @name llenarTabla
         * @module eAspayb
         *
         * @param tabla (Elemento html table)
         * @param columnas (Array de los elementos que encabezaran la tabla )
         * @param datos (Array de los elementos que se insertaran en la tabla )
         * @param style (Estilo para los rows de los registros de la tabla )
         *
         * @description Funcion que se encarga de insertar un row por cada elemnto y
         * generar un cell por cada columna para cada elemento
         *
         * var datosFooter = [{
         *      totalMtoComisionesValidadas: cfgComValidarCtrl.totalMtoComisionesValidadas,
         *      totalMtoComisionesNoValidadas: cfgComValidarCtrl.totalMtoComisionesNoValidadas,
         *     totalMtoComisiones: cfgComValidarCtrl.totalMtoComisiones
         *  }];
         *
         * var columnas = [
         *                  {llave: 'totalMtoComisionesValidadas', etiqueta: 'TOTALCOMVALIDADAS', filtro: 'currency'},
         *                  {llave: 'totalMtoComisionesNoValidadas', etiqueta: 'TOTALCOMNOVALIDADAS', filtro: 'currency'},
         *                  {llave: 'totalMtoComisiones', etiqueta: 'TOTALCOMISIONES', filtro: 'currency'}
         * ];
         *
         * var stylerow = 'border:thin solid black';
         */
        function llenarTabla(tabla, columnas, datos, stylerow) {

            var tabla = tabla;

            angular.forEach(datos, function (dato) {
                var row = tabla.insertRow();

                angular.forEach(columnas, function (columna) {

                    var cell1 = row.insertCell();

                    if (columna.filtro) {
                        cell1.innerHTML = $filter(columna.filtro)(dato[columna.llave]);
                    } else {
                        cell1.innerHTML = dato[columna.llave];
                    }

                    if (stylerow) {
                        var styles = stylerow.split("|");
                        if (styles.length > 0) {
                            angular.forEach(styles, function (sty) {
                                var style = sty.split(":");
                                cell1.style[style[0].trim()] = style[1];
                            });
                        }
                    }
                });
            });

            tabla.insertRow();
            return tabla;
        }

        /**
         * @ngdoc function
         * @name anadirContenedor
         * @module eAspayb
         *
         * var clase="col-sm-4 pull-right"
         * var style = 'background: rgb(0,128,0) | color:white | text-align:center | font-weight: normal !important;';
         *
         */

        function anadirContenedor(tabla, clase, style) {

            var contenedor = document.createElement('div');

            if (clase) {
                contenedor.className = clase;
            }

            if (style) {
                var styles = style.split("|");
                if (styles.length > 0) {
                    angular.forEach(styles, function (sty) {

                        var style = sty.split(":");
                        contenedor.style[style[0].trim()] = style[1];
                    });
                }
            }
            contenedor.append(tabla);
            return contenedor;
        }

        /**
         * @param tabla
         * @param tablaFooter
         * @returns {*}
         *
         * Recibe dos elementos html y el segundo lo posicionara debajo del primero
         */
        function anadirTablaFooter(tabla, tablaFooter) {
            var tabla = tabla;
            tabla.append(tablaFooter);
            return tabla;
        }
    }
})();

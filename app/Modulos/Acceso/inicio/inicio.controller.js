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

        /** Variables, Listas, Objetos, banderas **/
        inicioCtrl.indCodificar = 'N';

        /** Configuracion de Datepicker */
        inicioCtrl.cbxTiposCrypto = {
            placeholder: "Seleccione",
            dataTextField: "nombre",
            dataValueField: "id"
        };

        inicioCtrl.tiposCrypto = [
            {id: 1, nombre: 'Algoritmo de César'},
            {id: 2, nombre: 'Algoritmo ROT13'},
            {id: 3, nombre: 'Algoritmo ROT47'},
            {id: 4, nombre: 'Sustitución por clave (Vigénere)'},
            {id: 5, nombre: 'Transposición'}
        ];

        inicioCtrl.rot13 = ['A','B','C','D','E','F','G','H','I','J','K','L','M'];
        inicioCtrl.rot131 = ['N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var abecedario = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        inicioCtrl.vigenere = [
            ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            ['B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A'],
            ['C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B'],
            ['D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C'],
            ['E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D'],
            ['F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E'],
            ['G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F'],
            ['H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G'],
            ['I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H'],
            ['J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I'],
            ['K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J'],
            ['L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K'],
            ['M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L'],
            ['N','O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M'],
            ['O','P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N'],
            ['P','Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'],
            ['Q','R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'],
            ['R','S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'],
            ['S','T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'],
            ['T','U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S'],
            ['U','V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'],
            ['V','W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U'],
            ['W','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V'],
            ['X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W'],
            ['Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X'],
            ['Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y']

        ];
        inicioCtrl.rot47 = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
        var matriz = [];
        inicioCtrl.sustitucionClave = matriz;
        inicioCtrl.errorCadena = null;

        /** Funciones del Controlador **/
        activarControlador();
        inicioCtrl.limpiarDatos = limpiarDatos;
        inicioCtrl.codificar = codificar;
        inicioCtrl.descodificar = descodificar;

        function activarControlador() {

        }

        function codificar() {
            inicioCtrl.resultado = null;
            inicioCtrl.errorCadena = null;
            if(inicioCtrl.tipoCrypto == 1) {
                cesar(true);
            } else if(inicioCtrl.tipoCrypto == 2) {
                algoritmoROT13();
            } else if(inicioCtrl.tipoCrypto == 3) {
                algoritmoROT47();
            } else if(inicioCtrl.tipoCrypto == 4) {
                vigenere();
            } else if(inicioCtrl.tipoCrypto == 5) {
                transposicion();
            }
        }

        function descodificar() {
            inicioCtrl.resultado = null;
            inicioCtrl.errorCadena = null;
            if(inicioCtrl.tipoCrypto == 1) {
                cesar();
            } else if(inicioCtrl.tipoCrypto == 2) {
                algoritmoROT13();
            } else if(inicioCtrl.tipoCrypto == 3) {
                algoritmoROT47();
            } else if(inicioCtrl.tipoCrypto == 4) {
                vigenere(true);
            } else if(inicioCtrl.tipoCrypto == 5) {
                transposicion(true);
            }
        }

        function limpiarDatos(bnd) {
            inicioCtrl.resultado = null;
            if (bnd) {
                inicioCtrl.cadenaCodificar = null;
                inicioCtrl.indCodificar = 'N';
                inicioCtrl.clave = null;
                inicioCtrl.valorN = null;
                inicioCtrl.permutaciones = null;
            } else {
                inicioCtrl.cadenaCodificar = null;
                inicioCtrl.tipoCrypto = null;
                inicioCtrl.indCodificar = 'N';
                inicioCtrl.clave = null;
                inicioCtrl.valorN = null;
                inicioCtrl.permutaciones = null;
            }
        }

        function cesar(cifrar) {
            var rotaciones = (cifrar?3:-3);

            var LONGITUD_ALFABETO = 26, INICIO_MINUSCULAS = 97, INICIO_MAYUSCULAS = 65;
            var cadenaRotada = "";
            var abecedarioCopy = angular.copy(abecedario);
            for (var x = 0; x < inicioCtrl.cadenaCodificar.length; x++) {
                var caracterActual = inicioCtrl.cadenaCodificar.charAt(x);
                if (!isNaN(caracterActual)) {
                    cadenaRotada = cadenaRotada + "" + caracterActual;
                } else {
                    var codigoAsciiDeCaracterActual = caracterActual.charCodeAt(0);
                    var esMayuscula = (caracterActual === angular.uppercase(caracterActual));
                    var nuevaPosicionEnAlfabeto = ((codigoAsciiDeCaracterActual - (esMayuscula ? INICIO_MAYUSCULAS : INICIO_MINUSCULAS)) + rotaciones) % LONGITUD_ALFABETO;
                    if (nuevaPosicionEnAlfabeto < 0) nuevaPosicionEnAlfabeto += LONGITUD_ALFABETO;
                    var nuevaPosicionAscii = (esMayuscula ? INICIO_MAYUSCULAS : INICIO_MINUSCULAS) + nuevaPosicionEnAlfabeto;
                    cadenaRotada = cadenaRotada + "" + String.fromCharCode(nuevaPosicionAscii);
                }
            }
            $timeout(function () {
                inicioCtrl.resultado = cadenaRotada;
            });
        }

        function algoritmoROT13() {
            var resultado = "";
            angular.forEach(inicioCtrl.cadenaCodificar, function (caracter, index) {
               var indexCad = _.findIndex(inicioCtrl.rot13, function (rotCaduno) {
                    return rotCaduno == caracter;
               });
               if(indexCad >= 0){
                   resultado += inicioCtrl.rot131[indexCad];
               } else {
                   var indexCadD = _.findIndex(inicioCtrl.rot131, function (rotCadDos) {
                       return rotCadDos == caracter;
                   });
                   if(indexCadD >= 0){
                       resultado += inicioCtrl.rot13[indexCadD];
                   }
               }

               if((index+1) == inicioCtrl.cadenaCodificar.length){
                   inicioCtrl.resultado = resultado;
               }

            });
        }

        function algoritmoROT47() {
            var R = "";
            var i, j, c, len = inicioCtrl.rot47.length;
            for(i = 0; i < inicioCtrl.cadenaCodificar.length; i++) {
                c = inicioCtrl.cadenaCodificar.charAt(i);
                j = inicioCtrl.rot47.indexOf(c);
                if (j >= 0) {
                    c = inicioCtrl.rot47.charAt((j + len / 2) % len);
                }
                R += c;
            }
            $timeout(function () {
                inicioCtrl.resultado = R;
            });
        }
        
        function vigenere(desencriptar) {

            var keyStr = inicioCtrl.clave; //inicioCtrl.cadenaCodificar;
            var keyArray = filterKey(keyStr);

            if (desencriptar) {
                for (var i = 0; i < keyArray.length; i++)
                    keyArray[i] = (26 - keyArray[i]) % 26;
            }

            var output = "";
            for (var i = 0, j = 0; i < inicioCtrl.cadenaCodificar.length; i++) {
                var c = inicioCtrl.cadenaCodificar.charCodeAt(i);
                if (isUppercase(c)) {
                    output += String.fromCharCode((c - 65 + keyArray[j % keyArray.length]) % 26 + 65);
                    j++;
                } else if (isLowercase(c)) {
                    output += String.fromCharCode((c - 97 + keyArray[j % keyArray.length]) % 26 + 97);
                    j++;
                } else {
                    output += inicioCtrl.cadenaCodificar.charAt(i);
                }
            }
            inicioCtrl.resultado = output;
        }

        function filterKey(key) {
            var result = [];
            for (var i = 0; i < key.length; i++) {
                var c = key.charCodeAt(i);
                if (isLetter(c))
                    result.push((c - 65) % 32);
            }
            return result;
        }

        function isLetter(c) {
            return isUppercase(c) || isLowercase(c);
        }

        function isUppercase(c) {
            return 65 <= c && c <= 90;
        }

        function isLowercase(c) {
            return 97 <= c && c <= 122;
        }

        function transposicion(descifrar) {
            inicioCtrl.resultado = null;

            if(descifrar) {
                var columnas = Math.floor((inicioCtrl.cadenaCodificar.length + 1 + (parseInt(inicioCtrl.posiciones.split(",")[0])) ) / inicioCtrl.clave);

                var posicionesOrdenadaUno = [];
                angular.forEach(inicioCtrl.posiciones.split(","), function (posicion) {
                    posicionesOrdenadaUno.push(posicion.trim());
                });

                $timeout(function () {
                    var posicionesOrdenada = posicionesOrdenadaUno.sort();

                    var plaintext = new Array(columnas);
                    var col = 0;
                    var row = 0;
                    angular.forEach(inicioCtrl.cadenaCodificar, function (caracter) {
                        if(!plaintext[row]) {
                            plaintext[row] = [];
                            plaintext[row].push(caracter);
                        } else {
                            plaintext[row].push(caracter);
                        }
                        col++;
                        if(col == columnas){
                            row++;
                            col = 0;
                        }
                    });


                    $timeout(function () {
                        var cadenas = "";
                        var count = 0;
                        var caracterCout = 0;

                        angular.forEach(inicioCtrl.cadenaCodificar, function (caracterCodi) {
                            var index = _.findIndex(inicioCtrl.posiciones.split(","), function (posicion) {
                                return posicion.trim() == posicionesOrdenada[caracterCout].trim();
                            });
                            if(index>-1){
                                var paso = plaintext[index];
                                if(paso[count]){
                                    cadenas += paso[count];
                                    if(caracterCout == (plaintext.length-1)) {
                                        count++;
                                        caracterCout = 0;
                                    } else {
                                        caracterCout++;
                                    }
                                }
                            }
                        });

                        /*angular.forEach(inicioCtrl.cadenaCodificar, function (caracterCodi) {
                            angular.forEach(posicionesOrdenada, function (caracter) {
                                var index = _.findIndex(inicioCtrl.posiciones.split(","), function (posicion) {
                                    return caracter.trim() == posicion.trim();
                                });

                                if(index>-1){
                                    var paso = plaintext[index];
                                    if(paso[count]){
                                        cadenas += paso[count];
                                        if(caracterCout == (plaintext.length-1)) {
                                            count++;
                                            caracterCout = 0;
                                        } else {
                                            caracterCout++;
                                        }
                                    }
                                }

                            });
                        });*/

                        inicioCtrl.resultado = cadenas;
                    });

                });

            } else {
                //var claves = "2, 3, 4, 5, 6, 7";

                var claves = angular.copy(inicioCtrl.posiciones);

                var semanas = [];
                //var diaInicioSemanaMes = parseInt(inicioCtrl.posiciones.split(",")[0]);
                var diaInicioSemanaMes = 0;
                var diasSemana = [];
                if(diaInicioSemanaMes > 1) {
                    for(var j = 0; j <= diaInicioSemanaMes - 1 ;j++) {
                        diasSemana.push( "" )
                    }
                }
                else if(diaInicioSemanaMes == 1){
                    diasSemana.push( "" )
                }
                var count = diasSemana.length + 1;
                angular.forEach(inicioCtrl.cadenaCodificar, function (dia, index) {
                    if(diasSemana.length == 0){
                        diasSemana.push( (dia == " "?'&nbsp;':dia) );
                        if(count == inicioCtrl.clave) {
                            semanas.push(diasSemana);
                            diasSemana = [];
                            count = 0;
                        } else if (((index+1) == inicioCtrl.cadenaCodificar.length)){
                            semanas.push(diasSemana);
                            diasSemana = [];
                            count = 0;
                        }
                    }
                    else {
                        if(count > diasSemana.length) {
                            diasSemana.push( (dia == " "?'&nbsp;':dia) );
                            if(count == inicioCtrl.clave) {
                                semanas.push(diasSemana);
                                diasSemana = [];
                                count = 0;
                            } else if (((index+1) == inicioCtrl.cadenaCodificar.length)){
                                semanas.push(diasSemana);
                                diasSemana = [];
                                count = 0;
                            }
                        }
                    }
                    count++;
                });

                $timeout(function () {
                    for(var j = (semanas[semanas.length-1].length+1); j <= inicioCtrl.clave ;j++) {
                        semanas[semanas.length-1].push('&nbsp;')
                    }
                    var cadenaText = '';
                    angular.forEach(claves.split(","), function (valor) {
                        for (var i = 0; i < semanas.length; i++) {
                            var lista = semanas[i];
                            cadenaText += (lista[valor-1]?lista[valor-1]:"");
                        }
                    });
                    inicioCtrl.resultado = cadenaText;

                });
            }

        }
    }
})();

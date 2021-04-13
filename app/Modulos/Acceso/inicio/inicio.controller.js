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
                console.log("fdsfdsfdsfdf");
                console.log(typeof caracterActual === 'number');
                console.log(isNaN(caracterActual));
                console.log("fdsfdsfdsfdf");
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

        function transposicion() {

            var claves = "2, 3, 4, 5, 6, 7";
            //var claves = inicioCtrl.posiciones;

            var claveOrdenada = claves.split(",").sort();

            console.log(claveOrdenada);

            angular.forEach(claveOrdenada, function (clave, index) {
                if( clave.trim() != (index+1)){
                    console.log("La clave no tiene números consecutivos: ejemplo 1: {1, 2, 3, 4, 5 }, ejemplo 2: { 10, 7 , 8, 2, 3, 4, 5, 1, 6, 9 }");
                    inicioCtrl.errorCadena = "La clave no tiene números consecutivos {" + claveOrdenada + "}";
                    inicioCtrl.errorCadenaDos = "Ejemplos: a: {1, 2, 3, 4, 5 }, b: { 10, 7 , 8, 2, 3, 4, 5, 1, 6, 9 }, c: { 8, 2, 3, 4, 5, 1, 6, 7 }";
                }
            })
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
            return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
        }

        function isLowercase(c) {
            return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
        }


    }
})();

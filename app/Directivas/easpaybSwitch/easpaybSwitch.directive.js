(function () {
    angular
        .module('xsModulo')
        .directive('easpaybSwitchDirective', easpaybSwitchDirective)
        .controller('easpaybSwitch', easpaybSwitch);

    easpaybSwitch.$inject = ['$log', '$scope', '$timeout', '$filter'];
    function easpaybSwitch($log, $scope, $timeout, $filter) {

        var easpaybSwitchCtrl = this;


        easpaybSwitchCtrl.mostrarSwitch = false;
        easpaybSwitchCtrl.valorDeSwitch = true;
        easpaybSwitchCtrl.tamanioSwitch = 0;

        /** Funcion publica de la direciva */
        easpaybSwitchCtrl.clickSwitch = clickSwitch;
        $scope.inicializarSwitch = inicializarSwitch;
        activarDirectiva();


        function activarDirectiva() {
            $log.info('Entra al metodo activarDirectiva() de la directiva easpaybSwitchDirective');
            easpaybSwitchCtrl.mostrarboton = false;
            $scope.valorSwitch = ($scope.valorOn ? $scope.valorOn : true);
            var tamanioTotal = 0;
            if (!$scope.ancho) {
                var lOn = angular.copy($scope.labelOn);
                var lOff = angular.copy($scope.labelOff);
                var labelOnTranslate = $filter('translate')(lOn);
                var labelOffTranslate = $filter('translate')(lOff);
                var tamanio = (labelOnTranslate ? labelOnTranslate.length : 3);
                var labelOff = (labelOffTranslate ? labelOffTranslate.length : 3);
                if ($scope.labelOff && (labelOff > tamanio))
                    tamanio = (labelOff);
                if ($scope.iconOn || $scope.iconOff) {
                    if ($scope.labelOn || $scope.labelOff)
                        tamanio += 10;
                }
                tamanioTotal = tamanio < 10 ? parseInt((tamanio * 40)) : parseInt((tamanio * 20));
            } else tamanioTotal = $scope.ancho;
            easpaybSwitchCtrl.tamanioSwitch = tamanioTotal > 1030 ? 1030 : tamanioTotal;
            easpaybSwitchCtrl.marginIcono = ($scope.marginIcon ? $scope.marginIcon : 15);
            easpaybSwitchCtrl.marginIconoM2 = ($scope.marginLabel ? ($scope.marginLabel) : 14);
            easpaybSwitchCtrl.tamanioIcon = ($scope.tamanioIcon ? ($scope.tamanioIcon) : 25);
            //easpaybSwitchCtrl.altoSwitch = tamanioTotal>1030?64:34;
            if ($scope.soloBordes) {
                easpaybSwitchCtrl.altoSwitch = ($scope.alto ? $scope.alto : 50);
                easpaybSwitchCtrl.styleTamanioDta = {
                    "border": "3px solid" + ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn),
                    "color": ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn),
                    "border-radius": "30px 0 0 30px",
                    "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px"
                };
                easpaybSwitchCtrl.styleTamanioDato = {
                    "border": "3px solid" + ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff),
                    "color": ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff),
                    "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                    "border-radius": "0 30px 30px 0",
                    "opacity": "0.5"
                };
                $timeout(function () {
                    easpaybSwitchCtrl.styleTamanio = {
                        "width": easpaybSwitchCtrl.tamanioSwitch + "px",
                        "height": easpaybSwitchCtrl.altoSwitch + "px",
                        "background": ($scope.colorBackgroundConBordes && $scope.colorBackgroundConBordes.indexOf("#") > -1 ? $scope.colorBackgroundConBordes : "#" + $scope.colorBackgroundConBordes)
                    };
                    easpaybSwitchCtrl.mostrarSwitch = true;
                    $timeout(function () {
                        easpaybSwitchCtrl.mostrarboton = true;
                    }, 1200);
                }, 400);
            } else {
                easpaybSwitchCtrl.altoSwitch = ($scope.alto ? $scope.alto : 40);
                easpaybSwitchCtrl.styleTamanioDta = {
                    "color": "white",
                    "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                    "border-radius": "30px 0 0 30px",
                    "background": $scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn
                };
                easpaybSwitchCtrl.styleTamanioDato = {
                    "color": $scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn,
                    "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                    "background": "white",
                    "border-radius": "0 30px 30px 0"
                };
                $timeout(function () {
                    easpaybSwitchCtrl.styleTamanio = {
                        "width": easpaybSwitchCtrl.tamanioSwitch + "px",
                        "height": easpaybSwitchCtrl.altoSwitch + "px",
                        "background": $scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn
                    };
                    easpaybSwitchCtrl.mostrarSwitch = true;
                    $timeout(function () {
                        easpaybSwitchCtrl.mostrarboton = true;
                    }, 1200);
                }, 400);
            }
        }

        function clickSwitch(inicializa) {
            $log.info('Entra al metodo clickSwitch() de la directiva easpaybSwitchDirective');
            var valorDeSwitch = angular.copy(easpaybSwitchCtrl.valorDeSwitch);
            if (inicializa) valorDeSwitch = (inicializa == $scope.valorOn);
            else valorDeSwitch = !valorDeSwitch;


            $timeout(function () {
                if (!valorDeSwitch) {
                    if ($scope.soloBordes) {
                        easpaybSwitchCtrl.styleTamanio = {
                            "width": easpaybSwitchCtrl.tamanioSwitch + "px",
                            "height": easpaybSwitchCtrl.altoSwitch + "px",
                            "background": ($scope.colorBackgroundConBordes && $scope.colorBackgroundConBordes.indexOf("#") > -1 ? $scope.colorBackgroundConBordes : "#" + $scope.colorBackgroundConBordes)
                        };
                        easpaybSwitchCtrl.styleTamanioDato = {
                            "opacity": "0",
                            "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px"
                        };
                        easpaybSwitchCtrl.styleTamanioDta = {
                            "-webkit-transition": "-webkit-transform 0.8s cubic-bezier(0.86, 0, 0.07, 1)",
                            "transition": "transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                            "transform": "translate3d(" + ((easpaybSwitchCtrl.tamanioSwitch / 2) - 2) + "px, 0, 0)",
                            "border": "3px solid" + ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff),
                            "color": ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff),
                            "border-radius": "30px 30px 30px 30px",
                            "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px"
                        };
                        $timeout(function () {
                            easpaybSwitchCtrl.styleTamanioDta = {
                                "-webkit-transition": "-webkit-transform 0.8s cubic-bezier(0.86, 0, 0.07, 1)",
                                "transition": "transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                                "transform": "translate3d(" + ((easpaybSwitchCtrl.tamanioSwitch / 2) - 2) + "px, 0, 0)",
                                "border": "3px solid" + ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff),
                                "color": ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff),
                                "border-radius": "0 30px 30px 0",
                                "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px"
                            };
                            easpaybSwitchCtrl.styleTamanioDato = {
                                "transform": "translate3d(-" + ((easpaybSwitchCtrl.tamanioSwitch / 2) - 2) + "px, 0, 0)",
                                "border": "3px solid" + ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn),
                                "color": ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn),
                                "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                                "border-radius": "30px 0 0 30px",
                                "opacity": "0.5"
                            };
                        }, 750);
                    } else {
                        easpaybSwitchCtrl.styleTamanio = {
                            "width": easpaybSwitchCtrl.tamanioSwitch + "px",
                            "height": easpaybSwitchCtrl.altoSwitch + "px",
                            "background": "white",
                            "border": "2px solid " + ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff)
                        };
                        easpaybSwitchCtrl.styleTamanioDato = {
                            "opacity": "0",
                            "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                            "margin-top": "-2px"
                        };
                        easpaybSwitchCtrl.styleTamanioDta = {
                            "-webkit-transition": "-webkit-transform 0.8s cubic-bezier(0.86, 0, 0.07, 1)",
                            "transition": "transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                            "transform": "translate3d(" + ((easpaybSwitchCtrl.tamanioSwitch / 2) - 2) + "px, 0, 0)",
                            "color": "white",
                            "border-radius": "30px 30px 30px 30px",
                            "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                            "background": $scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff,
                            "margin-top": "-2px"
                        };
                        $timeout(function () {
                            easpaybSwitchCtrl.styleTamanioDta = {
                                "-webkit-transition": "-webkit-transform 0.8s cubic-bezier(0.86, 0, 0.07, 1)",
                                "transition": "transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                                "transform": "translate3d(" + ((easpaybSwitchCtrl.tamanioSwitch / 2) - 2) + "px, 0, 0)",
                                "color": "white",
                                "border-radius": "0 30px 30px 0",
                                "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                                "background": ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff)
                            };
                            easpaybSwitchCtrl.styleTamanioDato = {
                                "transform": "translate3d(-" + ((easpaybSwitchCtrl.tamanioSwitch / 2) - 2) + "px, 0, 0)",
                                "color": ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff),
                                "background": "white",
                                "border-radius": "30px 0 0 30px",
                                "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                                "opacity": "1",
                            };
                            easpaybSwitchCtrl.styleTamanio = {
                                "width": easpaybSwitchCtrl.tamanioSwitch + "px",
                                "height": easpaybSwitchCtrl.altoSwitch + "px",
                                "background": ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff)
                            };
                        }, 780);
                    }
                } else {
                    if ($scope.soloBordes) {
                        easpaybSwitchCtrl.styleTamanio = {
                            "width": easpaybSwitchCtrl.tamanioSwitch + "px",
                            "height": easpaybSwitchCtrl.altoSwitch + "px",
                            "background": ($scope.colorBackgroundConBordes && $scope.colorBackgroundConBordes.indexOf("#") > -1 ? $scope.colorBackgroundConBordes : "#" + $scope.colorBackgroundConBordes)
                        };
                        easpaybSwitchCtrl.styleTamanioDta = {
                            "-webkit-transition": "-webkit-transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                            "transition": "transform 0.8s cubic-bezier(0.86, 0, 0.07, 1)",
                            "transform": "translate3d(0, 0, 0)",
                            "border": "3px solid" + ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn),
                            "color": ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn),
                            "border-radius": "30px 30px 30px 30px",
                            "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px"
                        };
                        easpaybSwitchCtrl.styleTamanioDato = {
                            "opacity": "0",
                            "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px"
                        };
                        $timeout(function () {
                            easpaybSwitchCtrl.styleTamanioDta = {
                                "-webkit-transition": "-webkit-transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                                "transition": "transform 0.8s cubic-bezier(0.86, 0, 0.07, 1)",
                                "transform": "translate3d(0, 0, 0)",
                                "border": "3px solid" + ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn),
                                "color": ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn),
                                "border-radius": "30px 0 0 30px",
                                "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px"
                            };
                            easpaybSwitchCtrl.styleTamanioDato = {
                                "transform": "translate3d(" + ((easpaybSwitchCtrl.tamanioSwitch / 2) - 2) + ", 0, 0)",
                                "border": "3px solid" + ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff),
                                "color": ($scope.colorFondoOff && $scope.colorFondoOff.indexOf("#") > -1 ? $scope.colorFondoOff : "#" + $scope.colorFondoOff),
                                "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                                "border-radius": "0 30px 30px 0",
                                "opacity": "0.5"
                            };
                        }, 780);
                    } else {
                        easpaybSwitchCtrl.styleTamanio = {
                            "width": easpaybSwitchCtrl.tamanioSwitch + "px",
                            "height": easpaybSwitchCtrl.altoSwitch + "px",
                            "background": "white",
                            "border": "2px solid " + ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn)
                        };
                        easpaybSwitchCtrl.styleTamanioDta = {
                            "-webkit-transition": "-webkit-transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                            "transition": "transform 0.8s cubic-bezier(0.86, 0, 0.07, 1)",
                            "transform": "translate3d(0, 0, 0)",
                            "color": "white",
                            "border-radius": "30px 30px 30px 30px",
                            "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                            "background": $scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn,
                            "margin-top": "-2px"
                        };
                        easpaybSwitchCtrl.styleTamanioDato = {
                            "opacity": "0",
                            "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px"
                        };
                        $timeout(function () {
                            easpaybSwitchCtrl.styleTamanioDta = {
                                "-webkit-transition": "-webkit-transform 0.5s cubic-bezier(0.86, 0, 0.07, 1)",
                                "transition": "transform 0.8s cubic-bezier(0.86, 0, 0.07, 1)",
                                "transform": "translate3d(0, 0, 0)",
                                "color": "white",
                                "border-radius": "30px 0 0 30px",
                                "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                                "background": ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn)
                            };
                            easpaybSwitchCtrl.styleTamanioDato = {
                                "transform": "translate3d(" + ((easpaybSwitchCtrl.tamanioSwitch / 2)) + ", 0, 0)",
                                "opacity": "1",
                                "color": ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn),
                                "height": (easpaybSwitchCtrl.altoSwitch - 4) + "px",
                                "background": "white",
                                "border-radius": "0 30px 30px 0",
                            };
                            easpaybSwitchCtrl.styleTamanio = {
                                "width": easpaybSwitchCtrl.tamanioSwitch + "px",
                                "height": easpaybSwitchCtrl.altoSwitch + "px",
                                "background": ($scope.colorFondoOn && $scope.colorFondoOn.indexOf("#") > -1 ? $scope.colorFondoOn : "#" + $scope.colorFondoOn)
                            };
                        }, 780);
                    }
                }
                $timeout(function () {
                    var respuesta = (valorDeSwitch ? ($scope.valorOn ? $scope.valorOn : valorDeSwitch) : ($scope.valorOff ? $scope.valorOff : valorDeSwitch));
                    $scope.valorSwitch = respuesta;
                    if (!inicializa)
                        $scope.seleccionoValorSwitch({valor: respuesta});
                    easpaybSwitchCtrl.valorDeSwitch = valorDeSwitch;
                });

            });
        }

        function inicializarSwitch(dato) {
            $log.info('Entra al metodo inicializarSwitch() de la directiva easpaybSwitchDirective');
            $timeout(function () {
                clickSwitch(dato);
            }, 1500);
        }

    }

    easpaybSwitchDirective.$inject = [];
    function easpaybSwitchDirective() {
        var directiva = {
            restrict: 'E',
            transclude: 'true',
            scope: {
                labelOn: '=?',
                valorOn: '=?',
                iconOn: '=?',
                imgOn: '=?',
                faIconOn: '=?',
                tooltipLabelOn: '=?',
                labelOff: '=?',
                faIconOff: '=?',
                valorOff: '=?',
                iconOff: '=?',
                imgOff: '=?',
                tooltipLabelOff: '=?',
                valorSwitch: '=?',
                soloBordes: '=?',
                colorBackgroundConBordes: '@?',
                colorFondoOn: '@?',
                colorFondoOff: '@?',
                seleccionoValorSwitch: '&?',
                alto: '=?',
                ancho: '=?',
                tamanioIcon: '=?',
                marginIcon: '=?',
                marginLabel: '=?',
                inicializarSwitch: '=?'
            },
            controller: easpaybSwitch,
            controllerAs: 'easpaybSwitchCtrl',
            templateUrl: 'Directivas/easpaybSwitch/easpaybSwitch.html'
        };
        return directiva;
    }
})();

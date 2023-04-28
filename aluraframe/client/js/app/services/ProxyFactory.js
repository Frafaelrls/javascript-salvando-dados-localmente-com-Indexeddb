"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProxyFactory = function () {
    function ProxyFactory() {
        _classCallCheck(this, ProxyFactory);
    }

    _createClass(ProxyFactory, null, [{
        key: "create",


        /* 
            Recebe, o objeto que a proxy vai ser criada 
            Um array com as propriedades (props) que devem ser monitoradas
            E uma ação (acao) que deve ser executada quando as propriedades forem acessadas
        */

        value: function create(objeto, props, acao) {
            return new Proxy(objeto, {
                get: function get(target, prop, receiver) {

                    /*
                        Verificando se a propriedade enviada é um dos dois métodos e se é uma função
                        Caso verdadeiro, será retornado uma função
                    */

                    if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                        return function () {
                            console.log("Interceptando " + prop);

                            /*
                              O Reflect faz com que o método alvo receba os parâmetros (arguments) enviados
                              e executa o método dentro do seu contexto (target)  
                              */

                            Reflect.apply(target[prop], target, arguments);
                            return acao(target);
                        };
                    }

                    return target[prop];
                },


                // O set será chamado quando ocorrer o acesso a uma propriedade
                set: function set(target, prop, value, receiver) {
                    if (props.includes(prop)) {
                        target[prop] = value;
                        acao(target);
                    }
                    return target[prop] = value;
                }
            });
        }
    }, {
        key: "_ehFuncao",
        value: function _ehFuncao(func) {
            return (typeof func === "undefined" ? "undefined" : _typeof(func)) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
        }
    }]);

    return ProxyFactory;
}();
//# sourceMappingURL=ProxyFactory.js.map
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negociacao = function () {
    function Negociacao(data, quantidade, valor) {
        _classCallCheck(this, Negociacao);

        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        /*
            O método freeze congela o objeto impedindo sua alteração
            É um comando shallow, ou seja, ele ficará na superfície não congela objetos que são atribuidos ao
            atributo da classe
        */
        Object.freeze(this);
    }

    _createClass(Negociacao, [{
        key: "isEquals",
        value: function isEquals(outraNegociacao) {
            return JSON.stringify(this) == JSON.stringify(outraNegociacao);
        }
    }, {
        key: "data",
        get: function get() {
            /*
                Abaixo uma programação defensiva, é retornado um novo objeto
                que não tem a referência para o atributo do objeto
                getTime retorna um número que representa a data
            */
            return new Date(this._data.getTime());
        }
    }, {
        key: "quantidade",
        get: function get() {
            return this._quantidade;
        },


        /*
            Metodos set criados para realizar testes com o método set do Proxy
        */

        set: function set(novaQuantidade) {
            this._quantidade = novaQuantidade;
        }
    }, {
        key: "valor",
        get: function get() {
            return this._valor;
        },
        set: function set(novoValor) {
            this._valor = novoValor;
        }
    }, {
        key: "volume",
        get: function get() {

            return this._quantidade * this._valor;
        }
    }]);

    return Negociacao;
}();
//# sourceMappingURL=Negociacao.js.map
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = function () {
    function DateHelper() {
        _classCallCheck(this, DateHelper);

        /*
            A declaração throw lança uma exceção definida pelo usuário
            Semelhante a cláusula raise do Python
        */
        throw new Error('Essa classe não pode ser instanciada');
    }

    _createClass(DateHelper, null, [{
        key: 'dataParaTexto',
        value: function dataParaTexto(data) {

            // Abaixo é utilizado o template string (semelhante ao f-string do python)
            return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
        }
    }, {
        key: 'textoParaData',
        value: function textoParaData(texto) {

            /*
                Na espressão regular abaixo, estamos esperando digito numérico (\d) no tamanho n ({n})
                Esse tipo de elevação de erro é chamada de fail-fast (falha rápida)
            */
            if (!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('Deve está no formato: aaaa-mm-dd');

            /*
                Usando a expressão regular /-/g, onde, será verificado todas(g) as ocorrências 
                e serão subsistidas por ','
                let data = new Date(this.#inputData.value.replace(/-/g, ','));
                  Os três pontos abaixo é um spread operator, onde cada ponto irá receber um item 
                de um array (semelhante ao desempacotamento de tuplas do Python)
                  A função map() irá percorrer todos os itens do array chamando a função em cada item
                  Temos também o uso da arrow functions(função de flecha) representada por =>
                Quando temos apenas uma unica instrução em uma arrow funcion podemos omitir o bloco
                Por termos apenas uma única instrução a arrow funcion já realiza o retorno da operação
            */
            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('-').map(function (item, indice) {
                return item - indice % 2;
            })))))();
        }
    }]);

    return DateHelper;
}();
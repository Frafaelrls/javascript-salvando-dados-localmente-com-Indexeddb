"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind =

/*
    Utilizando três pontos afrente de um a parâmetro estamos 
    Transformando-o em um REST operator. Assim, todos os parâmetros passados
    Serão adicionados a um array
      O REST operator deve ser o último parâmetro.
*/

function Bind(model, view) {
    _classCallCheck(this, Bind);

    for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        props[_key - 2] = arguments[_key];
    }

    var proxy = ProxyFactory.create(model, props, function (model) {
        return view.update(model);
    });
    view.update(model);

    return proxy;
};
//# sourceMappingURL=Bind.js.map
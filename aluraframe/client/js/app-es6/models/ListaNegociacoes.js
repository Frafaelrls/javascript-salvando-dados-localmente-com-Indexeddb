export class ListaNegociacoes {

   
    constructor() {

        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);

        /*
            Classe Reflect.apply, é utilizada para modificar o contexto de execução
            de uma função e dentro de um array é passado os parâmretros que serão usados.
            
            Reflect.apply(this._armadilha, this._contexto, [this]);
        */
       
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];

    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
     }

    ordena (criterio) { 
        this._negociacoes.sort(criterio);
    }

    inverteOrdem() {
        this._negociacoes.reverse();
    }
}
class Negociacao {

    constructor(data, quantidade, valor) {
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

    get data() {
        /*
            Abaixo uma programação defensiva, é retornado um novo objeto
            que não tem a referência para o atributo do objeto
            getTime retorna um número que representa a data
        */
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor
    }

    get volume() {

        return this._quantidade * this._valor;
    }

    /*
        Metodos set criados para realizar testes com o método set do Proxy
    */

    set quantidade(novaQuantidade) {
        this._quantidade = novaQuantidade;
    }

    set valor(novoValor) {
        this._valor = novoValor;
    }

    isEquals(outraNegociacao) {        
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }

}
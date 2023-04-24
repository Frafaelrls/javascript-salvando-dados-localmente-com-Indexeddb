class NegociacaoDao {

    #connection;
    #store;

    constructor(connection) {

        this.#connection = connection;
        this.#store = 'negociacoes'

    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request =  this.#connection.transaction([this.#store], 'readwrite')
                .objectStore( this.#store)
                .add({data:negociacao.data, quantidade:negociacao.quantidade, valor:negociacao.valor});

            request.onsuccess = e => {
                
                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação;');
            };

        });

    }

}
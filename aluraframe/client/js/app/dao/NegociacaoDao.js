class NegociacaoDao {

    #connection;
    #store;

    constructor(connection) {

        this.#connection = connection;
        this.#store = 'negociacoes'

    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this.#connection.transaction([this.#store], 'readwrite')
                .objectStore(this.#store)
                .add({ data: negociacao.data, quantidade: negociacao.quantidade, valor: negociacao.valor });

            request.onsuccess = e => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação;');
            };

        });

    }

    listaTodos() {

        return new Promise((resolve, reject) => {

            let cursor = this.#connection
                .transaction([this.#store], 'readwrite')
                .objectStore(this.#store)
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {

                // ponteiro para o objeto atual
                let atual = e.target.result;

                if (atual) {

                    let dado = atual.value;
                    // Cria um novo objeto com os dados salvos no banco 
                    negociacoes.push(new Negociacao(dado.data, dado.quantidade, dado.valor));

                    atual.continue();

                } else {

                    resolve(negociacoes);
                }
            }

            cursor.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível listar as negociações')
            };

        });

    }

    apagaTodos() {
        return new Promise((resolve, reject) =>{
            let request = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .clear();

            request.onsuccess = e => resolve('Negociações apagadas com sucesso');
            
            request.onerror = e => {
                console.log(e.target.error);
                resolve('Não foi possível apagar as negociações');
            };

        });
    }

}
/*    
    A) O método getConnection() será um método estático, ou seja, invocado diretamente na classe.

    B) O retorno de getConnection será uma promise, pois a abertura de uma conexão é um processo assíncrono.

    C) Não importa quantas vezes seja chamado o método getConnection(), a conexão retornada deve ser a mesma.

    D) Toda conexão possui o método close(), mas o programador não pode chamá-lo, porque a conexão é a mesma para a aplicação inteira. Só o próprio ConnectionFactory pode fechar a conexão.
*/


var ConnectionFactory = (function () {

    const stores = ['negociacoes'];
    const version = 5;
    const dbName = 'aluraframe';

    var connection = null;

    var close = null;

    return class ConnectionFactory {

        constructor() {

            throw new Error('Não é possível criar instâncias de ConnectionFacroty');

        }

        static getConnection() {

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {

                    ConnectionFactory.#createStore(e.target.result);

                };

                openRequest.onsuccess = e => {

                    if(!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error('Você não pode fechar diretamente a conexão');
                        }
                    } 
                    resolve(connection);

                };

                openRequest.onerror = e => {

                    console.log(e.target.error);

                    reject(e.target.error.name);

                };
            });
        }

        static #createStore(connection) {

            stores.forEach(store => {

                if (connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);

                connection.createObjectStore(store, { autoIncrement: true });

            });
        }

        static closeConnection() {

            if(connection) {
                close();
                connection = null;
                console.log('Conexão fechada!');
            }
        }
     }

})();

/*    
    A) O método getConnection() será um método estático, ou seja, invocado diretamente na classe.

    B) O retorno de getConnection será uma promise, pois a abertura de uma conexão é um processo assíncrono.

    C) Não importa quantas vezes seja chamado o método getConnection(), a conexão retornada deve ser a mesma.

    D) Toda conexão possui o método close(), mas o programador não pode chamá-lo, porque a conexão é a mesma para a aplicação inteira. Só o próprio ConnectionFactory pode fechar a conexão.
*/


var stores = ['negociacoes'];
var version = 1;
var dbName = 'aluraframe';

class ConnectionFactory {

    constructor() {

        throw new Error('Não é possível criar instâncias de ConnectionFacroty');

    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {

            };

            openRequest.onsuccess = e => {

            };

            openRequest.onerror = e => {

            };
        });
    }
}
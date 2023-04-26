class NegociacaoController {

    // Atributos privados
    #inputData;
    #inputQuantidade;
    #inputValor;
    #listaNegociacoes;
    #mensagem;
    #ordemAtual;

    constructor() {

        /* 
            O método .bind criar uma função que o seu this tem referência ao atributo fornecido
            Nes caso, a variável $ mantem a associação ao document
        */
        let $ = document.querySelector.bind(document);

        this.#inputData = $('#data');
        this.#inputQuantidade = $('#quantidade');
        this.#inputValor = $('#valor');
        this.#ordemAtual = '';


        this.#listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this.#mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this.#listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this.#mensagem.texto = erro;
            });

    }

    adiciona(event) {
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {

                let negociacao = this.#criaNegociacao();

                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {

                        // Adicionando na tabela para exibir 
                        this.#listaNegociacoes.adiciona(negociacao);
                        this.#mensagem.texto = 'Negociação adicionada com sucesso!';
                        this.#limpaFormulario();
                    })

            })
            .catch(erro => this.#mensagem = erro);


    };

    importaNegociacoes() {

        let service = new NegociacaoService();

        service
            .obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    /*
                        O método .some() percorre uma lista e retorna true se encontrar um objeto
                        corresponente ao objeto procurado
                    */
                    !this.#listaNegociacoes.negociacoes.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))
                )
            )
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this.#listaNegociacoes.adiciona(negociacao);
                this.#mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this.#mensagem.texto = erro);


        /*
            Abaixo temos a aplicação do padrão de projeto promise, mas, o código abaixo
            é um "Pyramid of Doom". Este tipo de código pode apresentar retornos fora de
            ordem devido a promise ser assíncrona, onde uma solicitação é executada independente
            da solicitação anterior.

        let promise = service.obeterNegociacoesDaSemana();
        promise
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao))
                this.#mensagem.texto = 'Negociações da semana obtida com sucesso!';
            })
            .catch(erro => this.#mensagem.texto = erro)

        service.obeterNegociacoesDaSemanaAnterior()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao))
                this.#mensagem.texto = 'Negociações da semana anterior obtida com sucesso!';
            })
            .catch(erro => this.#mensagem.texto = erro)

        service.obeterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao))
                this.#mensagem.texto = 'Negociações da semana retrasada obtida com sucesso!';
            })
            .catch(erro => this.#mensagem.texto = erro)


        */
        /* 
        
            Abaixo temos um exemplo de código chamado "Pyramid of Doom" ("Pirâmide do destino")
            Isso ocorre quando temos um aninhamento de funções, ou seja, uma função dentro de outras
            funções.

            A pirâmide é um forte indício de que temos problemas de legibilidade do código,
            e é o sintoma de um problema maior, o "Callback Hell". 
            Ocorre quando temos requisições assíncronas executadas em determinada ordem, 
            que chama vários callbacks seguidos.
        
        

        service.obeterNegociacoesDaSemana((erro, negociacoes) => {

            // Pragamação chamada de Error-First-Callback
            if (erro) {
                this.#mensagem.texto = erro;
                return
            }

            negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao));

            service.obeterNegociacoesDaSemanaAnterior((erro, negociacoes) => {

                if (erro) {
                    this.#mensagem.texto = erro;
                    return
                }

                negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao));

                service.obeterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
                   
                    if (erro) {
                        this.#mensagem.texto = erro;
                        return
                    }

                    negociacoes.forEach(negociacao => this.#listaNegociacoes.adiciona(negociacao));
                    this.#mensagem.texto = 'Negociações importadas com sucesso.'
                });
            });
        });
        
        */

    }

    apaga() {

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this.#mensagem.texto = mensagem;
                this.#listaNegociacoes.esvazia();
            });

    }

    #criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this.#inputData.value),
            parseInt(this.#inputQuantidade.value),
            parseFloat(this.#inputValor.value)
        );
    }

    ordena(coluna) {
        if (this.#ordemAtual == coluna) {
            this.#listaNegociacoes.inverteOrdem();
        } else {
            this.#listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this.#ordemAtual = coluna;
    }

    #limpaFormulario() {
        this.#inputData.value = '';
        this.#inputQuantidade.value = 1;
        this.#inputValor.value = 0.0;

        this.#inputData.focus();
    }
};
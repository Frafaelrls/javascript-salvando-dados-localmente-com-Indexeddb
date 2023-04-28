class NegociacaoController {

    constructor() {

        /* 
            O método .bind criar uma função que o seu this tem referência ao atributo fornecido
            Nes caso, a variável $ mantem a associação ao document
        */
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';


        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        this._service = new NegociacaoService()

        this._init();
    }

    _init() {

        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                this._mensagem.texto = erro;
            });

        setInterval(() => {
            this.importaNegociacoes()
        }, 3000);

    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario()
            })
            .catch(erro => this._mensagem.texto = erro);

    };

    importaNegociacoes() {

        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this._mensagem.texto = erro);


        /*
            Abaixo temos a aplicação do padrão de projeto promise, mas, o código abaixo
            é um "Pyramid of Doom". Este tipo de código pode apresentar retornos fora de
            ordem devido a promise ser assíncrona, onde uma solicitação é executada independente
            da solicitação anterior.
    
        let promise = service.obeterNegociacoesDaSemana();
        promise
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociações da semana obtida com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro)
    
        service.obeterNegociacoesDaSemanaAnterior()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociações da semana anterior obtida com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro)
    
        service.obeterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negociações da semana retrasada obtida com sucesso!';
            })
            .catch(erro => this._mensagem.texto = erro)
    
    
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
                this._mensagem.texto = erro;
                return
            }
    
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
    
            service.obeterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
    
                if (erro) {
                    this._mensagem.texto = erro;
                    return
                }
    
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
    
                service.obeterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
                   
                    if (erro) {
                        this._mensagem.texto = erro;
                        return
                    }
    
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso.'
                });
            });
        });
        
        */

    }

    apaga() {

        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
};
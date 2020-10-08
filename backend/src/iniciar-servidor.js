const express = require('express');
const connectDb = require('./db/db-connection');
const VendaModel = require('./db/VendaModel');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');

//db connections
connectDb.connect();
const connection = connectDb.connection;
//verifica aberturas de conexão c o banco
connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

//instancia o express(http server)
const app = express();

//coloca pro express utilizar funções de terceiros nesse caso body parser
//body parser permite a aplicação ler arquivos JSON na propriedade .body da requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

//rota principal lista todas vendas
app.get('/', async (requisicao, resposta) => {
    return resposta.send({
        data: await VendaModel.find()
    })
})

//rota cria venda
app.post('/criar-venda', (requisicao, resposta) => {
    try {
        //obtem dados do client-side
        const { produto, cliente, dtPagamento, valor } = requisicao.body;

        //cria objeto que vai ser inserido no banco
        const objCreate = { produto, cliente, dtPagamento, valor, ativo: true };

        //cria uma nova instancia do objeto Venda
        const novaVenda = new VendaModel(objCreate);

        //salva essa venda no banco mongo
        novaVenda.save();

        //envia resposta final
        return resposta.send({
            data: novaVenda
        })
    } catch (error) {
        resposta.send('Não deu certo')
        console.log('error', error)
    }
})

app.post('/ver-venda', async (requisicao, resposta) => {
    const { _id } = requisicao.body;
    const venda = await VendaModel.findOne({ _id });
    return resposta.send({ data: venda });
})

app.post('/atualizar-venda', async (requisicao, resposta) => {
    try {
        const { _id, produto, cliente, dtPagamento, valor, ativo } = requisicao.body;

        let objUpdate = {};

        if (produto) {
            objUpdate["produto"] = produto
        }
        if (cliente) {
            objUpdate["cliente"] = cliente
        }
        if (dtPagamento) {
            objUpdate["dtPagamento"] = dtPagamento
        }
        if (valor) {
            objUpdate["valor"] = valor
        }
        if(ativo !== undefined) {
            objUpdate["ativo"] = ativo
        }


        const vendaAtualizada = await VendaModel
            .updateOne({ _id }, objUpdate)

        return resposta.send({ data: vendaAtualizada });


    } catch (error) {
        console.log('erro rota', error)
    }
})

app.post('/apagar-venda', async (requisicao, resposta) => {
    try {
        const { _id } = requisicao.body;

        const vendaAtualizada = await VendaModel
            .updateOne({ _id }, {ativo: false})

        return resposta.send({ data: vendaAtualizada });

    } catch (error) {
        console.log('error', error)
    }
       
})


app.listen(8080, () => console.log('running port 8080'));
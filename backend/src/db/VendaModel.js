const mongoose = require('mongoose');

const VendaModel = mongoose.model('Venda', new mongoose.Schema({ 
    produto: String, //o nome do produto( Calça, blusa e sapato )
    cliente: String, //o nome do cliente
    dtPagamento: String,
    valor: Number, //o valor da venda
    ativo: Boolean
 }));

module.exports = VendaModel;
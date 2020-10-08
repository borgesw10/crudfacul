const mongoose = require('mongoose');
const clusterMongo = `mongodb+srv://admin:baygon2468@cluster0.d4dhr.mongodb.net/crudfacul?retryWrites=true&w=majority`;

const connect = function () {
    return mongoose.connect(clusterMongo, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
        if (err) {
            console.log('err', err)
            return console.log('não conectou com o cluster')
        }
        console.log('conectou com o cluster')
    })
};

const connection = mongoose.connection;

module.exports ={ connect, connection};

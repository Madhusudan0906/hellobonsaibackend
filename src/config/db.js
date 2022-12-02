const mongoose = require('mongoose');
const uri = process.env.MongoURL;
const connect = ()=>{
    return mongoose.connect(uri);
}

module.exports = connect

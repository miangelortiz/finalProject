//MongoDB connect
const mongoose = require('mongoose');

const mongoConn = mongoose.connect('mongodb://localhost/shareyours', { useNewUrlParser: true , useFindAndModify: false,  useCreateIndex: true })
    .then((_ok) => console.log('Successfully connected to MongoDB!'))
    .catch((err) => console.error('Somewhing went wrong', err))

module.exports = mongoConn;
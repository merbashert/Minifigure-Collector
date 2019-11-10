const mongoose = require('mongoose');

const createdSchema = new mongoose.Schema({
    name: {type: String, required: true},
    series: {type: String},
    year: {type: Number},
    img: {type: String},
    username: {type: String}
})

const Created = mongoose.model('Create', createdSchema);

module.exports = Created;

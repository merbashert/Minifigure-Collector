const mongoose = require('mongoose');

const legoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    series: {type: String},
    year: {type: Number},
    img: {type: String},
    username: {type: String}
})

const Lego = mongoose.model('Lego', legoSchema)

module.exports = Lego;

const mongoose = require('mongoose');

const legoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    series: {type: Number},
    year: {type: Number},
    img: {type: String}
})

const Lego = mongoose.model('Lego', legoSchema)

module.exports = Lego;

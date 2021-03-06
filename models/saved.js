const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    series: {type: String},
    year: {type: Number},
    img: {type: String},
    username: {type: String}
})

const Saved = mongoose.model('Own', savedSchema);

module.exports = Saved;

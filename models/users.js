const mongoose = require('mongoose')
const Saved = require('../models/saved.js')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: String,
    saved: [Saved.schema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;

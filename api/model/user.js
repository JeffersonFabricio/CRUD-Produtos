var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    password: String
}, {versionKey: false});

module.exports = mongoose("User", userSchema);
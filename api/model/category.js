var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: String
}, {versionKey: false});

module.exports = mongoose.model("Category", userSchema);
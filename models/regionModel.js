var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var regionSchema = new Schema({
    name: String,
    location: String,
    link_l: String,
    link_u: String,
    link_r: String,
    link_d: String
});

module.exports = mongoose.model('region', regionSchema);
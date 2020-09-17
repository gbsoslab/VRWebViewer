var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vrSchema = new Schema({
    region_id: {type:mongoose.Schema.ObjectId},
    scene_name:String,
    image_file: String,
    link_l: String,
    link_u: String,
    link_r: String,
    link_d: String
});

module.exports = mongoose.model('vrItem', vrSchema);
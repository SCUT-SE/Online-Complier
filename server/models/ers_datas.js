var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "username":String,
    "password":String,
});
// model的一个参数是DB的一个Schema
module.exports = mongoose.model('ers_datas',productSchema);
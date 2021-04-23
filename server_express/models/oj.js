var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "problemId":Number,
    "author":String,
    "diffic":String,
    "content":String
});
// model的一个参数是DB的一个Schema
module.exports = mongoose.model('ojs',productSchema);
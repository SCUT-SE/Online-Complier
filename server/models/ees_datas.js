var mongoose = require('mongoose')
var Schema = mongoose.Schema;
// interviewees 数据表
var productSchema = new Schema({
    "username":String,
    "password":String,
});
// model的一个参数是DB的一个Schema
module.exports = mongoose.model('ees_datas',productSchema);
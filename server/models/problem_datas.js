var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var problemSchema = new Schema({
    "title":{
        type:String,
        required:true
    },
    "content":{
        type:String,
        required:true
    },
    "image_url":{
        type:String,
        default:""
    },
    "author_id":{
        type:String,
        required:true
    },
    "create_time":{
        type:Date,
        default:Date.now
    },
    "difficulty":{
        type:Number,
        enum:[0,1,2,3],     //0-待定 1-简单 2-中等 3-困难
        default:0
    },
    "status":{
        type:Number,
        enum:[0,1],        //0-公开 1-隐藏
        default:0
    }
});
// model的一个参数是DB的一个Schema
module.exports = mongoose.model('Problem',problemSchema);
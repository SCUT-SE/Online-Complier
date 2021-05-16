var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    "room_name":{
        type:String,
        default:"面试房间"
    },
    "creator_id":{
        type:String,
        required:true
    },
    "create_time":{
        type:Date,
        default:Date.now
    },
    "problemSet":{
        type:Array,
        default:[]
    }
});
// model的一个参数是DB的一个Schema
module.exports = mongoose.model('Room',roomSchema);
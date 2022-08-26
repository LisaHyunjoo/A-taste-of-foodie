const mongoose = require('mongoose')
const foodieSchema = new mongoose.Schema({
    name: {type:String, required:true},
    location:{type:String, required:true},
    cuisine: {type:String, required:true},
    rating:{type:Number, required:true},
    comment:String,
    img:String

})

const Foodie = mongoose.model('Foodie', foodieSchema)
module.exports = Foodie
const mongoose = require('mongoose')
const cuisineSchema = new mongoose.Schema({
    name: {type:String, required:true},
    rating:{type:Number, required:true},
    comment:String,
    img:String
})

const Cuisine = mongoose.model('Cuisine', cuisineSchema)
module.exports = Cuisine
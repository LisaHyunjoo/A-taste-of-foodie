const mongoose = require('mongoose')
const restauSchema = new mongoose.Schema({
    name: {type:String, required:true},
    location:{type:String, required:true},
    imgage:String
})

const Restaurant = mongoose.model('Restaurant', restauSchema)
module.exports = Restaurant
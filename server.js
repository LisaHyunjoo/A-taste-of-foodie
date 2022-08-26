const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const methodOveride = require('method-override')
const mongoose = require('mongoose')
const foodieController = require('./controllers/foodie.js')

mongoose.connect('mongodb://127.0.0.1:27017/foodie')
mongoose.connection.once('open', ()=>{
    console.log('connected to mongo')
})

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOveride('_method'))
app.set('view engine', 'ejs')
app.use('/foodie', foodieController)

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})
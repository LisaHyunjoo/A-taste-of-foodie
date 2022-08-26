const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Foodie = require('./models/foodie.js')
const methodOveride = require('method-override')
const mongoose = require('mongoose')

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


// index (list of restaurants)
app.get('/foodie', (req, res) => {
    Foodie.find({}, (err, allFoodies)=>{
        res.render('index.ejs', {
            foodies: allFoodies
        })
    })
})

// new restaurant
app.get('/foodie/new', (req, res) => {
    res.render('new.ejs')
})

// show (list of cuisines)
app.get('/foodie/:id', (req,res)=>{
    Foodie.findById(req.params.id, (err,foundFoodie)=>{
        res.render('show.ejs', {
        foodie: foundFoodie
        })
    })
})

// create a restaurant
app.post('/foodie', (req,res)=>{
    Foodie.create(req.body, (error, createdRestaurant) => {
        res.redirect('/foodie')
    })
})

// delete a restaurant
app.delete('/foodie/:id', (req,res)=> {
    Foodie.findByIdAndRemove(req.params.id, (err,data)=>{
        res.redirect('/foodie')
    })
})

// edit a restaurant
app.get('/foodie/:id/edit', (req,res)=>{
    Foodie.findById(req.params.id, (err, foundFoodie) => {
        res.render('edit.ejs', {
            foodie: foundFoodie,
            id:req.params.id
        })
    })
})

// update
app.put('/foodie/:id', (req, res) => {
    Foodie.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedModel)=>{
    res.redirect('/foodie')
    })
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})
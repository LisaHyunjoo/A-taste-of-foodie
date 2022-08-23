const express = require('express')
const app = express()
const Restaurant = require('./models/restaurant.js')
const Cuisine = require('./models/cuisine.js')
const methodOveride = require('method-override')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/foodie')
mongoose.connection.once('open', ()=>{
    console.log('connected to mongo')
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOveride('_method'))

// index (list of restaurants)
app.get('/foodie/restaurant', (req, res) => {
    Restaurant.find({}, (err, allRestaurants)=>{
        res.render('index.ejs', {
            restaurants: allRestaurants
        })
    })
  
})

// new restaurant
app.get('/foodie/restaurant/new', (req, res) => {
    res.render('newRestaurant.ejs')
})

// new cuisine
app.get('/foodie/restaurant/:id/new', (req,res)=>{
    res.render('NewCuisine.ejs')
    
})

// show (list of cuisines)
app.get('/foodie/restaurant/:id', (req,res)=>{
    Cuisine.find({}, (err, allCuisines)=>{
        res.render('show.ejs', {
            cuisine : allCuisines
        })
    })
  
})

// create a restaurant
app.post('/foodie/restaurant', (req,res)=>{
    Restaurant.create(req.body, (error, createdRestaurant) => {
        res.redirect('/foodie/restaurant')
    })
})

// create a cuisine
app.post('/foodie/restaurant/:id', (req,res)=>{
    Cuisine.create(req.body, (error, createdCuisine)=>{
       res.redirect('/foodie/restaurant/:id')
    })
})

// delete a restaurant
app.delete('/foodie/restaurant/:id', (req,res)=> {
    Restaurant.findByIdAndRemove(req.params.id, (err,data)=>{
        res.redirect('/foodie/restaurant')
    })
})


app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})
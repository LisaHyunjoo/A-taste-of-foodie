const express = require('express')
const app = express()

// index
app.get('/foodie/restaurant', (req, res) => {
    res.render('index.ejs')
})

// new restaurant
app.get('/foodie/restaurant/new', (req, res) => {
    res.render('newRestaurant.ejs')
})

// new cuisine
app.get('/foodie/restaurant/:id/new', (req,res)=>{
    res.render('NewCuisine.ejs')
})

// show 
app.get('/foodie/restaurant/:id', (req,res)=>{
    res.render('show.ejs')
})


app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})
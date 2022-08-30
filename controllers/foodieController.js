const express = require('express')
const router = express.Router()
const Foodie = require('../models/foodie.js')


// index (list of restaurants)
router.get('', (req, res) => {
    Foodie.find({}, (err, allFoodies)=>{
        res.render('index.ejs', {
            foodies: allFoodies
        })
    })
})

// new (create new restaurant and cuisine)
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// show (list of cuisines)
router.get('/:id', (req,res)=>{
    Foodie.findById(req.params.id, (err,foundFoodie)=>{
        res.render('show.ejs', {
        foodie: foundFoodie
        })
    })
})

// post 
router.post('', (req,res)=>{
    Foodie.create(req.body, (error, createdRestaurant) => {
        res.redirect('/foodie')
    })
})

// delete 
router.delete('/:id', (req,res)=> {
    Foodie.findByIdAndRemove(req.params.id, (err,data)=>{
        res.redirect('/foodie')
    })
})

// edit 
router.get('/:id/edit', (req,res)=>{
    Foodie.findById(req.params.id, (err, foundFoodie) => {
        res.render('edit.ejs', {
            foodie: foundFoodie,
            id:req.params.id
        })
    })
})

// update
router.put('/:id', (req, res) => {
    Foodie.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedModel)=>{
    res.redirect('/foodie')
    })
})

module.exports = router
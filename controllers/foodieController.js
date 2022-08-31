const express = require('express')
const router = express.Router()
const Foodie = require('../models/foodie.js')
const upload = require('../uploadMiddleware');
const Resize = require('../Resize');


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

// router.post('/new', upload.single('image'), async function (req, res) {
//     const imagePath = path.join(__dirname, '/public/images');
//     const fileUpload = new Resize(imagePath);
//     if (!req.file) {
//       res.status(401).json({error: 'Please provide an image'});
//     }
//     const filename = await fileUpload.save(req.file.buffer);
//     return res.status(200).json({ name: filename });
//   });


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
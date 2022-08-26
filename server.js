const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const methodOveride = require('method-override')
const mongoose = require('mongoose')

const session = require('express-session')
require('dotenv').config()
const PORT=process.env.PORT
const SESSION_SECRET = process.env.SESSION_SECRET

const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI)
mongoose.connection.once('open', ()=>{
    console.log('connected to mongo')
})

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOveride('_method'))
app.set('view engine', 'ejs')
app.use(session({
        secret:SESSION_SECRET,
        resave:false,
        saveUninitialized:false})
)
const foodieController = require('./controllers/foodieController.js')
const userController = require('./controllers/userController.js')
app.use('/foodie', foodieController)
app.use('/user', userController)

app.get('/',  (req, res) => {
	res.render('main.ejs');
});


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
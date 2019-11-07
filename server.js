/////Dependencies//////
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()

const db = mongoose.connection
require('dotenv').config()


///////////////////////

/////Port//////
const PORT = process.env.PORT

///////////////////////

/////Database//////
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

///////////////////////

/////Middleware//////

//Use public folder for static assets
app.use(express.static('public'))

//Populate req.body with parsed info from forms
app.use(express.urlencoded({ extended: false }))

//Be able to use delete and put routes
app.use(methodOverride('_method'))

app.use(session({
    secret: "feedmeseymour",
    resave: false,
    saveUninitialized: false
}))

///////////////////////

/////Controllers//////
const legosController = require('./controllers/legos.js');
app.use('/legos', legosController)

const savedController = require('./controllers/saved.js');
app.use('/saved', savedController)

const usersController = require('./controllers/users.js');
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController)

const newController = require('./controllers/new.js');
app.use('/new', newController)


///////////////////////

/////Routes//////


app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/set', (req, res) => {
    req.session.username = "meredith";
    res.send("I set a cookie")
})

app.get('/get', (req, res) => {
    res.send(req.session.username)
})

/////Listener//////

app.listen(PORT, () => {
    console.log("App is listening on 3000");
})

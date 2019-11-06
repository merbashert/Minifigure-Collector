/////Dependencies//////
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Lego = require('./models/legos.js')
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

///////////////////////

/////Routes//////

app.get('/legos', (req, res) => {
    Lego.find({}, (error, legos) => {
        res.render(
            'index.ejs',
            {
                legos:legos
            }
        );
    });
});

app.get('/legos/new', (req, res) => {
    res.render('new.ejs');
})

app.get('/legos/:id', (req, res) => {
    Lego.findById(req.params.id, (err, foundLego) => {
        res.render(
            'show.ejs', {
                lego: foundLego
            });
        }
    );
});



app.post('/legos', (req, res) => {
    Lego.create(req.body, (error, createdLego) => {
        res.redirect('/legos')
    })
})


/////Listener//////

app.listen(PORT, () => {
    console.log("App is listening on 3000");
})

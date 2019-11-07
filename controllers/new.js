const express = require('express');
const Created = require('../models/new.js')
const Lego = require('../models/legos.js')
const router = express.Router();


router.get('/', (req, res) => {
    Created.find({}, null, {sort: {name: -1}}, (error, newLego) => {
        res.render(
            'legos/new-index.ejs',
            {
                created:newLego
            }
        );
    });
});

router.get('/create', (req, res) => {
    res.render(
        'legos/new.ejs'
    )
})

router.post('/', (req, res) => {
    if(req.body.happyguy === "on") {
        req.body.img = "/images/new/happy_guy.jpg"
    } if(req.body.happygirl === "on") {
        req.body.img = "/images/new/happy_girl.jpg"
    }if(req.body.angryguy === "on") {
        req.body.img = "/images/new/angry_guy.jpg"
    }if(req.body.angrygirl === "on") {
        req.body.img = "/images/new/angry_girl.jpg"
    }if(req.body.scaredguy === "on") {
        req.body.img = "/images/new/scared_guy.jpg"
    }if(req.body.scaredgirl === "on") {
        req.body.img = "/images/new/scared_girl.jpg"
    }
    console.log(req.body);
    req.body.series = "Future Lego Series"
    req.body.year = 2019
    Created.create(req.body, (error, createdLego) => {
        res.redirect('/new')

    })
})



module.exports = router;

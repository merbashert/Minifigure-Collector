const express = require('express');
const Lego = require('../models/legos.js')
const router = express.Router();


router.get('/', (req, res) => {
    Lego.find({}, (error, legos) => {
        res.render(
            'index.ejs',
            {
                legos:legos
            }
        );
    });
});

router.get('/new', (req, res) => {
    res.render('new.ejs');
})

router.get('/:id', (req, res) => {
    Lego.findById(req.params.id, (err, foundLego) => {
        res.render(
            'show.ejs', {
                lego: foundLego
            });
        }
    );
});



router.post('/', (req, res) => {
    Lego.create(req.body, (error, createdLego) => {
        res.redirect('/legos')
    })
})

module.exports = router;
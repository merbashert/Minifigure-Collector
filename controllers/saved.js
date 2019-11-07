const express = require('express');
const Saved = require('../models/saved.js')
const router = express.Router();

router.get('/seed', (req, res)=>{
    Saved.create([
        {
        name: "Plumber",
        series:	9,
        year: 2012,
        img: "/images/series9/plumber.jpg"
        }
    ], (err, data)=>{
        res.redirect('/legos');
    })

});



router.get('/', (req, res) => {
    if(req.session.username) {
        Saved.find({}, null, {sort: {name: 1}}, (error, saved) => {
            res.render(
                'legos/saved.ejs',
                {
                    saved:saved
                }
            );
        });
    } else {
        res.redirect('/')
    }

});

router.get('/:id', (req, res) => {
    Saved.findById(req.params.id, (err, foundLego) => {
        res.render(
            'legos/show.ejs', {
                lego: foundLego
            }
        );
    });
});

module.exports = router;

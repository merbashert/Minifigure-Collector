const express = require('express');
const Saved = require('../models/saved.js')
const router = express.Router();

router.get('/seed', (req, res)=>{
    Saved.create([

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
        res.redirect('/saved')
    }

});


module.exports = router;

const express = require('express');
const Saved = require('../models/saved.js')
const router = express.Router();

router.get('/seed', (req, res)=>{
    Saved.create([
        {
name: "Mexican",
series:	2,
year: 2010,
img: "/images/mexican.jpg"
},
{
name: "Lawn Gnome",
series:	4,
year: 2011,
img: "/images/lawn-gnome.jpg"
}

    ], (err, data)=>{
        res.redirect('/legos');
    })

});

router.get('/', (req, res) => {
    if(req.session.username) {
        Saved.find({}, (error, saved) => {
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

const express = require('express');
const Saved = require('../models/saved.js')
const router = express.Router();
const User = require('../models/users.js')

// router.get('/seed', (req, res)=>{
//     Saved.create([
//
//     ], (err, data)=>{
//         res.redirect('/legos');
//     })
//
// });


router.get('/', (req, res) => {
    if(req.session.username) {
        Saved.find({}, null, {sort: {name: 1}}, (error, saved) => {
            res.render(
                'legos/saved.ejs',
                {
                    saved:saved,
                    username:req.session.username
                }
            );
        });
    } else {
        res.redirect('/')
    }

});

router.get('/add', (req, res) => {
    res.render(
        'legos/add.ejs'
    )
})


router.post('/', (req, res) => {
    Saved.create(req.body, (error, added) => {
        res.redirect('/saved')

    })
})

router.get('/:id', (req, res) => {
    Saved.findById(req.params.id, (err, foundLego) => {
        res.render(
            'legos/show.ejs', {
                lego: foundLego
            }
        );
    });
});





router.delete('/:id', (req, res) => {
    Saved.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/saved')
    })
})

module.exports = router;

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
        Saved.find({username: req.session.username}, null, {sort: {name: 1}}, (error, saved) => {
            res.render(
                'saved/saved.ejs',
                {
                    saved:saved,
                    username:(req.session.username).charAt(0).toUpperCase() + (req.session.username).slice(1)
                }
            );
        });
    } else {
        res.redirect('/')
    }

});

router.get('/byseries', (req, res) => {
    if(req.session.username) {
        Saved.find({}, null, {sort: {series: 1}}, (error, saved) => {
            res.render(
                'saved/savedseries.ejs',
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

router.post('/', (req, res) => {
    Saved.create(req.body, (error, added) => {
        res.redirect('/saved')

    })
})

router.get('/:id', (req, res) => {
    if(req.session.username) {
        Saved.findById(req.params.id, (err, foundLego) => {
            res.render(
                'saved/showtosave.ejs',
                {
                    lego: foundLego,
                    username:req.session.username
                }
            );
        });
    } else {
        res.redirect('/')
    }

});

router.get('/:id/saved', (req, res) => {
    if(req.session.username) {
        Saved.findById(req.params.id, (err, foundLego) => {
            res.render(
                'saved/showsaved.ejs',
                {
                    saved: foundLego,
                    username:req.session.username
                }
            );
        });
    } else {
        res.redirect('/')
    }

});


router.delete('/:id/', (req, res) => {
    Saved.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/saved')
    })
})

module.exports = router;

const express = require('express');
const Lego = require('../models/legos.js')
const Saved = require('../models/saved.js')
const router = express.Router();


router.get('/seed', (req, res)=>{
    Lego.create([

    ], (err, data)=>{
        res.redirect('/legos');
    })
});

router.get('/', (req, res) => {
    if(req.session.username) {
        Lego.find({}, null, {sort: {name: 1}}, (error, legos) => {
            res.render(
                'saved/indextosave.ejs',
                {
                    legos:legos,
                    username: req.session.username
                }
            );
        });
    } else {
        Lego.find({}, null, {sort: {name: 1}}, (error, legos) => {
            res.render(
                'legos/index.ejs',
                {
                    legos:legos,
                    username: req.session.username
                }
            );
        });
    }

});

router.get('/saved', (req, res) => {
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

router.post('/saved', (req, res) => {
    Saved.create(req.body, (error, added) => {
        res.redirect('/legos/saved')

    })
})

router.get('/:id/series', (req, res) => {
    if(req.session.username) {
        Lego.find({series: req.params.id}, null, {sort: {name: 1}}, (error, foundLego) => {
            res.render(
                'saved/seriestosave.ejs',
                {
                    legos: foundLego,
                    series: req.params.id,
                    username: req.session.username
                }
            );
        });
    } else {
        Lego.find({series: req.params.id},  null, {sort: {name: 1}},  (err, foundLego) => {
            res.render(
                'legos/series.ejs',
                {
                    legos: foundLego,
                    series: req.params.id
                }
            );
        });
    }

});

//Search Graveyard
// router.get('/:id/search', (req, res) => {
//     Lego.find({name: "Cowboy"}, (err, foundLego) => {
//         res.render(
//             'legos/search.ejs',
//             {
//                 legos:foundLego
//             }
//
//         )
//     })
// })
// router.get('/results/:name', (req, res) => {
//     console.log(req.params);
// });

// router.get('/:id', (req, res) => {
//     Lego.findById(req.params.id, (err, foundLego) => {
//         res.render(
//             'legos/show.ejs', {
//                 lego: foundLego
//             }
//         );
//     });
// });
router.get('/:id/saved', (req, res) => {
    if(req.session.username) {
        Saved.findById(req.params.id, (err, foundLego) => {
            res.render(
                'saved/showsaved.ejs',
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

router.get('/:id/', (req, res) => {
    if(req.session.username) {
        Lego.findById(req.params.id, (err, foundLego) => {
            res.render(
                'saved/showtosave.ejs', {
                    lego: foundLego,
                    username: req.session.username
                }
            );
        });
    } else {
        Lego.findById(req.params.id, (err, foundLego) => {
            res.render(
                'legos/show.ejs', {
                    lego: foundLego
                }
            );
        });
    }

});





router.put('/:id', (req, res) => {
    Lego.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedLego) => {
        res.redirect('/legos')
    })
})


router.delete('/:id/', (req, res) => {
    Saved.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/legos/saved')
    })
})


module.exports = router;

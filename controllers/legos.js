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

//This route checks if the req.session.username cookie is present, and if it is, it loads the index page with the save to collection buttons at the bottom.  If it's not present, it loads the un-logged in version.
router.get('/', (req, res) => {
    if(req.session.username) {
        Lego.find({}, null, {sort: {name: 1}}, (error, legos) => {
            //The above line sorts the legos alphabetically.  Null converts the MongoDB driver find() to the Mongoose Model.find()
            //https://medium.com/@jeanjacquesbagui/in-mongoose-sort-by-date-node-js-4dfcba254110
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
//Saved Index - the page is populated by searching for any legos that have the user property name matching the username that was checked
router.get('/saved', (req, res) => {
    if(req.session.username) {
        Saved.find({username: req.session.username}, null, {sort: {name: 1}}, (error, saved) => {
            res.render(
                'saved/saved.ejs',
                {
                    saved:saved,
                    username:(req.session.username).charAt(0).toUpperCase() + (req.session.username).slice(1)
                    //capitalizes the Username in case the user has type it in lower case
                }
            );
        });
    } else {
        res.redirect('/')
    }

});

//The saved post route - grabs the username from the get route and adds it to the saved
router.post('/saved', (req, res) => {
    Saved.create(req.body, (error, added) => {
        res.redirect('/legos/saved')

    })
})

//works the same as the index page
router.get('/:id/series', (req, res) => {
    if(req.session.username) {
        Lego.find({series: req.params.id}, null, {sort: {name: 1}}, (error, foundLego) => {
            res.render(
                'saved/seriestosave.ejs',
                {
                    legos: foundLego,
                    series: req.params.id,//passes on the series name so the page can load with the correct series title
                    username: req.session.username// passes on the username so it can be added to the username field of the newly saved lego
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
                'saved/showsaved.ejs', //show page for the Saved index - possible to figure out whether or not the name already exists in the saved collection and add it to the next loop?
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

//works the same as the index route
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
    } else { //if the user cookie isn't present, a page without a "save" button is rendered
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


//Deletes from the "owns" collection
router.delete('/:id/', (req, res) => {
    Saved.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/legos/saved')
    })
})


module.exports = router;

const express = require('express');
const Created = require('../models/new.js')
const Lego = require('../models/legos.js')
const router = express.Router();


router.put('/:id', (req, res) => {
    console.log(req.body);
    Created.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
        console.log(error);
        console.log(updatedModel);
        res.redirect('/new')
    })
})



router.get('/', (req, res) => {
    if(req.session.username) {
        Created.find({username: req.session.username}, null, {sort: {name: 1}}, (error, newLego) => {
            res.render(
                'legos/new-index.ejs',
                {
                    created: newLego,
                    username:(req.session.username).charAt(0).toUpperCase() + (req.session.username).slice(1)
                }
            );
        });
    } else {
        res.redirect('/')
    }

});

router.get('/create', (req, res) => {
    res.render(
        'legos/new.ejs',
        {
            username: req.session.username
        }
    )
})


router.post('/', (req, res) => {
    if(req.session.username) {
        if(req.body.gender === "male" && req.body.mood === "happy") {
            req.body.img = "/images/new/happy_guy.jpg"
        } else if (req.body.gender === "male" && req.body.mood === "angry") {
            req.body.img = "/images/new/angry_guy.jpg"
        } else if (req.body.gender === "male" && req.body.mood === "scared") {
            req.body.img = "/images/new/scared_guy.jpg"
        } else if  (req.body.gender === "female" && req.body.mood === "happy") {
            req.body.img = "/images/new/happy_girl.jpg"
        } else if  (req.body.gender === "female" && req.body.mood === "angry") {
            req.body.img = "/images/new/angry_girl.jpg"
        } else if  (req.body.gender === "female" && req.body.mood === "scared") {
            req.body.img = "/images/new/scared_girl.jpg"
        }

        req.body.series = "Future Lego Series"
        req.body.year = 2019
        req.body.username = req.session.username
        Created.create(req.body, (error, createdLego) => {
            console.log(createdLego);
            res.redirect('/new')

        })
    }

})

router.get('/:id/edit', (req, res) => {
        Created.findById(req.params.id, (err, foundLego) => {
            res.render(
                'legos/edit.ejs',
                {
                    lego:foundLego
                }
            );
        })

})



router.delete('/:id', (req, res) => {
    Created.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/new')
    })
})

module.exports = router;

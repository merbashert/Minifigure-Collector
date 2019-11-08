const express = require('express');
const Created = require('../models/new.js')
const Lego = require('../models/legos.js')
const router = express.Router();


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

router.get('/', (req, res) => {
    if(req.session.username) {
        Created.find({}, null, {sort: {name: 1}}, (error, newLego) => {
            res.render(
                'legos/new-index.ejs',
                {
                    created: newLego
                }
            );
        });
    } else {
        res.redirect('/')
    }

});

router.get('/create', (req, res) => {
    res.render(
        'legos/new.ejs'
    )
})


router.post('/', (req, res) => {
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
    Created.create(req.body, (error, createdLego) => {
        res.redirect('/new')

    })
})

// router.post('/', (req, res) => {
//     if(req.body.happyguy === "on") {
//         req.body.img = "/images/new/happy_guy.jpg"
//     } if(req.body.happygirl === "on") {
//         req.body.img = "/images/new/happy_girl.jpg"
//     }if(req.body.angryguy === "on") {
//         req.body.img = "/images/new/angry_guy.jpg"
//     }if(req.body.angrygirl === "on") {
//         req.body.img = "/images/new/angry_girl.jpg"
//     }if(req.body.scaredguy === "on") {
//         req.body.img = "/images/new/scared_guy.jpg"
//     }if(req.body.scaredgirl === "on") {
//         req.body.img = "/images/new/scared_girl.jpg"
//     }
//     console.log(req.body);
//     req.body.series = "Future Lego Series"
//     req.body.year = 2019
//     Created.create(req.body, (error, createdLego) => {
//         res.redirect('/new')
//
//     })
// })


router.delete('/:id', (req, res) => {
    Created.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/new')
    })
})

module.exports = router;

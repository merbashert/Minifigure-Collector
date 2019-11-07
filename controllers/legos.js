const express = require('express');
const Lego = require('../models/legos.js')
const Saved = require('../models/saved.js')
const router = express.Router();


router.get('/seed', (req, res)=>{
    Lego.create([
        {
            name: "DJ",
            series:	2,
            year: 2010,
            img: "/images/series2/series/dj.jpg"
        },

        {
            name: "Jungle Explorer",
            series:	2,
            year: 2010,
            img: "/images/series2/jungle-explorer.jpg"
        },

        {
            name: "Karate Master",
            series:	2,
            year: 2010,
            img: "/images/series2/karate-master.jpg"
        },

        {
            name: "Lifeguard",
            series:	2,
            year: 2010,
            img: "/images/series2/lifeguard.jpg"
        },

        {
            name: "Mexican",
            series:	2,
            year: 2010,
            img: "/images/series2/mexican.jpg"
        },

        {
            name: "Mime Artist",
            series:	2,
            year: 2010,
            img: "/images/series2/mime-artist.jpg"
        },

        {
            name: "Pharaoh",
            series:	2,
            year: 2010,
            img: "/images/series2/pharaoh.jpg"
        },

        {
            name: "Pop Star",
            series:	2,
            year: 2010,
            img: "/images/series2/pop-star.jpg"
        },

        {
            name: "Ringmaster",
            series:	2,
            year: 2010,
            img: "/images/series2/ringmaster.jpg"
        },

        {
            name: "Skier",
            series:	2,
            year: 2010,
            img: "/images/series2/skier.jpg"
        },

        {
            name: "Spartan",
            series:	2,
            year: 2010,
            img: "/images/series2/spartan.jpg"
        },

        {
            name: "Surfer",
            series:	2,
            year: 2010,
            img: "/images/series2/surfer.jpg"
        },

        {
            name: "Traffic Cop",
            series:	2,
            year: 2010,
            img: "/images/series2/traffic-cop.jpg"
        },

        {
            name: "Vampire",
            series:	2,
            year: 2010,
            img: "/images/series2/vampire.jpg"
        },

        {
            name: "Weightlifter",
            series:	2,
            year: 2010,
            img: "/images/series2/weightlifter.jpg"
        },

        {
            name: "Witch",
            series:	2,
            year: 2010,
            img: "/images/series2/witch.jpg"
        }
    ], (err, data)=>{
        res.redirect('/legos');
    })
});

router.get('/', (req, res) => {
    if(req.session.username) {
        Lego.find({}, (error, legos) => {
            res.render(
                'legos/index.ejs',
                {
                    legos:legos
                }
            );
        });
    } else {
        res.redirect('/')
    }

});

router.get('/new', (req, res) => {
    res.render('legos/new.ejs');
});

router.get('/:id/series', (req, res) => {
    Lego.find({series: req.params.id}, (err, foundLego) => {
        res.render(
            'legos/results.ejs',
            {
                legos: foundLego,
                series: req.params.id
            }
        );
    });
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

router.get('/:id', (req, res) => {
    Lego.findById(req.params.id, (err, foundLego) => {
        res.render(
            'legos/show.ejs', {
                lego: foundLego
            }
        );
    });
});


router.put('/:id', (req, res) => {
    Lego.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedLego) => {
        res.redirect('/legos')
    })
})

router.get('/:id/edit', (req, res) => {
    Lego.findById(req.params.id, (err, foundLego) => {
        res.render(
            'legos/edit.ejs',
            {
                lego:foundLego
            }
        );
    })
})

router.post('/:id/save', (req, res) => {
    Lego.findById(req.params.id, (err, savedLego) => {
        savedLogo.save
    })
})


router.post('/', (req, res) => {
    if(req.body.happyguy === "on") {
        req.body.img = "/images/new/happy_guy.jpg"
    } if(req.body.happygirl === "on") {
        req.body.img = "/images/new/happy_girl.jpg"
    }if(req.body.angryguy === "on") {
        req.body.img = "/images/new/angry_guy.jpg"
    }if(req.body.angrygirl === "on") {
        req.body.img = "/images/new/angry_girl.jpg"
    }if(req.body.scaredguy === "on") {
        req.body.img = "/images/new/scared_guy.jpg"
    }if(req.body.scaredgirl === "on") {
        req.body.img = "/images/new/scared_girl.jpg"
    }
    req.body.series = "Future Lego Series"
    req.body.year = 2019
    Lego.create(req.body, (error, createdLego) => {
        res.redirect('/legos')
    })
})

router.delete('/:id', (req, res) => {
    Lego.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/legos')
    })
})

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
});

router.post('/', (req, res) => {
    User.findOne({username:req.body.username}, (error, foundUser) => {
        if (foundUser ===null) {
            res.redirect('/sessions/new')
        } else {
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
            if(doesPasswordMatch){
                req.session.username = foundUser.username;
                res.redirect('/legos')
            } else {
                res.redirect('/sessions/new')
            }
        }
    })

})

router.post('/destroy', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
        } else {
            res.redirect('/')
        }
    })
})
module.exports = router;

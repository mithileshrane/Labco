var express = require('express');
var router = express.Router();
const login = require('../controllers/authenticate.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.post('/login', function (req, res, next) {
    console.log(req.body.username)
    const username = req.body.username;
    let loginResult = login(req, req.body.password);

    if (loginResult) {
        res.render('users', {username: loginResult.email});
    }
    else {
        res.render('index', {error: true});
    }
});

module.exports = router;
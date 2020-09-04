var express = require('express');
var router = express.Router();
var Village = require('../models/regionModel');

/* GET home page. */
router.get('/', function (req, res) {
    Village.find(function (err, villages) {
        if (err) {
            return res.status(500).send({error: 'database failure'});
        }
        //console.log('get vill')
        res.render('index', {villageList: villages, title: 'Express'});
    });
});

module.exports = router;

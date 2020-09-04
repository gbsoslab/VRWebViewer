var express = require('express');
var router = express.Router();
var VRItem = require('../models/vrModel');

/* GET home page. */
//router.get('/', function(req, res, next) {
//    res.render('vr', { title: 'Express' });
//});

router.get('/:vid', function(req, res) {
    VRItem.find({community_id: req.params.vid}, function (err, vritem) {
        if (err) return res.status(500).json({ error: err });
        if (!vritem) return res.status(404).json({ error: 'vritem not found' });
        return res.render('vr_item', { vrlist: vritem });
    })
});

module.exports = router;

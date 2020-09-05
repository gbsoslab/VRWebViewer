var express = require('express');
var router = express.Router();
var Region = require('../models/regionModel');



router.get('/:id', function (req, res) {
    Region.findOne({_id: req.params.id}, function (err, region) {
        if (err) return res.status(500).json({ error: err });
        if (!region) return res.status(404).json({ error: 'region not found' });
        res.render('region-view', { region: region })
    })
});

module.exports = router;
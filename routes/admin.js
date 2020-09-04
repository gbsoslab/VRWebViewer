var express = require('express');
var router = express.Router();
var RegionModel = require('../models/regionModel');
var VRItem = require('../models/vrModel')
var fs = require('fs')

router.get('/', function (req, res) {
    RegionModel.find(function (err, villages) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.render('region-list-view', { regionList: villages });
    });
});

router.get('/new', function (req, res) {
    res.render('region-add',);
});

router.post('/new', function (req, res) {
    var village = new RegionModel();
    var body = req.body;
    village.name = body.villageName;
    village.location = body.location;
    village.save(function (err) {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
    });
    res.redirect('/admin/regions');
});

router.post('/add_item', function (req, res) {
    var vritem = new VRItem();
    var body = req.body;

    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    /*
    // VR Image
    let VRImage = req.files.VRImage;
    let VRImagePath = '../public/images/360/'+ VRImage.name;

    // Use the mv() method to place the file somewhere on your server
    VRImage.mv(VRImagePath, function(err) {
        if (err)
            return res.status(500).send(err);

        //res.send('File uploaded!');
    });

    // VRThumbnail
    let VRThumb = req.files.VRThumb;
    let VRThumbPath = '../public/images/360/'+ VRThumb.name;
    // Use the mv() method to place the file somewhere on your server
    VRThumb.mv(VRThumbPath, function(err) {
        if (err)
            return res.status(500).send(err);

        //res.send('File uploaded!');
    });
    */
    vritem.region_id = body.vrid;
    vritem.scene_name = body.SceneName;
    //vritem.image_file = '/images/360/' + VRImage.name;
    //vritem.thumb_file = '/images/360/' + VRThumb.name;
    vritem.save(function (err) {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
    });
    res.redirect('/admin/regions');
});


router.delete('/:id', function (req, res) {
    console.log('triggered');
    console.log(req.params.id);
    RegionModel.remove({ _id:req.params.id }, function (err, output) {
        if(err) return res.status(500).json({ error: "database failure" });

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "book not found" });
        res.json({ message: "book deleted" });
        */

        console.log('check');

        //res.end();
    })

    VRItem.remove({ region_id:req.params.id }, function (err, output) {
        if(err) return res.status(500).json({ error: "database failure" });

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "book not found" });
        res.json({ message: "book deleted" });
        */

        console.log('check');

        //res.end();
    })
    res.redirect('/admin/regions/');
});

router.get('/add_vr/:id', function (req, res) {
    console.log(req.params.id);
    res.render('vr-add', {community_id:req.params.id});
});

router.get('/:id', function (req, res) {

});

module.exports = router;

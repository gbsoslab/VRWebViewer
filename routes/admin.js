var express = require('express');
var router = express.Router();
var RegionModel = require('../models/regionModel');
var VRItem = require('../models/vrModel')
const upload = require("../models/upload");

router.get('/', function (req, res) {
    RegionModel.find(function (err, regions) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.render('region-list-view', { regionList: regions });
    });
});

router.get('/new', function (req, res) {
    res.render('region-add',);
});

router.post('/new', function (req, res) {
    var region = new RegionModel();
    var body = req.body;
    region.name = body.regionName;
    region.location = body.regionLocation;
    region.save(function (err) {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
    });
    res.redirect('/admin/regions');
});

router.post('/add_item', async (req, res) => {
    try 
    {
        await upload(req, res);
        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        var vritem = new VRItem();
        var body = req.body;

        if (!req.file)
            return res.status(400).send('No files were uploaded.');
   
        vritem.region_id = body.vrid;
        vritem.scene_name = body.SceneName;
        vritem.image_file = req.file.filename;

        res.redirect('/admin/regions');
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload image: ${error}`);
  }
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
    res.render('vr-add', {region_id:req.params.id});
});

router.get('/:id', function (req, res) {

});

module.exports = router;

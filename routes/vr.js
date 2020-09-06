var express = require('express');
var router = express.Router();
var VRItem = require('../models/vrModel');
var mongoose = require('mongoose');

/* GET home page. */
//router.get('/', function(req, res, next) {
//    res.render('vr', { title: 'Express' });
//});

// init gfs
const mongoURI = "mongodb://localhost:27017/vr_images";

// connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "images"
  });
});


router.get('/:vid', function(req, res) {
    VRItem.find({region_id: req.params.vid}, function (err, vritem) {
        if (err) return res.status(500).json({ error: err });
        if (!vritem) return res.status(404).json({ error: 'vritem not found' });
        gfs.find({'filename':vritem[0].image_file}).toArray((err, files) => {
		    // check if files
		    if (!files || files.length === 0) {
		    	console.log(files)
		      return res.render("vr_item", {
		        vrlist: files
		      });
		    } 
	    	else 
	    	{
	    		console.log(files)
			    return res.render("vr_item", { vrlist: files });
		    }
	    })
    })
});

router.get("/image/:filename", (req, res) => {
  console.log('id', req.params.id)
  const file = gfs
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

module.exports = router;
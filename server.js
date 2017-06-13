// // // // // // // // // // // // // 
//// // // //  Express// // // // // 
// // // // // // // // // // // // 
var express = require("express");
var app = express();

// // // // // // // // // // // 
//// //  Body Parser// // // // 
// // // // // // // // // // /
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// // // // // // // // // // // 
// // // //  Session // // // // 
// // // // // // // // // // // 

var cookieSession = require("cookie-session");
var secrets = require("./secrets/secrets.js");

var session = require("express-session");
app.use(session({
	secret: secrets.expressSecret, // secret key
	resave: false, // default value
	saveUninitialized: true, // saves empty objects
}));



// // // // // // // // // // // 
// // // // // MongoDB// // // // 
// // // // // // // // // // //
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;
var db; 
mongodb.MongoClient.connect('mongodb://localhost', function(err, database) {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Connected to Database");
	db = database;
	startListening();
});



// // // // // // // // // // // 
// // // // // Multer// // // // 
// // // // // // // // // // // 
var multer = require("multer");
var upload = multer({
	dest: __dirname + '/uploads',
	limits: {
		fileSize: 10000000, // 10mb
	}
});

// // // // // // // // // // // 
// // // Upload Images // // // 
// // // // // // // // // // // 

app.post('/savefile', upload.single('myfile'), function(req, res) {
	console.log(req.file);
	console.log(req.body);
	res.send(req.file.filename);
});

app.get('/uploads/:hash', function(req, res) {
	res.setHeader('Content-Type', 'image/jpeg');

	res.sendFile(__dirname + '/uploads/' + req.params.hash);
});

app.get('/uploads/:hash', function(req, res){

});

// // // // // // // // // // // 
// // // Get Memories  // // // 
// // // // // // // // // // // 

app.get('/api/memories', function(req, res) {
	db.collection('memories').find({}).toArray(function(err, data){
		if (err) {
			console.log(err);
			res.status(500);
			res.send("error");
			return;
		}
		console.log("MEMORIES:", data);
		res.send(data);
	});
});

 // // // // // // //  // // // // 
// // // Post New Memory // // // 
// // // // // // // // // // // 
app.post('/api/newMemory', function(req, res) {
	db.collection('memories').insertOne(
	{   title: req.body.title, 
        user: req.body.user,
		owner: req.body.owner, 
        giver: req.body.giver,
        description: req.body.description, 
        category: req.body.category,
        picture: req.body.picture,
	},
		function(err, data) {
			if (err) {
				console.log(err);
				res.status(500);
				res.send("Error posting memory!");
				return;
			}
			res.send(data);
	});
});

   /////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////MIDDLEWARE///////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
  // // // // // // // // // // ///
 // // // Serve Static Files // // 
// // // // // // // // // // /// 
app.use(express.static('public'));

// // // // // // // // // // // 
// // //404 Middleware // // //
// // // // // // // // // // // 
app.use(function(req, res, next) {
	res.status(404);
	res.send("404 File Not Found ... :( ");
});

// // // // // // // // // // // 
// // // 500 Middleware // // //
// // // // // // // // // // // 
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send("500 Internal server error... D:");
});

// // // // // // // // // // // 
//  // //Start the Server! // //
// // // // // // // // // // // 
function startListening() {
	app.listen(8080, function() {
		console.log("👏🏼 LUKE, I AM YOUR SERVER! Listin in port 8080");
	});
}
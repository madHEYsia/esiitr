var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');

var fs = require('fs'),
    https = require('https');

/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());
//RESTful route
var router = express.Router();

var PythonShell = require('python-shell');

/*------------------------------------------------------
*  This is router middleware,invoked everytime we hit url
*  we can use this for doing validation,authetication
--------------------------------------------------------*/
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// -----------------------------------------------------------------------------

var home = router.route('/');

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /api/user/:user_id it hit.

------------------------------------------------------*/

var home = router.route('/');
home.get(function(req,res,next){
  res.render('index', {data: ""});
});

var pythonApi = router.route('/wiki');
pythonApi.get(function(req,res,next){
	var options = {
		args: req.query.s.split(" ")		
	};

	PythonShell.run('C:/Users/submi/Desktop/wikipedia-question-generator/wikitrivia/scripts/wikitrivia.py', options, function (err, results) {
	console.log(results);


	if (err) 
		res.render('index', {data: ""});
	else
		res.render('index', {data: results});
	});
});

//now we need to apply our router here
app.use(router);

//start Server
var server = app.listen(process.env.PORT || 1337,function(){

   console.log("Listening to port %s",server.address().port);

});

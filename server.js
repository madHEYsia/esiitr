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

// var options = {
// 	  args: ['salt']
// };

// PythonShell.run('C:/Users/submi/Desktop/wikipedia-question-generator/wikitrivia/scripts/wikitrivia.py', options, function (err, results) {
//   if (err) throw err;
//   // results is an array consisting of messages collected during execution
//   console.log(results);
// });

// -----------------------------------------------------------------------------

var home = router.route('/');

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /api/user/:user_id it hit.

------------------------------------------------------*/

var home = router.route('/');
home.get(function(req,res,next){
  res.render('index');
});

var pythonApi = router.route('/wiki');
pythonApi.get(function(req,res,next){
	console.log(req.params);
	console.log(req.query);
	res.send("Hi it's working");
});


// home.get(function(req,res,next){

//     var user_id = req.params.user_id;
//     res.render('index');

//     req.getConnection(function(err,conn){

//         if (err) return next("Cannot Connect");

//         var query = conn.query("SELECT * FROM t_user WHERE user_id = ? ",[user_id],function(err,rows){

//             if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//             }

//             //if user not found
//             if(rows.length < 1)
//                 return res.send("User Not found");

//             res.render('edit',{title:"Edit user",data:rows});
//         });
//     });

// });

// var nearby = router.route('/nearby');

// nearby.get(function(req,res,next){

//     var x = req.query.latitude;
//     var y = req.query.longitude;
//     var z = req.query.filter;
//     var isMale = req.query.isMale;
//     var isFemale = req.query.isFemale;
//     var isUnisex = req.query.isUnisex;
//     var isAccessibilityFeature = req.query.isAccessibilityFeature;
//     var isParkingAvailable = req.query.isParkingAvailable;
//     var isAdultChangeFacilityAvailable = req.query.isAdultChangeFacilityAvailable;
//     var isWaterSuitableForDrinking = req.query.isWaterSuitableForDrinking;

//     //inserting into mysql
//     req.getConnection(function (err, conn){

//         if (err) return next("Cannot Connect");

//         if(z=='nearest'){
//           var query = conn.query("Select *, (( "+x+" -latitude)*( "+x+" -latitude) + ( "+y+" -longitude)*( "+y+" -longitude)) as distance from janshauch.toilet Where (( "+x+" -latitude)*( "+x+" -latitude) + ( "+y+" -longitude)*( "+y+" -longitude)) < 0.014*0.014  AND isMale>="+isMale+" AND isFemale>="+isFemale+" AND isUnisex>="+isUnisex+" AND isAccessibilityFeature>="+isAccessibilityFeature+" AND isParkingAvailable>="+isParkingAvailable+" AND isAdultChangeFacilityAvailable>="+isAdultChangeFacilityAvailable+" AND isWaterSuitableForDrinking>="+isWaterSuitableForDrinking+" ORDER BY distance desc", function(err, rows){
//            if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//            }
//           res.send(rows);
//         });
//         }
//         else{
//           var query = conn.query("Select *, (( "+x+" -T.latitude)*( "+x+" -T.latitude) + ( "+y+" -T.longitude)*( "+y+" -T.longitude)) as distance from janshauch.toilet as T, janshauch.feedback as R Where (( "+x+" -T.latitude)*( "+x+" -T.latitude) + ( "+y+" -T.longitude)*( "+y+" -T.longitude)) < 0.014*0.014  AND T.latitude=R.latitude  AND T.longitude=R.longitude  AND isMale>="+isMale+" AND isFemale>="+isFemale+" AND isUnisex>="+isUnisex+" AND isAccessibilityFeature>="+isAccessibilityFeature+" AND isParkingAvailable>="+isParkingAvailable+" AND isAdultChangeFacilityAvailable>="+isAdultChangeFacilityAvailable+" AND isWaterSuitableForDrinking>="+isWaterSuitableForDrinking+" ORDER BY distance desc", function(err, rows){
//             // Select *, (21.25-T.latitude)*(21.25-T.latitude) + (81.62-T.longitude)*(81.62-T.longitude) as distance from janshauch.toilet as T, janshauch.feedback as R Where (21.25-T.latitude)*             (21.25-T.latitude) + (81.62-T.longitude)*(81.62-T.longitude) <  0.014*0.014  AND T.latitude=R.latitude  AND T.longitude=R.longitude ORDER BY distance desc;          
//            if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//            }
//           res.send(rows);
//         });
//         }
//      });

// });

//now we need to apply our router here
app.use(router);

//start Server
var server = app.listen(process.env.PORT || 1337,function(){

   console.log("Listening to port %s",server.address().port);

});

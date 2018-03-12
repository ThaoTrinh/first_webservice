//var readline = require('readline-sync');
var math = require('mathjs');
var express = require('express');
app = express();

//var longA = readline.question("long A: ");
//var latA  = readline.question("lat A: ");
//var longB = readline.question("long B: ");
//var latB  = readline.question("lat B: ");

const PI = 3.14159265358979323846;
const earthRadiusKm = 6371.0;

function distanceEarth(longA, latA, longB, latB){
    longA = longA * PI/180;
    latA  = latA * PI/180;
    longB = longB * PI/180;
    latB  = latB * PI/180;

    var u = math.sin((latB-latA)/2);
    var v = math.sin((longB - longA)/2);

    return 2*earthRadiusKm * math.asin(math.sqrt(u*u + math.cos(latA) *math.cos(latB)*v*v));

};

app.get('/',function(req,res){
   return res.send({home: "Try get '/distance?latA=22&longA=22&latB=22&longB=22'"});
});
//console.log(distanceEarth(longA, latA, longB, latB));
app.get('/distance',function(req,res){
   var latA = req.query.latA;
   var longA = req.query.longA;
   var latB = req.query.latB;
   var longB = req.query.longB;
   if(!latA || !longA || !longB || !latB){
      res.status(404);
      return res.send({error: '404'});
   }
   return res.send({result: distanceEarth(longA, latA, longB, latB)});
});

app.use(function(err, req, res, next){
   console.error(err.stack);
   res.status(404).send({error: '404'});
});

app.get('*', function(req,res){
   res.redirect('/');
});

app.listen(process.env.PORT || 1337);


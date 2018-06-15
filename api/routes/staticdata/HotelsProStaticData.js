
const bodyParser = require('body-parser');
const fs = require('fs');


const countries = require('./HotelsProStaticData/countries-0.json');


/** final coutry / city added */
allCountries = function (req, res, dbs) {
  var code = req.query.code;
  console.log("===========");
  console.log(code);
  var requestStart = Date.now();//.sort({ code: 1 }) { continent: code }
  dbs.production.collection("hotelCountries").find({ continent: code }).sort({ count: -1 }).limit(300).toArray(function (err, results) {
    if (err) throw err;
    console.log("allCountries services is took " + (Date.now() - requestStart) / 1000 + " seconds");
    res.send(results);
  });
}

addAllCountries = function (req, res, dbs) {
  dbs.production.createCollection("hotelCountries", function (err, response) {
    if (err) throw err;
    console.log("Collection hotelCountries created!");
  });

  const countries = require('./HotelsProStaticData/countries-0.json');
  console.log('===>' + countries.length + ' --- ');
  dbs.production.collection("hotelCountries").insertMany(countries, function (err, response) {
    if (err) throw err;
    console.log("Number of hotelCountries inserted: " + response.insertedCount);
    res.send({ "status": "done" });
  });
}
addAllContinents = function (req, res, dbs) {
  dbs.production.createCollection("continents", function (err, response) {
    if (err) throw err;
    console.log("Collection continents created!");
  });

  const countries = require('./HotelsProStaticData/continents-0.json');
  console.log('===>' + countries.length + ' --- ');
  dbs.production.collection("continents").insertMany(countries, function (err, response) {
    if (err) throw err;
    console.log("Number of continents inserted: " + response.insertedCount);
    res.send({ "status": "done" });
  });
}

continents = function (req, res, dbs) {
  
  var requestStart = Date.now();
  //.project({ country: 1, code: 1 })
   dbs.production.collection('continents').find({}).toArray((err, docs) => {
    if (err) {
      console.log(err)
    } else {
      res.send(docs);
    }
  })
}

dublicateAllCountriesRemove = function (req, res, dbs) {
  var code = req.query.code;
  console.log("startted");
  var requestStart = Date.now();
  //.project({ country: 1, code: 1 })
   dbs.production.collection('hotelsproHotels').find({ country: code }).project({ country: 1, code: 1 }).toArray((err, docs) => {
    if (err) {
      console.log(err)

    } else {
      var i = 1;
      //console.log(docs);
      console.log(code +"---> total count"+docs.length);

      const myqueryCheck = { code: code };
      //console.log(myqueryCheck);
      const newvalues = { $set: { updated_at: "yes", count: docs.length } };
      //console.log(newvalues);
      dbs.production.collection("hotelCountries").updateMany(myqueryCheck, newvalues, function (err, resp) {
        if (err) throw err;
        console.log("Number of record updated hotelCountries hotelDestination : " + resp);
      });
      /*docs.forEach(function (element) {
        if (i !== 1) {
          var myquery = { _id: element._id };
          console.log(myquery);

          dbs.production.collection('hotelCountries').deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted" + element._id);
          });
        }
        i++;
      });*/
      res.send({ "status": "done" });
    }
  })
}

hotelsproCitiesAdd = function (req, res, dbs) {
  var Pstart = parseInt(req.query.page);
  const destinations = require('./HotelsProStaticData/destinations-' + Pstart + '.json');
  // dbs.production.createCollection("hotelsproCities", function (err, res) {
  //   if (err) throw err;
  //   console.log("Collection hotelsproCities created!");
  // });
  dbs.production.collection("hotelsproCities").insertMany(destinations, function (err, response) {
    if (err) throw err;
    console.log("Number of hotelsproCities inserted: " + response.insertedCount);
  });
  res.send({ "status": "done" });
}
allCities = function (req, res, dbs) {
  var countrycode = req.query.code;
  var requestStart = Date.now();//.sort({ code: 1 })
  dbs.production.collection("hotelsproCities").find({ country: countrycode }).limit(1000).toArray(function (err, results) {
    if (err) throw err;
    console.log("allCities services is took " + (Date.now() - requestStart) / 1000 + " seconds");
    res.send(results);
  });
}
updateCityStart = function (req, res, dbs) {

  var requestStart = Date.now();
  dbs.production.collection("hotelsproCities").find({ updated_at: { $ne: 'yes' } }).limit(1).toArray(function (err, results) {
    if (err) throw err;
    console.log("allCities services is took " + (Date.now() - requestStart) / 1000 + " seconds");
    var countrycode = results[0].country;
    var countryname = results[0].name;
    var code = results[0].code;

    dbs.production.collection("hotelCountries").find({ code: countrycode }).limit(1).toArray(function (err, result) {
      if (err) throw err;
      //console.log("countryname " + result[0].name);
      const myqueryCheck = { code: code, name: countryname };
      //console.log(myqueryCheck);
      const newvalues = { $set: { updated_at: "yes", des: countryname + ', ' + result[0].name } };
      //console.log(newvalues);
      dbs.production.collection("hotelsproCities").updateMany(myqueryCheck, newvalues, function (err, resp) {
        if (err) throw err;
        console.log("Number of record updated hotelsproCities hotelDestination : " + resp);
      });

    });
    res.send({"status": "done"});
  });
}

hotelsproHotelsAdd = function (req, res, dbs) {
  var Pstart = parseInt(req.query.code);
  const hotels = require('./HotelsProStaticData/hotels-' + Pstart + '.json');
  dbs.production.createCollection("hotelsproHotels", function (err, res) {
    if (err) throw err;
    console.log("Collection hotelsproHotels created!");
  });
  dbs.production.collection("hotelsproHotels").insertMany(hotels, function (err, response) {
    if (err) throw err;
    console.log("Number of hotelsproHotels inserted: " + response.insertedCount);
  });
  res.send({ "status": "done" });
}

hotelview = function (req, res, dbs) {
  var code = req.query.code;
  var requestStart = Date.now();//.sort({ code: 1 })
  //project({ destination: 1, code: 1, name: 1, star: 1, addr: 1, zip: 1, img: 1 }).
  dbs.production.collection("hotelsproHotels").find({destination: code}).project({ destination: 1, code: 1, name: 1, stars: 1, address: 1, zipcode: 1, updated_at: 1 }).limit(1000).toArray(function (err, results) {
    if (err) throw err;
    console.log("hotelview services is took " + (Date.now() - requestStart) / 1000 + " seconds");
    res.send(results);
  });
}


/** extra code delete */
/**  
hotelDestination = function (req, res, dbs) {
   var Pstart = parseInt(req.query.recordstart); 
   var Pend = parseInt(req.query.recordend); 
    for (let recordid = Pstart; recordid <= Pend; recordid++) {
     const destinations = require('./HotelsProStaticData/destinations-' + recordid + '.json');
     console.log('===>' + destinations.length + ' --- '+ recordid);
     var JSONObj = {};
     var title = [];
     for (let record = 0; record < destinations.length; record++) {
       title[record] = {
         code: destinations[record].code,
         des: destinations[record].name,
         cou: destinations[record].country,
         count: 0
       };
     }
     // dbs.production.createCollection("hotelDestination", function (err, res) {
     //   if (err) throw err;
     //   console.log("Collection hotelDestination created!");
     // });
     dbs.production.collection("hotelDestination").insertMany(title, function (err, res) {
       if (err) throw err;
       console.log("Number of hotelDestination inserted: " + res.insertedCount);
     });
    }  */


  /*
     dbs.production.collection('hotelCountries').find({}).limit(300).toArray((err, fullresult) => {
      if (err) {
        console.log(err)
        res.error(err)
      } else {
  
        fullresult.forEach(function (countries) {
          console.log("===");
          var cccode = countries.code;
          var cccnaame = countries.name;
          console.log(cccode + "==" + cccnaame);
          const myqueryCheck = { cou: cccode };
          const newvalues = { $set: { cou: cccnaame } };
          console.log(cccnaame);
          dbs.production.collection("hotelDestination").updateMany(myqueryCheck, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Number of record updated hotelDestination : " + res);
          });
        })
      }
    })  

  dbs.production.collection('hotelDestination').find({ count: 0 }).limit(500).toArray((err, fullresult) => {
    if (err) {
      console.log(err)
      res.error(err)
    } else {

      fullresult.forEach(function (countries) {
        console.log("===");
        var destinations = (countries.des + ', ' + countries.cou).toLowerCase()
        console.log(destinations);
        const myqueryCheck = { code: countries.code };
        const newvalues = { $set: { des: destinations, count: 1 } };
        dbs.production.collection("hotelDestination").updateMany(myqueryCheck, newvalues, function (err, res) {
          if (err) throw err;
          console.log("Number of record updated hotelDestination : " + res);
        });
      })
    }
  })
};

 
hotelCountries = function (req, res, dbs) {

  /* dbs.production.createCollection("hotelCountries", function (err, res) {
    if (err) throw err;
    console.log("Collection hotelCountries created!");
  });

  const countries = require('./HotelsProStaticData/countries-0.json');
   console.log('===>' + countries.length + ' --- ');
   dbs.production.collection("hotelCountries").insertMany(countries, function (err, res) {
     if (err) throw err;
     console.log("Number of hotelCountries inserted: " + res.insertedCount);
   });   

  /*dbs.production.collection('hotelCountries').find({}).limit(20000).toArray((err, docs) => {
    if (err) {
      console.log(err)
      res.error(err)
    } else {
      // var i = 1;
      //  docs.forEach(function (element) {
      //    if (i > 0) {
      //      var myquery = { code: element.code };
      //      dbs.production.collection('hotelCountries').deleteOne(myquery, function (err, obj) {
      //        if (err) throw err;
      //        console.log("1 document deleted" + element.code);
      //      });
      //    }
      //    i++;
      //  });  
      var destinationsView = [];
      for (let i = 0; i < docs.length; i++) {
        destinationsView[i] = {
          code: docs[i].code,
          des: docs[i].des
        };
      }
      res.json(destinationsView)
    }
  })
}; 
hotelAdd = function (req, res, dbs) {
  // dbs.production.createCollection("hotellist", function (err, res) {
  //   if (err) throw err;
  //   console.log("Collection hotellist created!");
  // });
  for (let recordid = 421; recordid <= 450; recordid++) {
    const hotellist = require('./HotelsProStaticData/hotels-' + recordid + '.json');
    console.log('===>' + hotellist.length + ' --- ' + recordid);
    var JSONObj = {};
    var title = [];
    var imgs = '';
    var finalStar = 0;
    var finalzip = '';
    for (let record = 0; record < hotellist.length; record++) {
      if (hotellist[record].images) {
        imgs = hotellist[record].images[0].original
        //console.log(imgs);
      } else {
        imgs = "";
      }
      if (hotellist[record].stars === null) {
        finalStar = 11;
      } else {
        finalStar = parseInt(hotellist[record].stars)
      }
      if (hotellist[record].zipcode === null) {
        finalzip = "none";
      } else {
        finalzip = hotellist[record].zipcode;
      }
      title[record] = {
        code: hotellist[record].code,
        name: hotellist[record].name,
        star: finalStar,
        addr: hotellist[record].address,
        zip: finalzip,
        long: hotellist[record].longitude,
        lati: hotellist[record].latitude,
        img: imgs
      };
    }
    //console.log(title);
    dbs.production.collection("hotellist").insertMany(title, function (err, res) {
      if (err) throw err;
      console.log("Number of hotellist inserted: " + res.insertedCount);
    });
    console.log("done");
  }
};

hotelDetailsAdd = function (req, res, dbs) {
  var Pstart = parseInt(req.query.recordstart);
  var Pend = parseInt(req.query.recordend);
  // dbs.production.createCollection("hotelDetail", function (err, res) {
  //   if (err) throw err;
  //   console.log("Collection hotellist created!");
  // });
  //console.log(Pstart +'==='+ Pend);
  for (let recordid = Pstart; recordid <= Pend; recordid++) {
    const hotellist = require('./HotelsProStaticData/hotels-' + recordid + '.json');
    console.log('===>' + hotellist.length + ' --- ' + recordid);
    var title = [];
    for (let record = 0; record < hotellist.length; record++) {
      title[record] = hotellist[record];
    }
    //console.log(title);
    dbs.production.collection("hotelDetail").insertMany(title, function (err, res) {
      if (err) throw err;
      console.log("Number of hotelDetail inserted: " + res.insertedCount);
    });

    console.log("record is insert please wait 1min or page start ::" + Pstart + " and page end :: " + Pend);
    console.log("done");
  }
};*/


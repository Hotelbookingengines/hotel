
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const hotelPrice = require('./HotelPrice');

exports.searchHistory = function (req, res, callback) {
    var desginKey = '';
    const url = 'mongodb://localhost:27017/';
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("hotels");

        dbo.createCollection("searchHistoryHotel", function (err, res) {
            if (err) throw err;
            console.log("Collection searchHistoryHotel created!");
          //  db.close();
        });
 

        dbo.collection("searchHistoryHotel").find({ "searchParam": req.body.queryUrl }).limit(1).toArray(function (err, results) {
            if (err) throw err;
            console.log(results);
            if (results.length === 1) {
                const myquery = { searchParam: results[0].searchParam };
                const newvalues = { $set: { Count: results[0].Count + 1 } };
                dbo.collection("searchHistoryHotel").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("Number of searchHistoryHotel updated: " + res);
                    desginKey = results[0]._id;
                    //res.write('>>>>> ' + desginKey);
                    db.close();
                });
            } else {
                const myobj = [{ searchParam: req.body.queryUrl, desginKey: 'hotelKeyTest', Count: 100 }];
                dbo.collection("searchHistoryHotel").insert(myobj, function (err, res) {
                    if (err) throw err;
                    console.log("Number of searchHistoryHotel inserted: " + res.insertedCount);

                    console.log("------insert keyyyy---- " + res.insertedIds);
                    hotelPrice.hotelPrice(req, res, res.insertedIds);
                    // callback(err, results);
                    desginKey = res.insertedIds;
                    //res.write('>>>>> ' + desginKey);
                    db.close();
                });
                console.log("------searchHistory 1-----");
            }
            console.log("------searchHistory 2-----");
        });
        console.log("------searchHistory 3-----");
    });
    res.send("searchHistory json response done");
    //console.log("------searchHistory 4-----");
};

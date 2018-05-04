const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const fs = require('fs');

exports.hotelPrice = function (req, res, params) {
    const myobj = [
        {
            "code": 175141,
            "price": 81,
            "params": params
        }, {
            "code": 175142,
            "price": 82,
            "params": params
        },
        {
            "code": 175143,
            "price": 83,
            "params": params
        },
        {
            "code": 175144,
            "price": 84,
            "params": params
        },
        {
            "code": 175145,
            "price": 85,
            "params": params
        },
        {
            "code": 175146,
            "price": 86,
            "params": params
        },
        {
            "code": 175147,
            "price": 87,
            "params": params
        },
        {
            "code": 175148,
            "price": 88,
            "params": params
        },
        {
            "code": 175149,
            "price": 89,
            "params": params
        },
        {
            "code": 175150,
            "price": 90,
            "params": params
        }
    ];

    const url = 'mongodb://localhost:27017/';
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
     
        const dbo = db.db("hotels");

  
        dbo.createCollection("hotelPrice", function (err, res) {
            if (err) throw err;
            console.log("Collection hotelPrice created!");
           // db.close();
        });


        dbo.collection("hotelPrice").insertMany(myobj, function (err, res) {
            if (err) throw err;
            //console.log(res);
            console.log("Number of hotelPrice inserted: " + res.insertedCount);
            //db.close();
        });
        dbo.collection("hotelPrice").find({}).toArray(function (err, results) {
            if (err) throw err;
            console.log("===== hotelprice start=====");
            console.log(results);
            console.log("===== hotelprice end =====");
        });

    });
    console.log('hotelPrice inserted record successfully');
};

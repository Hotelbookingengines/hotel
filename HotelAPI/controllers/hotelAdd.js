const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const fs = require('fs');
const myobjhotel = require('./hotel.json');
const myobjDetails = require('./hotelAmenities.json');

exports.hotelAdd = function (req, res, callback) {
    const url = 'mongodb://localhost:27017/';
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("hotels");

        dbo.createCollection("hotellist", function (err, res) {

            if (err) throw err;
            console.log("Collection hotellist created!");
            db.close();
        });
        dbo.createCollection("hotelDetails", function (err, res) {
            if (err) throw err;
            console.log("Collection hotelDetails created!");
            db.close();
        });
        dbo.collection("hotellist").insertMany(myobjhotel, function (err, res) {
            if (err) throw err;
            console.log(res);
            console.log("Number of hotellist inserted: " + res.insertedCount);
            callback(err, res);
            db.close();
        });
        dbo.collection("hotelDetails").insertMany(myobjDetails, function (err, res) {
            if (err) throw err;
            console.log(res);
            console.log("Number of hotelDetails inserted: " + res.insertedCount);
            callback(err, res);
            db.close();
        });
    });
    res.send('Hotel inserted record successfully');
};
exports.hotelDublicateRemove = function (req, res) {
    const url = 'mongodb://localhost:27017/';
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("hotels");
        dbo.collection("hotelPrice").find({}).toArray(function (err, results) {
            if (err) throw err;
            console.log(results.length);
            var i =1;
            results.forEach(function (element) {
                console.log(element.code + ' >>> ' + element._id + ' counter   ' + i);
                if (i > 11) {
                    var myquery = { _id: element._id };
                    dbo.collection("hotelPrice").deleteOne(myquery, function (err, obj) {
                        if (err) throw err;
                        console.log("1 document deleted");
                        db.close();
                    });
                    
                }
                i++;

            }); 
            
        });
       
        dbo.collection("hotelDetails").find({}).toArray(function (err, results) {
            if (err) throw err;
            console.log(results.length);
            var i=1;
            results.forEach(function (element) {
                console.log(element.code + ' >>> ' + element._id + ' counter   ' + i);
                if (i > 11) {
                    var myquery = { _id: element._id };
                    dbo.collection("hotelDetails").deleteOne(myquery, function (err, obj) {
                        if (err) throw err;
                        console.log("1 document deleted");
                        db.close();
                    });
                    
                }
                i++;

            });    
        });
        
        dbo.collection("hotellist").find({}).toArray(function (err, results) {
            if (err) throw err;
            //res.send(results);
            console.log(results.length);
            //console.log(results);
            var i = 1;
            results.forEach(function (element) {

                console.log(element.code + ' >>> ' + element._id + ' counter   ' + i);
                if (i > 11) {
                    var myquery = { _id: element._id };
                    dbo.collection("hotellist").deleteOne(myquery, function (err, obj) {
                        if (err) throw err;
                        console.log("1 document deleted");
                        db.close();
                    });
                    
                } i++;
            });
        });
       

    });
    res.send('Hotel remove record successfully');
};

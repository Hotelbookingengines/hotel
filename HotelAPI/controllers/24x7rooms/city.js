const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');

exports.cities = function cities(req, res) {
    const url = 'mongodb://localhost:27017/';
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("hotels");
        var task_names = [];
        var myobj = {};
        dbo.collection("24x7roomsCities").find({}).limit(10000000).toArray(function (err, results) {
            if (err) throw err;
            console.log("Collection 24x7roomsCities fetch created!");
            results.map(function (citi, index, array) {
                var aaa = citi.name + ', ' + citi.country_name;
                myobj = { value: citi.city_code, label: aaa };
                task_names.push(myobj)             
            });
            res.send(task_names);
        });
     res.send('Hotel cities show record successfully');
    });
}
exports.nationality = function nationality(req, res) {
    const url = 'mongodb://localhost:27017/';
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db("hotels");
        var task_names = [];
        var myobj = {};
        dbo.collection("24x7roomsNationality").find({}).limit(10).toArray(function (err, results) {
            if (err) throw err;
            results.map(function (citi, index, array) {
                var aaa = citi.nationality + ', ' + citi.iso_code;
                myobj = { value: citi.CODE, label: aaa };
                task_names.push(myobj)             
            });
            res.send(task_names);
        });
        console.log('Hotel 24x7roomsNationality show record successfully');
    });
}
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');

exports.hotelList = function (req, res) {
    var $match = {};
    for (var key in req.query) {
        var filterUpdate = [];
        var keys = '';
        if (req.query[key]) {
            var splitArr = req.query[key].split(",");
            for (var i = 0; i < splitArr.length; i++) {
                if (key === 'star') {
                    keys = "hotels.star";
                    filterUpdate[i] = (parseInt(splitArr[i]));
                } else {
                    if (key === 'loc') { keys = "hotels.locat"; }
                    if (key === 'ame') { keys = "facility.amenities"; }
                    if (key === 'fac') { keys = "facility.Facilities"; }
                    if (key === 'typ') { keys = "facility.type"; }
                    if (key === 'thm') { keys = "facility.themes"; }
                    filterUpdate[i] = (splitArr[i].toString());
                }
            }
            //console.log('-->>>'); console.log(filterUpdate);
            $match[keys] = { "$in": filterUpdate };
        }
    }

    var filterUpdated = { $match };


    const url = 'mongodb://localhost:27017';
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var dbo = db.db("hotels");
        dbo.collection("hotelPrice").aggregate([
            {
                $lookup:
                    {
                        from: "hotellist",
                        localField: "code",
                        foreignField: "code",
                        as: "hotels"
                    }

            },
            { $unwind: "$hotels" },

            {
                $lookup:
                    {
                        from: "hotelDetails",
                        localField: "code",
                        foreignField: "code",
                        as: "facility"
                    }

            },
            { $unwind: "$facility" },
            filterUpdated,
            { $sort: { price: 1 } },
            { $limit: 20 }
        ]).toArray(function (err, results) {
            if (err) throw err;
            console.log("get a results hotel list completed");
            //console.log(JSON.stringify(results));
            res.send(results);
        })
    });
    console.log('hotel list completed');

};
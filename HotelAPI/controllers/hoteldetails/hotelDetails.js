const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');

exports.hotelDetails = function (req, res) {
    var hotelCode = parseInt(req.query.code);
    console.log(req.query.code);
    const url = 'mongodb://localhost:27017';
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var dbo = db.db("hotels");
        dbo.collection("hotellist").aggregate([
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
            { $match : { code : hotelCode } },
            { $limit: 1 }
        ]).toArray(function (err, results) {
            if (err) throw err;
            console.log("get a results hotel details completed");
            //console.log(results);
            res.send(results);
        })
    });
    console.log('hotel details completed');
};
 
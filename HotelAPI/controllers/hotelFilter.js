const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const path = require('path');
const async = require('async');
const url = 'mongodb://localhost:27017/';

exports.hotelFilter = function (req, res) {

    var matchFilterPrice = {};
    var matchFilterStar = {};
    var matchFilterLoc = {};
    var matchFilterAme = {};
    var matchFilterFac = {};
    var matchFilterTyp = {};
    var matchFilterThm = {};    
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
            matchFilterPrice[keys] = { "$in": filterUpdate };
            matchFilterStar[keys] = { "$in": filterUpdate };
            matchFilterLoc[keys] = { "$in": filterUpdate };
            matchFilterAme[keys] = { "$in": filterUpdate };
            matchFilterFac[keys] = { "$in": filterUpdate };
            matchFilterTyp[keys] = { "$in": filterUpdate };
            matchFilterThm[keys] = { "$in": filterUpdate };
        }
    }
   
    var filterUpdated = { $match: matchFilterPrice };
    var FilterStar = { $match: matchFilterStar };
    delete matchFilterStar['hotels.star'];
    var FilterLoc = { $match: matchFilterLoc };
    delete matchFilterLoc['hotels.locat'];
    var FilterAme = { $match: matchFilterAme };
    delete matchFilterAme['facility.amenities'];
    var FilterFac = { $match: matchFilterFac };
    delete matchFilterFac['facility.Facilities'];
    var FilterTyp = { $match: matchFilterTyp };
    delete matchFilterTyp['facility.type'];
    var FilterThm = { $match: matchFilterThm };
    delete matchFilterThm['facility.type'];

    console.log("-----search star value----");    
    console.log(filterUpdated);
    console.log("-star----");
    console.log(FilterStar);
    console.log("-location----");
    console.log(FilterLoc);
    console.log("-amenities----");
    console.log(FilterAme);
    console.log("-Facilities----");
    console.log(FilterFac);
    console.log("-Type----");
    console.log(FilterTyp);
    console.log("-thems----");
    console.log(FilterThm);
    console.log("-----search star value end----");
   

    hotelStarFilter = function hotelStarFilter(cb) {
        const url = 'mongodb://localhost:27017/';
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
                FilterStar,
                {
                    $group: {
                        _id: "$hotels.star", count: { $sum: 1 }
                    }
                },

                { $sort: { _id: 1 } },
                { $limit: 20 }

            ]).toArray(function (err, results) {
                if (err) throw err;
                cb(err, { "hotelStar": results });
            });
        });
    };
    hotelPriceFilter = function hotelPriceFilter(cb) {
     
        const url = 'mongodb://localhost:27017/';
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
                {
                    "$group": {
                        "_id": null,
                        "max": { "$max": "$price" },
                        "min": { "$min": "$price" }
                    }
                },
                { $sort: { _id: 1 } },
                { $limit: 20 }

            ]).toArray(function (err, results) {
                if (err) throw err;
                cb(err, { "hotelPrices": results[0] });
            });
        });
    };
    
    hotelLocFilter = function hotelLocFilter(cb) {
       
        const url = 'mongodb://localhost:27017/';
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
                FilterLoc,
                {
                    $group: {
                        _id: "$hotels.locat", count: { $sum: 1 }
                    }
                },

                { $sort: { _id: 1 } },
                { $limit: 20 }

            ]).toArray(function (err, results) {
                if (err) throw err;
                cb(err, { "hotelLocation": results });
            });
        });
    };
    hotelfacFilter = function hotelfacFilter(cb) {
        const url = 'mongodb://localhost:27017/';
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
                FilterFac,
                {
                    "$group": {
                        "_id": 0,
                        "Facilities": { "$push": "$facility.Facilities" }
                    }
                },
                {
                    "$project": {
                        "Facilities": {
                            "$reduce": {
                                "input": "$Facilities",
                                "initialValue": [],
                                "in": { "$setUnion": ["$$value", "$$this"] }
                            }
                        }
                    }
                },

                { $sort: { _id: 1 } },
                { $limit: 20 }

            ]).toArray(function (err, results) {
                if (err) throw err;
                cb(err, { "hotelFacilities": results });
            });
        });
    };

    amenitiesFilter = function amenitiesFilter(cb) {

        const url = 'mongodb://localhost:27017/';
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
                FilterAme,
                {
                    "$group": {
                        "_id": 0,
                        "amenities": { "$push": "$facility.amenities" }
                    }
                },
                {
                    "$project": {
                        "amenities": {
                            "$reduce": {
                                "input": "$amenities",
                                "initialValue": [],
                                "in": { "$setUnion": ["$$value", "$$this"] }
                            }
                        }
                    }
                },

                { $sort: { _id: 1 } },
                { $limit: 20 }

            ]).toArray(function (err, results) {
                if (err) throw err;
                cb(err, { "hotelAmenities": results });
            });
        });
    };

    hotelTypeFilter = function hotelTypeFilter(cb) {
        const url = 'mongodb://localhost:27017/';
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
                FilterTyp,
                {
                    "$group": {
                        "_id": 0,
                        "type": { "$push": "$facility.type" }
                    }
                },
                {
                    "$project": {
                        "type": {
                            "$reduce": {
                                "input": "$type",
                                "initialValue": [],
                                "in": { "$setUnion": ["$$value", "$$this"] }
                            }
                        }
                    }
                },

                { $sort: { _id: 1 } },
                { $limit: 20 }


            ]).toArray(function (err, results) {
                if (err) throw err;
                cb(err, { "hotelType": results });
            });
        });
    };

    hotelThemesFilter = function hotelThemesFilter(cb) {
        const url = 'mongodb://localhost:27017/';
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
                FilterThm,
                {
                    "$group": {
                        "_id": 0,
                        "themes": { "$push": "$facility.themes" }
                    }
                },
                {
                    "$project": {
                        "themes": {
                            "$reduce": {
                                "input": "$themes",
                                "initialValue": [],
                                "in": { "$setUnion": ["$$value", "$$this"] }
                            }
                        }
                    }
                }
            ]).toArray(function (err, results) {
                if (err) throw err;
                cb(err, { "hotelThemes": results });
            });
        });
    };

    async.parallel([hotelStarFilter, hotelPriceFilter, hotelLocFilter, hotelfacFilter, amenitiesFilter, hotelTypeFilter, hotelThemesFilter],
        function (err, results) {
            res.send(results);
        });
};
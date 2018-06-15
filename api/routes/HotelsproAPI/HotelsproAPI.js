/** add hotel Search History */

const https = require('https');
const assert = require('assert');
const bodyParser = require('body-parser');
const path = require('path');
const async = require('async');
const request = require('request');

searchHistoryCity = function (req, res, dbs) {
    var requestStart = Date.now();
    var des = req.query.q;
    console.log(">>>>>" + des);
    dbs.production.collection("hotelDestination").find({ des: { $regex: des } }).sort({ count: -1 }).limit(30).toArray(function (err, results) {
        if (err) throw err;
        console.log("searchHistoryCity services is took " + (Date.now() - requestStart) / 1000 + " seconds");
        res.send(results);
    });
}
hotelSearchHistory = function (req, res, dbs) {
    var requestStart = Date.now();
    console.log(req._parsedUrl.query);
    dbs.production.createCollection("searchHistoryHotel", function (err, res) {
        if (err) throw err;
        console.log("Collection searchHistoryHotel created!");
    });
    dbs.production.createCollection("hotelPrice", function (err, result) {
        if (err) throw err;
        console.log("Collection hotelPrice created!");
    });
    dbs.production.collection("searchHistoryHotel").find({ "searchParam": req._parsedUrl.query }).limit(1).toArray(function (err, results) {
        if (err) throw err;
        if (results.length >= 1) {
            res.send({msg: "data already stored", data: true});
            const myquery = { searchParam: results[0].searchParam };
            const newvalues = { $set: { Count: results[0].Count + 1 } };
            dbs.production.collection("searchHistoryHotel").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("Number of searchHistoryHotel updated: " + res);
            });
            console.log("updated hotelSearchHistory services is took " + (Date.now() - requestStart) / 1000 + " seconds");
        } else {
            var adultMap = '';
            var childage = (req.query.h).split(",");
            var k = 0;
            for (i = 0; i < req.query.r; i++) {
                var pax = req.query.a[i + i];
                //console.log("adult ---> " + pax);
                adultMap += '&pax=' + pax;
                
                for (j = 0; j < req.query.c[i + i]; j++) {
                    //console.log("child ---> " + childage[k]);
                    adultMap += ',' + childage[k];
                    k++;
                }
            }
            
            
            var options = {
                host: 'api-test.hotelspro.com',
                path: '/api/v2/search/?checkin=' + req.query.st + '&checkout=' + req.query.ed + '&currency=USD&client_nationality=' + req.query.nat + '&destination_code=' + req.query.des + adultMap,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': 'Basic QXZvZ2FUcmF2ZWxzVGVzdDpoWlhDQXBDbTNuY3duMmVN'
                }
            };

            console.log("=====hotelSearchHistory");
            console.log(options);
            console.log("=====");
           var request = https.get(options, function (response) {
                var body = "";
                response.on('data', function (data) {
                    body += data;
                });
                response.on('end', function () {
                    var numHotel = JSON.parse(body);
                    var numCount = numHotel.count;
                    console.log("counter of result" + numCount);
                    if (numCount === 0 || numCount === undefined) {
                        res.send({msg: "hotel no found.search other cities", data: false});
                    }else{    
                        var xxx = numHotel.results;
                        //console.log("counter of result"+ xxx.length);
                        hotelPrice = [];
                        var i = 0;
                        xxx.forEach(function (element) {
                            hotelPrice[i] = {
                                code: element.hotel_code,
                                price: parseInt(element.products[0].price),
                                param: req._parsedUrl.query
                            };
                            i++;
                        });
                        res.send({msg: "hotel is available", data: true});
                        dbs.production.createCollection("hotelPrice", function (err, result) {
                            if (err) throw err;
                            console.log("Collection hotelPrice created!");
                        });
                        //console.log(hotelPrice);
                        dbs.production.collection("hotelPrice").insertMany(hotelPrice, function (err, result) {
                            if (err) throw err;
                            console.log("Number of hotelPrice inserted: " + result.insertedCount);
                            console.log("insert hotelSearchHistory services is took " + (Date.now() - requestStart) / 1000 + " seconds");
                        });
                        const myquery = { code: req.query.des };
                        const newvalues = { $set: { count: numCount } };
                        dbs.production.collection("hotelDestination").updateOne(myquery, newvalues, function (err, res) {
                            if (err) throw err;
                            console.log("Number of record updated hotelDestination : " + numCount);
                        });
                    }
                });
                response.on('error', function (e) {
                    console.log("Got error: " + e.message);
                });
            });
            const myobj = [{ searchParam: req._parsedUrl.query, desginKey: 'hotelKeyTest', Count: 100 }];
            dbs.production.collection("searchHistoryHotel").insert(myobj, function (err, res) {
                if (err) throw err;
                console.log("Number of searchHistoryHotel inserted: " + res.insertedCount);
            });
            
        }
    });
}    

/* hotelResult */
hotelResult = function (req, res, dbs) {
    var requestStart = Date.now();
    if (req.headers.referer === undefined) {
        var key = 'des=12fa1&nat=in&st=2018-05-29&ed=2018-05-30&r=1&a=2,2,2,2,2&c=0,0,0,0,0&h=';
    } else {
        var keyarr = (req.headers.referer).split("?");
        var key = keyarr[1];
    }

    var pppp = {};
    if(req.query.min){
        var p1 = parseInt(req.query.min);
        var p2 = parseInt(req.query.max);
        pppp =  { "param": key, price:  { $gt: p1, $lt: p2 }  }
    
    }else{
        pppp =  { "param": key  }   
    }
   
    var matchFilter = {};
    for (var keys in req.query) {
        var filterUpdate = [];
        if (req.query[keys]) {
            var splitArr = req.query[keys].split(",");
            for (var i = 0; i < splitArr.length; i++) {
                if (keys === 'star') {
                    filterUpdate[i] = (parseInt(splitArr[i]));
                } else {
                    filterUpdate[i] = (splitArr[i].toString());
                }
            }
            matchFilter[keys] = { "$in": filterUpdate };
        }
    }
    var l1 = parseInt(req.query.l1);
    var l2 = parseInt(req.query.l2);
    dbs.production.collection("hotelPrice").find(pppp).project({ code: 1, price: 1 }).sort({ price: 1 }).limit(l1).toArray(function (err, results) {
        if (err) throw err;
        hotelList = [];
        hotelPrices = [];
        var i = 0;
        var code = '';
        results.forEach(function (element) {
            hotelList[i] = element.code;
            hotelPrices[i] = element.price;
            i++;
        });
        var filterofhotel;
        if (matchFilter.zip && matchFilter.star) {
            //console.log("both zip and star");
            filterofhotel = { $and: [{ "code": { "$in": hotelList } }, { "star": matchFilter.star }, { "zip": matchFilter.zip }] };
        } else if (matchFilter.star) {
            //console.log("only  star");
            filterofhotel = { $and: [{ "code": { "$in": hotelList } }, { "star": matchFilter.star }] };
        } else if (matchFilter.zip) {
            //console.log("only zip");
            filterofhotel = { $and: [{ "code": { "$in": hotelList } }, { "zip": matchFilter.zip }] };
        } else {
            //console.log("only hotellist");
            filterofhotel = { code: { "$in": hotelList } };
        }
        //console.log("-----");
        //final working query ::: var filterofhotel = { $and: [{ "code": { "$in": hotelList } }, { "star": { "$in": [2, 3] } }, { "zip": { "$in": ["360002", "360001"] } }] };

        dbs.production.collection("hotellist").find(filterofhotel).project({ code: 1, name: 1, star: 1, addr: 1, zip: 1, img: 1 }).sort({ code: 1 }).limit(l2).toArray(function (err, result) {
            if (err) throw err;
            var allHotel = [];
            //console.log(result);
            allHotel.push({ hotel: result, prices: hotelPrices, codes: hotelList });
            console.log("hotelResult services is took " + (Date.now() - requestStart) / 1000 + " seconds");
            //console.log(allHotel);
            res.send(allHotel);
        });
    });
    //console.log('hotel list completed');
}
/** hotel filter */
hotelFilter = function (req, res, dbs) {
    var requestStart = Date.now();
    var hotelList = [];
    if (req.headers.referer === undefined) {
        var key = 'des=12fa1&nat=in&st=2018-05-29&ed=2018-05-30&r=1&a=2,2,2,2,2&c=0,0,0,0,0&h=';
    } else {
        var keyarr = (req.headers.referer).split("?");
        var key = keyarr[1];
    }
    var pppp = {};
    if(req.query.min){
        var p1 = parseInt(req.query.min);
        var p2 = parseInt(req.query.max);
        pppp =  { "param": key, price:  { $gt: p1, $lt: p2 }  }
    
    }else{
        pppp =  { "param": key  }   
    }

    var matchFilterPrice = {};
    var matchFilterStar = {};
    var matchFilterLoc = {};
    for (var keys in req.query) {
         
        var filterUpdate = [];
        if (req.query[keys]=== 'star' || req.query[keys] === 'zip')  {
            var splitArr = req.query[keys].split(",");
            for (var i = 0; i < splitArr.length; i++) {
                if (keys === 'star')  {
                    filterUpdate[i] = (parseInt(splitArr[i]));
                } else {
                    filterUpdate[i] = (splitArr[i].toString());
                }
            }
            matchFilterPrice[keys] = { "$in": filterUpdate };
            matchFilterStar[keys] = { "$in": filterUpdate };
            matchFilterLoc[keys] = { "$in": filterUpdate };

        }
    }


    delete matchFilterStar['star'];
    delete matchFilterLoc['zip'];

    function hotelStarFilter(cb) {
        matchFilterStar['code'] = { "$in": hotelList };

        dbs.production.collection("hotellist").aggregate([
            {
                $match: matchFilterStar
                //{ code: { '$in': hotelList },  zip: { '$in': [ '110001', '110002', '110003', '110006' ]  }  }
            },
            {
                $group: {
                    _id: "$star", count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray(function (err, results) {
            if (err) throw err;
            cb(err, { "hotelStar": results });
        });
    }
    function hotelPriceFilter(cb) {
        dbs.production.collection("hotelPrice").aggregate([
            {
                $match: { code: { '$in': hotelList } }
            },
            {
                "$group": {
                    "_id": null,
                    "max": { "$max": "$price" },
                    "min": { "$min": "$price" }
                }
            },

             
            { $limit: 500 }
        ]).toArray(function (err, results) {
            if (err) throw err;
            cb(err, { "hotelPrices": results });
        });
    }
    function hotelLocFilter(cb) {
        matchFilterLoc['code'] = { "$in": hotelList };
        dbs.production.collection("hotellist").aggregate([
            {
                $match: matchFilterLoc
            },
            {
                $group: {
                    _id: "$zip", count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            { $limit: 20 }
        ]).toArray(function (err, results) {
            if (err) throw err;
            cb(err, { "hotelLocation": results });
        });
    }

     
    dbs.production.collection("hotelPrice").find(pppp).project({ code: 1, price: 1 }).limit(500).toArray(function (err, results) {
        if (err) throw err;
        var i = 0;
        results.forEach(function (element) {
            hotelList[i] = element.code;
            i++;
        });
        console.log("total hotel ::: "+ hotelList.length);
        async.parallel([hotelStarFilter, hotelPriceFilter, hotelLocFilter],
            function (err, results) {
                results.push({ totalrecord: hotelList.length });
                console.log("hotelFilter services is took " + (Date.now() - requestStart) / 1000 + " seconds");
                res.send(results);
            });
    });
}
/** hotel Details */
hotelDetails = function (req, res, dbs) {
    var requestStart = Date.now();
    var code = req.query.code;
    dbs.production.collection("hotelsproHotels").find({ "code": code }).limit(1).toArray(function (err, results) {
        if (err) throw err;
        console.log("hotelDetails services is took " + (Date.now() - requestStart) / 1000 + " seconds");
        res.send(results);
    });
}
hotelDetailsRoom = function (req, res, dbs) {
    var requestStart = Date.now();
    var code = req.query.code;


    var adultMap = '';
    var adultpax = (req.query.a).split(",");
    var childpax = (req.query.c).split(",");
    var childage = (req.query.h).split(",");
    var k = 0;
    for (i = 0; i < req.query.r; i++) {
        var pax = adultpax[i];
        adultMap += '&pax=' + pax;
        for (j = 0; j < childpax[i]; j++) {
            adultMap += ',' + childage[k];
            k++;
        }
    }
    var FinalCheck = '?checkin=' + req.query.st + '&checkout=' + req.query.ed + '&currency=USD&client_nationality=' + req.query.nat + '&hotel_code=' + code + adultMap;
    var options = {
        host: 'api-test.hotelspro.com',
        path: '/api/v2/search/' + FinalCheck,
        //path: '/api/v2/search/?pax=2&checkout=2018-07-12&checkin=2018-07-11&hotel_code=' + code + '&client_nationality=IN&currency=USD',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic QXZvZ2FUcmF2ZWxzVGVzdDpoWlhDQXBDbTNuY3duMmVN'
        }
    };
    
    console.log("=====hotelDetailsRoom");
    console.log(options);
    console.log("=====");
    var request = https.get(options, function (response) {
        var body = "";
        response.on('data', function (data) {
            body += data;
        });
        response.on('end', function () {
            var numHotel = JSON.parse(body);
            res.send(numHotel);
            console.log("hotelDetailsRoom services is took " + (Date.now() - requestStart) / 1000 + " seconds");
        });
        response.on('error', function (e) {
            console.log("Got error: " + e.message);
        });
    });
}
hotelProvisionRoomBooking = function (req, res, dbs) {
    var requestStart = Date.now();
    var code = req.query.code;
    dbs.production.createCollection("hotelBooking", function (err, result) {
        if (err) throw err;
        console.log("Collection hotelBooking created!");
    });
    //https://api-test.hotelspro.com/api/v2/provision/1f1c0b_216239188939_2_11_2_1_0_0_1760695035_0_1-3-0_2-100.20180711_1_2_0_104_d771d99f69db45e188498c3bc57f655d_
    var options = {
        host: 'api-test.hotelspro.com',
        path: '/api/v2/provision/' + code,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic QXZvZ2FUcmF2ZWxzVGVzdDpoWlhDQXBDbTNuY3duMmVN'
        }
    };
    console.log("=====hotelProvisionRoomBooking");
    console.log(options);
    console.log("=====");
    var request = https.get(options, function (response) {
        var body = "";
        response.on('data', function (data) {
            body += data;
        });
        response.on('end', function () {
            console.log(body);
            var numHotel = JSON.parse(body);
            var sssss = numHotel;
            dbs.production.collection("hotelBooking").insertOne(sssss, function (err, result) {
                if (err) throw err;
                console.log("Number of hotelBooking inserted: " + result.insertedCount);
            });
            res.send(numHotel);
          

            console.log("hotelDetailsRoom services is took " + (Date.now() - requestStart) / 1000 + " seconds");
        });
        response.on('error', function (e) {
            console.log("Got error: " + e.message);
        });
    });
}
hotelRoomBooking = function (req, res, dbs) {
    var requestStart = Date.now();
    dbs.production.createCollection("hotelBooking", function (err, result) {
        if (err) throw err;
        console.log("Collection hotelBooking created!");
    });
    var paxx = '';
    
    if (req.query.name[1].length === 1) {
        paxx += 'name=' + req.query.name + '&';
    } else {
        req.query.name.forEach(function (element) {
            paxx += 'name=' + element + '&';
        });
    }
    var reqBody = paxx + 'expected_price=' + req.query.price;
    console.log("=====hotelRoomBooking");
    console.log(paxx);
    console.log("=====");

    request.post({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic QXZvZ2FUcmF2ZWxzVGVzdDpoWlhDQXBDbTNuY3duMmVN'
        },
        url: 'https://api-test.hotelspro.com/api/v2/book/' + req.query.des,
        body: reqBody
    }, function (error, response, body) {
        console.log(body);
        res.send(body);
        var numHotel = JSON.parse(body);
        const myquery = { code: req.query.des };
        const newvalues = { $set: numHotel };
        
        dbs.production.collection("hotelBooking").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("Number of hotelBooking updated: " + res);
        });
        console.log("hotelDetailsRoom services is took " + (Date.now() - requestStart) / 1000 + " seconds");
    });
}
hotelVoucherOne = function (req, res, dbs) {
    var requestStart = Date.now();
    var options = {
        url: 'https://api-test.hotelspro.com/api/v2/bookings/' + req.query.code,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic QXZvZ2FUcmF2ZWxzVGVzdDpoWlhDQXBDbTNuY3duMmVN'
        }
    };
    
    console.log("=====hotelVoucherOne");
    console.log(options);
    console.log("=====");
    function callback(error, response, body) {
        console.log(response.statusCode);
        //console.log(error); 
        
        console.log(body);
        res.send(body);
        var numHotel = JSON.parse(body);
        const myquery = { code: req.query.code };
        const newvalues = { $set: numHotel };
        
        dbs.production.collection("hotelBooking").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("Number of hotelBooking updated: " + res);
        });
        console.log("hotelVoucherOne services is took " + (Date.now() - requestStart) / 1000 + " seconds");
        // if (!error && response.statusCode == 200) {

        //   var info = JSON.parse(body);
        //   console.log(info.stargazers_count + " Stars");
        //   console.log(info.forks_count + " Forks");
        // }
    }
    request(options, callback);
}

hotelMyBooking = function (req, res, dbs) {
    var requestStart = Date.now();
    
    var coded = {};
    if(req.query.code){
        var coded = { code: req.query.code };
    } 

    dbs.production.collection("hotelBooking").find(coded).sort({ created_at: -1 }).limit(100).toArray(function (err, results) {
        if (err) throw err;
        console.log("hotelBooking services is took " + (Date.now() - requestStart) / 1000 + " seconds");
        res.send(results);
    });
}
hotelCancellation = function (req, res, dbs) {
    var requestStart = Date.now();
 
    
    request.post({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic QXZvZ2FUcmF2ZWxzVGVzdDpoWlhDQXBDbTNuY3duMmVN'
        },
        url: 'https://api-test.hotelspro.com/api/v2/cancel/' + req.query.code
        
    }, function (error, response, body) {
        console.log(body);
        var numHotel = JSON.parse(body);
        const myquery = { code: req.query.code };
        const newvalues = { $set:  { finalcancel: numHotel, 'status': 'cancelled' } };
        dbs.production.collection("hotelBooking").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("Number of hotelCancellation updated: " + res);
        });
        res.send(body);

        console.log("hotelCancellation services is took " + (Date.now() - requestStart) / 1000 + " seconds");
    });
}
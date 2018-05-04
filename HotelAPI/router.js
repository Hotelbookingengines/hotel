const express = require('express');
const router = express.Router();
const async = require('async');


const searchHistory = require('./controllers/searchHistory');
const hoteladd = require('./controllers/hotelAdd');
const hotellist = require('./controllers/hotelList');
const hoteldetails = require('./controllers/hoteldetails/hotelDetails');
const hotelfilter = require('./controllers/hotelFilter');


router.get('/', function(req, res){
   res.send('welcome to hotel webservices portal');
});
//search hotel page
router.post('/searchHistory', searchHistory.searchHistory);


// hotel result page
router.get('/hotellist', hotellist.hotelList);
router.get('/filter', hotelfilter.hotelFilter);
router.get('/hotel', hoteldetails.hotelDetails);
//router.get('/demo', hotelfilterDemo.hotelFilterDemo);

router.get('/add', hoteladd.hotelAdd);
router.get('/remove', hoteladd.hotelDublicateRemove);

/** 24x7room api details */
const hotelCitiesAdd = require('./controllers/24x7rooms/city');
router.get('/24x7cities', hotelCitiesAdd.cities);
router.get('/24x7nationality', hotelCitiesAdd.nationality);


//export this router to use in our index.js
module.exports = router;
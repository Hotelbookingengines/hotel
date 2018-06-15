const express = require('express');
const app = express.Router();

const packages = require('./tourPackages');
const HotelsProStaticData = require('./staticdata/HotelsProStaticData');
 const HotelsproAPI = require('./HotelsproAPI/HotelsproAPI.js');


module.exports = function(app, dbs) {
  /** HotelsProStaticData insert API*/
  app.get('/admin/countries', function(req, res) {
    hotelCountries(req, res, dbs);
  });
  app.get('/admin/destination', function(req, res) {
    hotelDestination(req, res, dbs);
  });
  app.get('/admin/addhotel', function(req, res) {
    hotelAdd(req, res, dbs);
  });
  app.get('/admin/addhoteldetail', function(req, res) {
    hotelDetailsAdd(req, res, dbs);
  });


  app.get('/hotel/continents', function(req, res) {
    continents(req, res, dbs);
  });
  app.get('/hotel/addcontinents', function(req, res) {
    addAllContinents(req, res, dbs);
  });
  app.get('/hotel/countries', function(req, res) {
    allCountries(req, res, dbs);
  });
  app.get('/hotel/addCountries', function(req, res) {
    addAllCountries(req, res, dbs);
  });
  app.get('/hotel/dublicateCountries', function(req, res) {
    dublicateAllCountriesRemove(req, res, dbs);
  });
  app.get('/hotel/hotelsproCitiesAdd', function(req, res) {
    hotelsproCitiesAdd(req, res, dbs);
  });
  app.get('/hotel/cities', function(req, res) {
    allCities(req, res, dbs);
  });
  app.get('/hotel/updateCityStart', function(req, res) {
    updateCityStart(req, res, dbs);
  });
  app.get('/hotel/hotelsproHotelsAdd', function(req, res) {
    hotelsproHotelsAdd(req, res, dbs);
  });
  
  app.get('/hotel/hotelview', function(req, res) {
    hotelview(req, res, dbs);
  });
  
  

  
  


  /** UI hotel request and response */
  app.get('/hotel/searchHistoryCity', function(req, res) {
    searchHistoryCity(req, res, dbs);
  });
  app.get('/hotel/searchHistory', function(req, res) {
    hotelSearchHistory(req, res, dbs);
  });
  app.get('/hotel/hotellist', function(req, res) {
    hotelResult(req, res, dbs);
  });
  app.get('/hotel/hotelfilter', function(req, res) {
    hotelFilter(req, res, dbs);
  });
  app.get('/hotel/hoteldetails', function(req, res) {
    hotelDetails(req, res, dbs);
  });
  app.get('/hotel/hotelDetailsRoom', function(req, res) {
    hotelDetailsRoom(req, res, dbs);
  });
  app.get('/hotel/hotelProvisionRoomBooking', function(req, res) {
    hotelProvisionRoomBooking(req, res, dbs);
  });
  app.get('/hotel/hotelRoomBooking', function(req, res) {
    hotelRoomBooking(req, res, dbs);
  });
  app.get('/hotel/hotelVoucher', function(req, res) {
    hotelVoucherOne(req, res, dbs);
  });  
  app.get('/hotel/hotelMyBooking', function(req, res) {
    hotelMyBooking(req, res, dbs);
  });  
  app.get('/hotel/hotelCancellation', function(req, res) {
    hotelCancellation(req, res, dbs);
  });  
/** hotelspro api done */
  
  /** Holiday API*/
  app.get('/holiday', function(req, res) {
    packagesSearch(req, res, dbs);
  });
  app.post('/packageAdd', function(req, res) {
    packagesAdd(req, res, dbs);
  });
  app.get('/packageCode', function(req, res) {
    packagesCode(req, res, dbs);
  });
  app.get('/packages', function(req, res) {
    packagesResult(req, res, dbs);
  });
  return app
}
 
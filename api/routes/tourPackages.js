
packagesSearch = function (req, res, dbs) {
  dbs.production.collection('hotellist').find({}).toArray((err, docs) => {
    if (err) {
      console.log(err)
      res.error(err)
    } else {
      res.json(docs)
    }
  })
};

packagesResult = function (req, res, dbs) {
  const query = parseInt(req.query.code);
  if (query) {
    console.log("fetch record on --->>>> " + query);
    dbs.production.collection("HolidayList").deleteOne({ code: query }, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted" + res);
    });
  }
  dbs.production.collection('HolidayList').find({}).toArray((err, docs) => {
    if (err) {
      console.log(err)
      res.error(err)
    } else {
      res.json(docs)
    }
  })
};
packagesCode = function (req, res, dbs) {
  const query = parseInt(req.query.code);
  console.log("fetch record on >" + query);
  dbs.production.collection('HolidayList').find({ code: query }).toArray((err, docs) => {
    if (err) {
      console.log(err)
      res.error(err)
    } else {
      res.json(docs)
    }
  })
};
packagesAdd = function (req, res, dbs) {
  dbs.production.createCollection("HolidayList", function (err, res) {
    if (err) throw err;
    console.log("Collection HolidayList created!");
  });
  const query = parseInt(req.body.code);
  console.log("fetch record on >>>> " + query);
  console.log(req.body);

  dbs.production.collection('HolidayList').find({ code: query }).toArray((err, docs) => {
    if (err) {
      console.log(err)
      res.error(err)
    } else {

      console.log(docs.length);
      if (docs.length === 0) {
        console.log("new record");

        dbs.production.collection("HolidayList").insertOne(req.body, function (err, res) {
          if (err) throw err;
          console.log("Number of HolidayList inserted: " + res.insertedCount);
        });
      } else {
        delete req.body._id;
        dbs.production.collection("HolidayList").updateOne({ code: query }, { $set: req.body }, function (err, res) {
          if (err) throw err;
          console.log("Number of HolidayList updated: " + res);
        });
        console.log("update record");

      }
    }
  })

  dbs.production.collection('HolidayList').find({}).toArray((err, docs) => {
    if (err) {
      console.log(err)
      res.error(err)
    } else {
      res.json(docs)
    }
  })

};

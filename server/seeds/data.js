const Datadate = require('../models/dtDates');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

// Connecting to the database
mongoose.connect('mongodb://localhost/CMS', {
    useCreateIndex: true,
    useNewUrlParser: true
});
let data = JSON.parse(fs.readFileSync(path.join(__dirname + '/data.json'), 'utf8'));

Datadate.deleteMany((err) => {
    Datadate.insertMany(data, function (err, mongoose) {
        if (err) throw err;
        console.log('insert data success');
    });
})




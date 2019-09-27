var express = require('express');
var router = express.Router();
const DtMaps = require('../models/dtMaps');

router.get('/', (req, res, next) => {

    console.log("");
    console.log("");
    console.log("============ ROUTER INDEX DATA MAPS ================");
    console.log("");
    console.log("");

    DtMaps.find().then((mapsData) => {

        res.status(201).json(mapsData)
    })
})

router.post('/add', (req, res, next) => {

    console.log("");
    console.log("");
    console.log("============ Roter POST ADD MAPS ================");
    console.log("");
    console.log("");


    let maps = new DtMaps(req.body)

    maps.save().then((data) => {
        res.status(201).json({

            success: true,
            message: "Success, Data have Been Add",
            data: {
                _id: data._id,
                title: data.title,
                lat: data.lat,
                lng: data.lng
            }
        })
    })
})

router.put('/:id', (req, res, next) => {

    console.log("");
    console.log("");
    console.log("============ Router GET EDIT MAPS ================");
    console.log("");
    console.log("");

    DtMaps.findOneAndUpdate(
        { _id: req.params.id },
        { title: req.body.title, lat: req.body.lat, lng: req.body.lng },
        { new: true }
    ).then((data) => {
        res.status(201).json({
            success: true,
            message: "Success, Data have Been Edit",
            data
        });
    })

})

router.delete('/:id', function (req, res, next) {

    console.log("");
    console.log("");
    console.log("============ Router DELETE MAPS ================");
    console.log("");
    console.log("");


    DtMaps.findOneAndRemove({ _id: req.params.id }).then((data) => {
        res.status(201).json({
            success: true,
            message: "Success, Data have Been Removed",
            data
        });
    })
});

router.post('/search', function (req, res, next) {

    console.log("");
    console.log("");
    console.log("============ Router Search MAPS ================");
    console.log("");
    console.log("");

    let temp = {}
    console.log('data body>', req.body);

    const { title, lat, lng } = req.body

    if (title) temp.title = title
    if (lat) temp.lat = lat
    if (lng) temp.lng = lng

    DtMaps.find(temp).then((searchdata) => {
        console.log(searchdata);

        res.status(201).json(searchdata)
    })
})

router.get('/:id', (req, res, next) => {

    console.log("");
    console.log("");
    console.log("============ Router FIND MAPS ================");
    console.log("");
    console.log("");


    DtMaps.findById({ _id: req.params.id }).then((data) => {
        res.status(201).json({

            success: true,
            message: "succes!! Data Found",
            data

        })

    })

})

module.exports = router
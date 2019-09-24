var express = require('express');
var router = express.Router();
const Dates = require('../models/dtDates');

router.get('/', (req, res, next) => {
    Dates.find().then((dataDates) => {
        res.status(201).json(dataDates)
    })
})


router.post('/add', (req, res, next) => {

    console.log("");
    console.log("");
    console.log("============ Roter POST ADD DATES ================");
    console.log("");
    console.log("");


    let dates = new Dates(req.body)

    dates.save().then((data) => {
        res.status(201).json({

            success: true,
            message: "Success, Data have Been Add",
            data: {
                _id: data._id,
                letter: data.letter,
                frequency: data.frequency
            }
        })
    })
})

router.put('/:id', (req, res, next) => {

    console.log("");
    console.log("");
    console.log("============ Router GET EDIT DATES ================");
    console.log("");
    console.log("");

    Dates.findOneAndUpdate(
        { _id: req.params.id },
        { letter: req.body.letter, frequency: req.body.frequency },
        { new: true }
    ).then((data) => {
        res.status(201).json({
            success: true,
            message: "Success, Data have Been Edit",
            data: {
                _id: data._id,
                letter: data.letter,
                frequency: data.frequency
            }
        });
    })

})

router.delete('/:id', function (req, res, next) {

    console.log("");
    console.log("");
    console.log("============ Router DELETE DATES ================");
    console.log("");
    console.log("");


    Dates.findOneAndRemove({ _id: req.params.id }).then((data) => {
        res.status(201).json({
            success: true,
            message: "Success, Data have Been Removed",
            data: {
                _id: data._id,
                letter: data.letter,
                frequency: data.frequency
            }
        });
    })
});

router.post('/search', function (req, res, next) {

    console.log("");
    console.log("");
    console.log("============ Router Search DATES ================");
    console.log("");
    console.log("");

    let temp = {}
    const { frequency, letter } = req.body

    if (frequency) temp.frequency = frequency
    if (letter) temp.letter = letter

    Dates.find(temp).then((searchdata) => {

        res.status(201).json(searchdata)
    })
})


router.get('/:id', (req, res, next) => {

    console.log("");
    console.log("");
    console.log("============ Router FIND DATES ================");
    console.log("");
    console.log("");


    Dates.findById({ _id: req.params.id }).then((data) => {
        res.status(201).json({

            success: true,
            message: "succes!! Data Found",
            data

        })

    })

})

module.exports = router;
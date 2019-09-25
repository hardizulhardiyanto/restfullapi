var express = require('express');
var router = express.Router();

/* GET list data page. */
router.get('/', (req, res, next) => {

    console.log("");
    console.log("============== ROUTER START LIST/DATA =============");
    console.log("");

    res.render('index');
});

module.exports = router
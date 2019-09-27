var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  console.log("");
  console.log("=== Router GET INDEX ===");
  console.log("");


  res.render('dashboard', { title: 'CMS' });
});

router.get('/login', function (req, res, next) {

  console.log("");
  console.log("=== Router GET INDEX/LOGIN ===");
  console.log("");


  res.render('login');
});

router.get('/signup', function (req, res, next) {

  console.log("");
  console.log("=== Router GET INDEX/SIGN UP ===");
  console.log("");


  res.render('signup');
});

router.get('/home', (req, res) => {
  nav = 1
  console.log("");
  console.log("=== Router GET INDEX/HOME ===");
  console.log("");


  res.render('home', {
    title: 'CMS/Home',
    nav
  });
})

router.get('/data', (req, res) => {
  nav = 2
  console.log("");
  console.log("=== Router GET INDEX/DATA ===");
  console.log("");


  res.render('listData', {
    title: 'CMS/Data',
    nav
  });
})

router.get('/dataDate', (req, res) => {
  nav = 3
  console.log("");
  console.log("=== Router GET INDEX / DATA DATES ===");
  console.log("");


  res.render('dataDate', {
    title: 'CMS/DataDate',
    nav
  });
})

router.get('/maps', (req, res) => {
  nav = 4
  console.log("");
  console.log("=== Router GET INDEX / MAPS ===");
  console.log("");


  res.render('maps', {
    title: 'CMS/Maps',
    nav
  });
})

router.get('/bar', (req, res) => {
  console.log("");
  console.log("=== Router GET DATA BAR===");
  console.log("");


  res.render('bar', {
    title: 'CMS/DataBar'
  });
})

router.get('/pie', (req, res) => {
  console.log("");
  console.log("=== Router GET DATA BAR===");
  console.log("");


  res.render('pie', {
    title: 'CMS/pie'
  });
})

router.get('/line', (req, res) => {
  console.log("");
  console.log("=== Router GET DATA BAR===");
  console.log("");


  res.render('line', {
    title: 'CMS/pie'
  });
})

router.get('/gmaps', (req, res) => {
  console.log("");
  console.log("=== Router GET DATA BAR===");
  console.log("");


  res.render('gmaps', {
    title: 'CMS/pie'
  });
})


module.exports = router;

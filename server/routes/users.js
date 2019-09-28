var express = require('express');
var router = express.Router();
const DataUser = require('../models/users');



/* GET users listing. */
router.get('/', function (req, res, next) {
  DataUser.find().then((data) => {

    console.log("");
    console.log('==================== ROUTER REGISTER GET INDEX ================');
    console.log("viewData > ", data);
    console.log("");

    res.status(201).json(data);

  });
});

router.post('/register', (req, res, next) => {

  console.log('');
  console.log('==================== ROUTER POST REGISTER ================');
  console.log('');
  console.log('');
  console.log("dtBody > ", req.body.email);
  console.log("dtBody > ", req.body.password);
  console.log("dtBody > ", req.body.retypepassword);
  console.log('');

  const { email, password, retypepassword } = req.body

  let response = {
    status: true,
    message: "",
    data: null
  }
  if (password == retypepassword) {
    let user = new DataUser({ email, password });
    user.save((err) => {
      console.log("user has been created");

      response.data = {
        user,
        token: user.token
      }
      res.json(response)
    })
  } else {
    response.status = false;
    console.log("password doesn't match");
    res.json(response)

  }

})

router.post('/login', function (req, res, next) {

  console.log(req.body);

  const { email, password } = req.body;

  let response = {
    status: true,
    message: "",
    data: null
  }

  DataUser.findOne({ email }, (err, user) => {
    console.log(user);

    if (!user) {
      response.status = false;
      response.message = "email doesnt exist";
      return res.json(response);
    }
    user.comparePassword(password, user.password, (isValid) => {

      console.log('data valid > ', isValid);

      if (isValid) {
        response.message = "user is valid"
        console.log('userPsssword > ', user.password);
        user.password = undefined;

        response.data = {
          user,
          token: user.generateToken()
        }
        res.json(response);

      } else {
        response.status = false;
        response.message = "password wrong";
        res.json(response)
      }
    })
  })
})

router.post('/check', function (req, res, next) {

  console.log('');
  console.log('==================== ROUTER POST CHECK ================');
  console.log('');

  const token = req.body.token;
  console.log('req token > ', token);

  try {
    let data = DataUser.decodeToken(token);
    console.log('');
    console.log("mencoba print data", data);
    console.log('');

    if (data) {
      DataUser.findOne({ email: data.email }, (err, user) => {
        if (!user) {
          res.json({ valid: false })
        } else {
          res.json({ valid: true })
        }
      });
    } else {
      res.json({ valid: false })
    }

  } catch (e) {
    res.json({ valid: false })
  }
})







module.exports = router;

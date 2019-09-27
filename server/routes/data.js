var express = require('express');
var router = express.Router();
const Todo = require('../models/data');

/* menampillkan data table. */
router.get('/', function (req, res, next) {
  Todo.find().then((data) => {

    res.status(201).json(data);

  });
});

/**Menambahkan data table */
router.post('/add', function (req, res, next) {
  let todo = new Todo(req.body)
  todo.save().then((todoAdd) => {
    res.status(201).json({
      success: true,
      message: "Data Has Been Added",
      data: {
        _id: todoAdd._id,
        letter: todoAdd.letter,
        frequency: todoAdd.frequency
      }
    });
  })
});

/**Edit Data Table */
router.put('/:id', function (req, res, next) {
  let id = req.params.id

  console.log('');
  console.log('data Params Edit >',id);
  console.log('');
  
  
  
  Todo.findOneAndUpdate(
    { _id: req.params.id },
    { letter: req.body.letter, frequency: req.body.frequency },
    { new: true }
  ).then((todoEdit) => {
    res.status(201).json({
      todoEdit: {
        _id: todoEdit._id,
        letter: todoEdit.letter,
        frequency: todoEdit.frequency
      }
    });
  })
});

/**Delete data table berdasarkan id */
router.delete('/:id', function (req, res, next) {
  console.log("");
  console.log('dataParams > ', req.params.id);
  console.log("");
  
  
  Todo.findOneAndRemove({ _id: req.params.id }).then((todoRemoved) => {
    res.status(201).json(todoRemoved);
  })
});

/**Search Data Table */
router.post('/search', function (req, res, next) {
  let temp = {}
  const { frequency, letter } = req.body

  if (frequency) temp.frequency = frequency
  if (letter) temp.letter = letter

  Todo.find(temp).then((searchdata) => {
    console.log(searchdata);
    
    res.status(201).json(searchdata)
  })
})

/**Pencarian data tabel berdasarkan ID */
router.get('/:id', (req, res, next) => {


  Todo.findById({ _id: req.params.id }).then((Todo) => {



    res.status(201).json({

      success: true,
      message: "succes!! Data Found",
      Todo

    })

  })

})


module.exports = router;
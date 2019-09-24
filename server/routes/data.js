var express = require('express');
var router = express.Router();
const Todo = require('../models/data');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Todo.find().then((data)=>{

    res.status(201).json(data);

  });
});

router.post('/add', function(req, res, next) {
  let todo = new Todo(req.body)
  todo.save().then((todoCreated)=>{
    res.status(201).json(todoCreated);
  })
});

router.put('/:id', function(req, res, next) {
  Todo.findOneAndUpdate(
    {_id: req.params.id},
    {letter: req.body.letter, frequency: req.body.frequency},
    {new: true}
  ).then((todoUpdated)=>{
    res.status(201).json(todoUpdated);
  })
});

router.delete('/:id', function(req, res, next) {
  Todo.findOneAndRemove({_id: req.params.id}).then((todoRemoved)=>{
    res.status(201).json(todoRemoved);
  })
});

router.post('/search', function (req, res, next) {
    let temp = {}
    const {frequency, letter } = req.body

    if (frequency) temp.frequency = frequency
    if (letter) temp.letter = letter

    Todo.find(temp).then((searchdata) => {

        res.status(201).json(searchdata)
    })
})

router.get('/:id', (req, res, next) => {
    

    Todo.findById({_id: req.params.id}).then((Todo) => {
      
      
      
      res.status(201).json({
        
        success: true,
        message: "succes!! Data Found",
        Todo
        
      })
      
    })

})


module.exports = router;
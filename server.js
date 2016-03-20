var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

/*Mongoose Connect*/
var db = 'mongodb://localhost/budgettracker';
mongoose.connect(db);

var User = require('./models/User');
var Expense = require('./models/Expense');

app.use(logger('dev'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.send(index.html);
});




app.post('/user', function(req, res) {
  req.body.username = req.body.username.toUpperCase();
  //Get New User With Populated Expenses
  //if user exists return user data else make a new user and return that user's data
  res.send("hello")
  User.findOne({
    'username': req.body.username
  })
  .populate('expenses')
  .exec(function (err, user){
    if (err){
      console.log('error');
      res.send(err);
    } else {
      if (user === null){
        console.log(req.body);
        var newUser = new User(req.body);
        newUser.save(function(err, newUser){
          if (err){
            console.log(err) //the rest of the lines of this code need to be completed
          }
        })
      }
    }
  })
});


app.post('/newexpense/:id', function(req, res) {
  //create a new expense with a param of the user's id
  //add it to that user's expenses array

});


app.post('/updatesalary/:id', function(req, res) {
  //update the salary of a user with a param of the user's id
  console.log(req.params.id);
  User.findOneAndUpdate({ id: req.params.id}, {salary: req.body.salary}, {new: true}, function(err, doc){
    if (err){
      res.send(err);
    } else {
      res.send(doc);
    }
  })
});

app.get('/deleteexpense/:id', function(req, res) {
  //delete an expense with a param of that expense's id.

});


var port = 3000;
app.listen(port, function() {
  console.log("listening on port:" + port);
});
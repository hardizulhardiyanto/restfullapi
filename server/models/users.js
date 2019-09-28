const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10;
let jwt = require('jsonwebtoken');
const secret = 'hardy'

console.log('');
console.log('==================== ROUTER MODELS ================');
console.log('');
console.log('');

const userSchema = new Schema({
  
  email: { type: String, unique: true },
  password: { type: String },
  retypepassword: { type: String },
  token: { type: String }
})

userSchema.pre('save', function (next) {
  let user = this;
  // hash the password if new has been modified or new
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) return next(err)
    user.password =  hash;
    user.token = user.generateToken();
    next()
  });
});

userSchema.methods.comparePassword = function (plainPassword, password,done) {

  console.log(this);
  
 bcrypt.compare(plainPassword, password).then (res => {
  done(res);
 })
}

userSchema.methods.generateToken = function () {

  console.log('');
  console.log('==================== ROUTER MODELS CHECK GENERATE ================');
  console.log('');

  let user = this;
  delete user.password;
  console.log('this user >',user.email);
  
  let token = jwt.sign({email: user.email}, secret);
  console.log(token)
  
  return token;
}

userSchema.statics.decodeToken = function (token) {
  return jwt.verify(token, secret);
}

module.exports = mongoose.model('DataUser', userSchema)
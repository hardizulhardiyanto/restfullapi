const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  email: {type: string},
  Password: {type: string},
  retypepassword: {type: string}
})

module.export=mongoose.model('DataUser', usersSchema)
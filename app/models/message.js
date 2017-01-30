const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  'name'        : String,
  'message'     : String
})

module.exports = mongoose.model('Message', messageSchema)


// EXAMPLE MESSAGES
// "messages": [
//   {"name": "Ben", "message": "It is 9:30pm"},
//   {"name": "Lara", "message": "tell someone who cares"}
// ]

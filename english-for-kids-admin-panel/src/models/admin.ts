const { Schema, model } = require('mongoose');

const Admin = new Schema({
  login: {type: String, unique: true, required: true, default: 'admin'},
  password: {type: String, required: true, default: 'admin'}
});

module.exports = model('Admin', Admin);
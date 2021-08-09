import { model, Schema } from 'mongoose';

const AdminSchema = new Schema({
  login: { type: String, unique: true, required: true, default: 'admin' },
  password: { type: String, required: true, default: 'admin' }
});

module.exports = model('admins', AdminSchema);

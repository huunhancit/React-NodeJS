import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const UserSchema = new Schema({
  username: {
    type: String,
    required: 'Enter a username'
  },
  password: {
    type: String,
    required: 'Enter a password'
  },
  email: {
    type: String,
    required: 'Enter a email'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
}
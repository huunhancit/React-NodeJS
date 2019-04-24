import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const MessageSchema = new Schema({
  to: {
    type: String
  },
  toUsername: {
    type: String,
  },
  from: {
    type: String
  },
  fromUsername: {
    type: String
  },
  message: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})
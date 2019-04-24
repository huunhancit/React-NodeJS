import * as mongoose from 'mongoose';
import { MessageSchema } from '../models/Message';
import { Request, Response } from 'express';
import { Result } from '../response/Result';
import { ResponseData } from '../response/ResponseData';

const Message = mongoose.model('Message', MessageSchema);

export class MessageController {

  public addMessage(message) {
    return new Promise((resovle, reject) => {
      let newMessage = new Message(message);
      newMessage.save((error, msg) => {
        if (error) {
          reject(error);
        } else {
          resovle(msg);
        }
      })
    })
  }

  public getMessages(req: Request, res: Response) {
    let to = req.params.to;
    let from = req.params.from;
    Message.find({ $or: [{ to, from }, { from: to, to: from }] }, (error, messages) => {
      if (error) {
        let result: Result = new Result();
        result.setError('Server error');
        return res.send(result);
      } else {
        let userInfo: ResponseData = new ResponseData();
        userInfo.setSuccess('Success');
        userInfo.body = messages;
        return res.json(userInfo);
      }
    })
  }

}
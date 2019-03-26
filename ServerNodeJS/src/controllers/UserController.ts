import * as mongoose from 'mongoose';
import { UserSchema } from '../models/User';
import { Request, Response } from 'express';
import { Result } from '../response/Result';
import { ResponseData  } from '../response/ResponseData';
import Utils from '../utils/Utils';


const User = mongoose.model('User', UserSchema);

export class UserController {


  public updateUser(req: Request, res: Response) {
    let result: Result = new Result();
    let id = req.params.userId;
    let email = req.body.email;
    if (Utils.isEmpty(email)) {
      result.setValidate('Email is empty');
      return res.json(result);
    }
    User.findOneAndUpdate({ _id: id }, { email }, { new: false }, (err, user) => {
      if (err) {
        result.setError('Server error');
        return res.json(result);
      } else {
        if (user) {
          result.setSuccess('Update user succes');
          return res.json(result);
        } else {
          result.setSuccess('User not found');
          return res.json(result);
        }
      }
    })
  }

  public deleteUser(req: Request, res: Response) {
    let result: Result = new Result();
    let id = req.params.userId;
    User.deleteOne({ _id: id }, (err, user) => {
      if (err) {
        result.setError('Server error');
        return res.json(result);
      } else {
        if (user.n > 0) {
          result.setSuccess('Delete user success');
          return res.json(result);
        } else {
          result.setSuccess('user not found');
          return res.json(result);
        }
      }
    })
  }

  public queryUser(req: Request, res: Response) {
    let result: Result = new Result();
    User.find({}, (err, users) => {
      if (err) {
        let result: Result = new Result();
        result.setError('Server error');
        return res.send(result);
      } else {
        let userInfo: ResponseData = new ResponseData();
        userInfo.setSuccess('Success');
        userInfo.body = users;
        return res.json(userInfo);
      }
    })
  }

}
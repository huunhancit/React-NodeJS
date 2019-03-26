import * as mongoose from 'mongoose';
import { UserSchema } from '../models/User';
import { Request, Response } from 'express';
import { Result } from '../response/Result';
import * as jwt from 'jsonwebtoken';
import { Login } from '../response/Login';
import { Config } from '../utils/Config';
import * as passwordHash from 'password-hash';
import Utils from '../utils/Utils';
import { ResponseData } from '../response/ResponseData';

const User = mongoose.model('User', UserSchema);

export class AuthenController {


  public login(req: Request, res: Response) {
    let result: Result = new Result();
    let username: string = req.body.username;
    let password: string = req.body.password;
    User.findOne({ username: username }, (err, obj) => {
      if (err || obj === null) {
        result.setError('Server error');
        res.send(result);
        return;
      }
      if (passwordHash.verify(password, obj.password)) {
        const payload = {
          check: true,
          username
        }
        let token: string = jwt.sign(payload, Config.KEY, {
          expiresIn: 1440
        })
        let result: Login = new Login(200, 'Login successfull', token);
        let response: ResponseData = new ResponseData();
        response.setSuccess('Success');
        response.body = result;
        res.send(response);
      } else {
        result.setError('Username or password invalid!');
        res.send(result);
      }
    })
  }


  public registerUser(req: Request, res: Response) {
    let result: Result = new Result();
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    if (Utils.isEmpty(username)) {
      result.setValidate('Username is empty');
      res.send(result);
      return;
    }

    if (Utils.isEmpty(password)) {
      result.setValidate('Password is empty');
      res.send(result);
      return;
    }

    if (Utils.isEmpty(email)) {
      result.setValidate('Email is empty');
      res.send(result);
      return;
    }

    User.findOne({ $or: [{ username }, { email }] }, (err, obj) => {
      if (err) {
        res.send('Api Error');
      } else {
        if (obj) {
          result.setSuccess('Username or email is exists!');
          res.send(result);
        } else {
          password = passwordHash.generate(password);
          let user = {
            username,
            password,
            email
          };
          let newUser = new User(user);
          newUser.save((err, user) => {
            if (err) {
              console.log(err);
              result.setError('Server error');
              res.send(result);
            } else {
              result.setSuccess('Register user successfull');
              res.send(result);
            }
          })
        }
      }
    })
  }

}
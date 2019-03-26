import Utils from '../utils/Utils';
import { Result } from '../response/Result';
import * as jwt from 'jsonwebtoken';
import { Config } from '../utils/Config';

export const RequestFilter = (req, res, next) => {
  let token = req.headers['access_token'];
  let result: Result = new Result();
  if (Utils.isEmpty(token)) {
    result.setError('Token is empty');
    return res.send(result);
  } else {
    jwt.verify(token, Config.KEY, (err, decoded) => {
      if (err) {
        result.setValue(401, 'Token is invalid');
        return res.json(result);
      } else {
        req.decoded = decoded;
        next();
      }
    })
  }

}
import { Request, Response } from 'express';
import * as moment from 'moment';
import { UserController } from '../controllers/UserController';
import { AuthenController } from '../controllers/AuthenController';
import { RequestFilter } from './Filter';
import * as cors from 'cors';



export class Routers {

  public userController: UserController = new UserController();
  public authenController: AuthenController = new AuthenController();
  public routers(app): void {
    app.use(cors());
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          date: new Date()
        })
      })

    // route for application
    
    app.use('/api', RequestFilter);
    app.route('/api/user')
      .get(this.userController.queryUser)
      .post(this.authenController.registerUser);
    app.route('/api/user/:userId')
      .put(this.userController.updateUser)
      .delete(this.userController.deleteUser);
      


    // route for authencation
    app.route('/authen/login')
      .post(this.authenController.login);
    app.route('/authen/register')
      .post(this.authenController.registerUser);

  }
}
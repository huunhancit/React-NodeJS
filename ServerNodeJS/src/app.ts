import * as express from "express";
import { createServer, Server } from 'http';
import * as bodyParser from "body-parser";
import { Routers } from "./routers/Routers";
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import { Config } from './utils/Config';
import * as socketIo from 'socket.io';
import { MessageController } from './controllers/MessageController';

class App {
  public app: express.Application;
  public route: Routers = new Routers();
  public server = null;
  public io = null;
  private messageController: MessageController = new MessageController();

  constructor() {
    this.app = express();
    this.config();
    this.configSocket();
    this.route.routers(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.server = new Server(this.app);
  }

  private configSocket(): void {
    this.io = new socketIo(this.server);
    this.io.on("connection", (socket) => {
      console.log("User connected.");
      socket.on("disconnect", () => {
        console.log("User disconnect.");
      })
      socket.on("chat", (message) => {
        this.messageController.addMessage(message)
          .then((msg) => {
            this.io.sockets.emit(message.to, msg);
          })
          .catch(error => {
            console.log(error);
          })
      })
    })
  }


  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(Config.URL_MONGO, { useNewUrlParser: true });
  }
}

export default new App().server;
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routers } from "./routers/Routers";
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import { Config } from './utils/Config';

class App {
    public app: express.Application;
    public route: Routers = new Routers();

    constructor() {
        this.app = express();
        this.config();
        this.route.routers(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));

        this.app.use(bodyParser.urlencoded({ extended: false }));
    }


    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(Config.URL_MONGO, { useNewUrlParser: true });
    }
}

export default new App().app;
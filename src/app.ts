import * as express from "express";
import * as bodyParser from "body-parser";
import * as rootPath from 'app-root-path';

class App {
  public app:express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config = () => {
    this.app.set('views', `${rootPath}/src/views`)
    this.app.set('view engine', 'ejs')
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

}
export default new App().app;
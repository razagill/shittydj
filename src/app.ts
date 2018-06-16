import * as express from "express";
import * as bodyParser from "body-parser";
import YoutubeProvider from './providers/youtube/youtube.provider';


class App {

  public app:express.Application;
  constructor() {
    this.app = express();
    this.config();
    const youtube = new YoutubeProvider();
    youtube.getStream('https://www.youtube.com/watch?v=7XkqZsnn2ss&list=RD7XkqZsnn2ss&start_radio=1')
  }

  private config = () => {
    this.app.set('views', './src/views')
    this.app.set('view engine', 'ejs')
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}
export default new App().app;
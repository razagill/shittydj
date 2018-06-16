import * as express from "express";
import * as bodyParser from "body-parser";
import YoutubeProvider from './providers/youtube/youtube.provider';
import PlayerCore from './player/PlayerCore';

class App {

  public app:express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.myFunction();
  }

  private config = () => {
    this.app.set('views', './src/views')
    this.app.set('view engine', 'ejs')
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private myFunction = async () => {
    const youtube = new YoutubeProvider();
    const yts = await youtube.getStream('https://www.youtube.com/watch?v=7XkqZsnn2ss&list=RD7XkqZsnn2ss&start_radio=1');
    console.log(yts);
    const player = new PlayerCore();
    player.play(yts);
  }
}
export default new App().app;
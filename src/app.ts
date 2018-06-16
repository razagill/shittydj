import * as express from "express";
import * as bodyParser from "body-parser";
import YoutubeProvider from './providers/youtube/youtube.provider';
// import PlayerCore from './player/PlayerCore';
// import BandcampProvider from './providers/bandcamp/bandcamp.provider';

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
    await youtube.getInfos('https://www.youtube.com/watch?v=7XkqZsnn2ss&list=RD7XkqZsnn2ss&start_radio=1');
    // const yts = await youtube.getStream('https://www.youtube.com/watch?v=7XkqZsnn2ss&list=RD7XkqZsnn2ss&start_radio=1');
    // const youtube = new YoutubeProvider();
    // const bandcamp = new BandcampProvider();
    // const yts = await youtube.getStream('https://www.youtube.com/watch?v=7XkqZsnn2ss&list=RD7XkqZsnn2ss&start_radio=1');
    // const bcs = await bandcamp.getStream('https://foxygen.bandcamp.com/track/follow-the-leader-demo-version');
    // const player = new PlayerCore();
    // player.play(bcs);
  }
}
export default new App().app;
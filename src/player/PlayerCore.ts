const Speaker = require('speaker');

export default class PlayerCore {
  private speaker = new Speaker();

  public play = (stream:any) => {
    stream.pipe(this.speaker);
  }

  public pause = () => {

  }
}
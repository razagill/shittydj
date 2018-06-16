const lame = require('lame');
const Speaker = require('speaker');
const ffmpeg = require('fluent-ffmpeg');

export default class PlayerCore {

  public play = (stream:any) => {
    ffmpeg(stream)
      .format('mp3')
      .pipe(
        new lame.Decoder()
      )
      .on('format', function (format) {
        this.pipe(new Speaker(format));
      });
  }

  public pause = () => {

  }
}
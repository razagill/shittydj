import * as ytdl from 'ytdl-core';

export default class YoutubeProvider {

  public getStream = (url: string) => {

    return ytdl.getInfo(url, (err, info) => {
      if (err) throw err;
      var audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      if (audioFormats.length) {
        const opt = {
          filter: (format) => format.container === 'audioonly'
        };
        return ytdl(audioFormats[0].url, opt);
      }
      console.log('Could not find audio format for this link');
    })


  }

}
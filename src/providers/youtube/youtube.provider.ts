import * as ytdl from 'ytdl-core';

export default class YoutubeProvider {

  public getStream = (url: string) => {

    const opt = {
      filter: (format) => format.container === 'audioonly'
    };
    console.log(ytdl(url, opt));

    return ytdl(url, opt);

  }

}
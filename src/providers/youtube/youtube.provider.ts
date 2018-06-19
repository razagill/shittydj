import * as ytdl from 'ytdl-core';
import YoutubeResponse from '../../models/dto/youtubeResponse';

export default class YoutubeProvider {

  public getStream = async (url: string) => {
    // const opt = {
    //   audioFormat: 'mp3',
    //   filter: (format) => format.container === 'mp4' && format.audioEncoding,
    // };

    return ytdl(url, { filter: 'audioonly' });
  }

  public getInfo  = async (url: string): Promise<YoutubeResponse> => {
    const infos = await ytdl.getInfo(url);
    return new YoutubeResponse(infos);
  }

}
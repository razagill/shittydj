import * as ytdl from 'ytdl-core';
import YoutubeResponse from '../../models/dto/youtubeResponse';

export default class YoutubeProvider {

  public getStream = async (url: string) => {
    return ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
  }

  public getInfo  = async (url: string): Promise<YoutubeResponse> => {
    const infos = await ytdl.getInfo(url);
    return new YoutubeResponse(infos);
  }

}
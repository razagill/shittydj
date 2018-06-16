import * as bandcamp from 'node-bandcamp';
import BandcampResponse from '../../models/dto/bandcampResponse';

export default class BandcampProvider {

  public getStream = async (url: string) => {

    return await bandcamp.getTrack(url);
  }

  public getInfo = async (url: string): Promise<BandcampResponse> => {

    const infos = await bandcamp.getDetails(url);
    return new BandcampResponse(infos);
  }
}
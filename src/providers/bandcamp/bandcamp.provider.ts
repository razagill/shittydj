import * as bandcamp from 'node-bandcamp';
import BandcampResponse from '../../models/dto/bandcampResponse';
import { IProvider } from '../../interfaces';

export default class BandcampProvider implements IProvider {

  private constructor() {};
  private static instance:BandcampProvider;

  static getInstance = () => {
    if (!BandcampProvider.instance) {
      BandcampProvider.instance = new BandcampProvider();
    }
    return BandcampProvider.instance;
  }

  public getSongStream = async (url: string) => {
    return await bandcamp.getTrack(url);
  }

  public getSongInfo = async (url: string): Promise<BandcampResponse> => {
    const infos = await bandcamp.getDetails(url);
    return new BandcampResponse(infos);
  }
}
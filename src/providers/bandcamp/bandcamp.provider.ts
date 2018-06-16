import * as bandcamp from 'node-bandcamp';

export default class BandcampProvider {

  public getStream = async (url: string) => {

    return await bandcamp.getTrack(url);
  }
}
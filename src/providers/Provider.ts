import { PROVIDERS } from '../toolkit/const';
import { YoutubeProvider, BandcampProvider } from '../providers';
import SongModel from '../models/SongModel';

export default class Provider {
  private youtubeProvider = new YoutubeProvider();
  private bandcampProvider = new BandcampProvider();

  public getSong = async (url:string, type:PROVIDERS): Promise<SongModel> => {
    let providerInfo;
    switch (type) {
      case PROVIDERS.YOUTUBE:
        providerInfo = await this.youtubeProvider.getInfo(url);
        break;
      case PROVIDERS.BANDCAMP:
        providerInfo = await this.bandcampProvider.getInfo(url);
        break;
    }
    return SongModel.mapProviderInfos(providerInfo, type, url);
  }
}
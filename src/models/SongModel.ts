import { PROVIDERS } from '@toolkit/const';

export default class SongModel {
  title: string = '';
  artist: string = '';
  album: string = '';
  artWork: string = '';
  url: string;
  providerType: PROVIDERS;

  public mapProviderInfos = (infos: any) => {

    switch (this.providerType) {
      case PROVIDERS.BANDCAMP:
        this.title = infos.title;
        this.artist = infos.artist;
        this.album = infos.album;
        this.artWork = infos.image;
        break;

      case PROVIDERS.YOUTUBE:
        this.title = infos.title;
        this.artWork = infos.thumbnail_url;
        break;
    }
  }
}
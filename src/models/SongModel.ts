import { PROVIDERS } from '@toolkit/const';

export default class SongModel {
  title?:string;
  artist?:string;
  album?:string;
  artWork?:string;
  url:string;
  providerType:PROVIDERS;
}
const lame = require('lame');
const Speaker = require('speaker');
const ffmpeg = require('fluent-ffmpeg');

import SongModel from '../models/SongModel';
import { YoutubeProvider, BandcampProvider } from '../providers';
import { PROVIDERS } from '../toolkit/const';

export default class PlayerCore {
  private constructor() {}

  private static instance:PlayerCore;

  private youtubeProvider = new YoutubeProvider();
  private bandcampProvider = new BandcampProvider();

  private speaker = new Speaker();

  static getInstance = () => {
    if (!PlayerCore.instance) {
      PlayerCore.instance = new PlayerCore();
    }
    return PlayerCore.instance;
  }

  public songQueue:SongModel[] = [];

  public addToQueue = (song:SongModel) => {
    this.songQueue.push(song);
  }

  public play = async () => {
    if (this.songQueue.length > 0) {
      const songToPlay:SongModel = this.songQueue[0];
      // Should have a generic provider interface here
      let songStream;
      switch (songToPlay.providerType) {
        case PROVIDERS.YOUTUBE:
          songStream = await this.youtubeProvider.getStream(songToPlay.url);
          break;
        case PROVIDERS.BANDCAMP:
          songStream = await this.bandcampProvider.getStream(songToPlay.url);
          break;
      }

      ffmpeg(songStream)
        .format('mp3')
        .pipe(
          new lame.Decoder()
        )
        .on('format', function (format) {
          this.pipe(this.speaker(format));
        });
    }

  }

  public stop = () => {
    this.speaker.end();
  }
}
const lame = require('lame');
const Speaker = require('speaker');
const ffmpeg = require('fluent-ffmpeg');
// import * as StreamPlayer from 'stream-player';

import SongModel from '../models/SongModel';
import { YoutubeProvider, BandcampProvider } from '../providers';
import { PROVIDERS } from '../toolkit/const';

export default class PlayerCore {
  private constructor() {}

  private static instance:PlayerCore;

  private youtubeProvider = new YoutubeProvider();
  private bandcampProvider = new BandcampProvider();

  private ffmpegStream;
  private speaker;

  private isPlaying = false;

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
    const self = this;
    if (!this.isPlaying) {
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
        // const player = new StreamPlayer();
        // player.add(ffmpeg(songStream).format('mp3'));

        // player.add(songStream);
        // player.play();
        this.ffmpegStream = ffmpeg(songStream)
          .format('mp3');
        this.ffmpegStream.pipe(
            new lame.Decoder()
          )
          .on('format', function (format) {
            self.speaker = new Speaker(format);
            this.pipe(self.speaker);
          });
        // this.speaker.on('start', function() {
        //   this.speaker.kill('SIGSTOP')});
        this.isPlaying = true;
      } else {
        console.log('No song in queue');
      }
    }
  }

  public stop = () => {
    this.ffmpegStream.kill('SIGSTOP');
    this.speaker.close();
    setTimeout(() => this.ffmpegStream.kill('SIGCONT'), 6000);
  }
}
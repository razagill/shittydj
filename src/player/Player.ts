const lame = require('lame');
const Speaker = require('speaker');

import * as ffmpeg from 'fluent-ffmpeg';

import SongModel from '../models/SongModel';
import { YoutubeProvider, BandcampProvider } from '../providers';
import { PROVIDERS } from '../toolkit/const';

const audioOptions = {
  channels: 2,
  bitDepth: 16,
  mode: lame.STEREO
};

export default class Player {
  private constructor() {}
  private static instance:Player;

  static getInstance = () => {
    if (!Player.instance) {
      Player.instance = new Player();
    }
    return Player.instance;
  }

  private youtubeProvider = new YoutubeProvider();
  private bandcampProvider = new BandcampProvider();

  // private ffmpegStream;
  private speaker;
  private decoder;
  private stream;
  private songStream;

  private isPlaying = false;
  private currentSong:SongModel;
  public queue:SongModel[] = [];

  public play = async () => {
    if (this.currentSong) {
      console.log('resuming the song');
      this.resume();
    } else if (this.queue.length > 0 && !this.isPlaying) {
      const nextSong:SongModel = this.queue[0];
      this.songStream = await this.getStream(nextSong.url, nextSong.providerType);
      this.stream = this.playStream(this.songStream);
      this.isPlaying = true;
      this.currentSong = nextSong;
      // shift the queue
    } else if (this.isPlaying) {
      // return error
      console.log('Already playing a song mofo');
    } else {
      // return error
      console.log('queue is empty');
    }
  }

  public resume = () => {
    this.speaker = new Speaker(audioOptions);
    this.decoder.pipe(this.speaker);
    this.stream.resume();
    this.isPlaying = true;
    return this.speaker.once('close', () => {
      console.log('speaker closed');
      // load next song?
    })

    // this.playStream(this.songStream);
  }

  public pause = () => {
    this.isPlaying = false;
    this.speaker.removeAllListeners('close');
    this.stream.unpipe(this.decoder).unpipe(this.speaker);
    this.stream.pause();
    this.speaker.close();
  }

  public add = (song:SongModel) => {
    this.queue.push(song);
  }

  private getStream = async (url:string, type:PROVIDERS) => {
    let songStream;
    switch (type) {
      case PROVIDERS.YOUTUBE:
        songStream = await this.youtubeProvider.getStream(url);
        break;
      case PROVIDERS.BANDCAMP:
        songStream = await this.bandcampProvider.getStream(url);
        break;
    }
    return ffmpeg(songStream).format('mp3').on('end', () => console.log('ffmpge finished'));
  }

  private playStream = (stream:any) => {
    this.decoder = new lame.Decoder();
    this.speaker = new Speaker(audioOptions);
    return stream.pipe(this.decoder).once('format', () => {
      this.decoder.pipe(this.speaker);  // why this line
      return this.speaker.once('close', () => {
        // load next song
      })
    })
  }

  // private playNextSong = () => {
  //   this.currentSong = null;
  //   this.isPlaying = false;
  //   return this.play();
  // }
}
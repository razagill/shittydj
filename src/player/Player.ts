const lame = require('lame');
const Speaker = require('speaker');

import * as ffmpeg from 'fluent-ffmpeg';

import SongModel from '../models/SongModel';
import { YoutubeProvider, BandcampProvider } from '../providers';
import { PROVIDERS } from '../toolkit/const';
import { logger } from '../toolkit/util';

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
  private ffmpegStream;

  private isPlaying = false;
  private currentSong:SongModel;
  public queue:SongModel[] = [];

  public play = async () => {
    if (this.currentSong) {
      this.resume();
    } else if (this.queue.length > 0 && !this.isPlaying) {
      const nextSong:SongModel = this.queue[0];
      this.ffmpegStream = await this.getStream(nextSong.url, nextSong.providerType);
      this.stream = this.playStream(this.ffmpegStream);
      this.isPlaying = true;
      this.currentSong = nextSong;
      // shift the queue
    } else if (this.isPlaying) {
      // return error
      logger('# Already playing a song mofo');
    } else {
      // return error
      logger('# Queue is empty');
    }
  }

  public resume = () => {
    logger('# Resuming song...')
    this.speaker = new Speaker(audioOptions);
    this.stream.pipe(this.speaker);
    this.isPlaying = true;
    this.speaker.on('close', () => {
      logger('# Speaker closed...')
      this.speaker.end();
      // load next song
    })
    logger('# Song resumed...')
  }

  public pause = () => {
    logger('# Pausing song...')
    this.isPlaying = false;
    this.stream.unpipe(this.speaker);
    this.speaker.close();
    logger('# Song paused...')
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
      this.decoder.pipe(this.speaker);
      this.speaker.on('close', () => {
        logger('# Speaker closed...')
        this.speaker.end();
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
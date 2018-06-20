const lame = require('lame');
const Speaker = require('speaker');
import * as ffmpeg from 'fluent-ffmpeg';

// Utils
import { logger } from '../toolkit/util';
// Constants
import { PROVIDERS } from '../toolkit/const';
// Models
import SongModel from '../models/SongModel';
import { YoutubeProvider, BandcampProvider } from '../providers';
// Interfaces

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

  private speaker;
  private decoder;
  private stream;
  private isPlaying = false;
  private currentSong:SongModel;
  private SPEAKER_CLOSE_WAIT = 500;

  public queue:SongModel[] = [];

  private closeStream = () => {
    this.stream.unpipe(this.speaker);

    // Hack to avoid speaker audio ring buffer error
    setTimeout(() => this.speaker.close(), this.SPEAKER_CLOSE_WAIT);
  }

  private handleSpeakerClose = () => {
    logger('# Speaker closed...')
    this.speaker.end();
  }

  private getProviderStream = async (url:string, type:PROVIDERS) => {
    switch (type) {
      case PROVIDERS.YOUTUBE:
        return await this.youtubeProvider.getStream(url);
      case PROVIDERS.BANDCAMP:
        return await this.bandcampProvider.getStream(url);
    }
  }

  private getFFmpegStream = (stream:any) =>
    ffmpeg(stream)
      .format('mp3')
      .on('end', () => logger('# ffmpeg finished...'));

  private playStream = (stream:any) => {
    this.decoder = new lame.Decoder();
    this.speaker = new Speaker();
    return stream
      .pipe(this.decoder)
      .on('format', () => {
        this.decoder.pipe(this.speaker);
        this.speaker.on('close', () => this.handleSpeakerClose());
      })
      .on('finish', () => {
        logger('# Stream finished...');
        this.closeStream();
        this.playNextSong();
      })
  }

  private playNextSong = () => {
    this.currentSong = null;
    this.isPlaying = false;
    return this.play();
  }

  public play = async () => {
    if (this.currentSong) {
      this.resume();
    } else if (this.queue.length > 0 && !this.isPlaying) {
      const nextSong:SongModel = this.queue[0];
      const providerStream = await this.getProviderStream(nextSong.url, nextSong.providerType);
      this.stream = this.playStream(this.getFFmpegStream(providerStream));
      this.isPlaying = true;
      this.currentSong = nextSong;
      this.queue.shift();
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
    this.speaker = new Speaker();
    this.stream.pipe(this.speaker);
    this.isPlaying = true;
    this.speaker.on('close', () => this.handleSpeakerClose());
    logger('# Song resumed...')
  }

  public pause = async () => {
    logger('# Pausing song...')
    this.isPlaying = false;
    this.closeStream();
    logger('# Song paused...')
  }

  public add = (song:SongModel) => {
    this.queue.push(song);
  }

  public getCurrentSong = () => {
    return this.currentSong;
  }
}
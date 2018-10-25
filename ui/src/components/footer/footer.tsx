import React, { Component } from 'react';
import styles from './footer.module.css';
import stylesHelpers from '../../assets/css/helpers.module.css'
import VolumeControlComponent from '../volume/volume';
import DurationComponent from '../duration/duration';
import { ReactComponent as IcoPlay } from '../../assets/img/ico/ico-play.svg';
import { ReactComponent as IcoPause } from '../../assets/img/ico/ico-pause.svg';

interface IState {
  isPlaying: boolean;
}

class FooterComponent extends Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isPlaying: false
    };
  }

  private togglePlayPause = () => {
    const { isPlaying } = this.state;

    this.setState({
      isPlaying: !isPlaying
    });
  }

  public render() {
    const { isPlaying } = this.state;

    return (
      <div className={`${stylesHelpers.clearfix} ${styles.wrapper}`}>
        <div className={styles.playPauseBtn} onClick={this.togglePlayPause}>
          {isPlaying ? <IcoPause className={styles.ico} /> : <IcoPlay className={styles.ico} />}
        </div>

        <div className={styles.songInfo}>
          Streetlight Manifesto - Everything Goes Numb
        </div>

        <VolumeControlComponent />

        <DurationComponent />
      </div>
    );
  }
}

export default FooterComponent;

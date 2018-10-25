import React, { Component } from 'react';
import VolumeControlComponent from './volumeControlComponent';
import DurationComponent from './durationComponent';

interface IState {
  isPlaying: boolean;
}

export default class FooterComponent extends Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isPlaying: false
    };
  }

  togglePlayPause = () => {
    const { isPlaying } = this.state;

    this.setState({
      isPlaying: !isPlaying
    });
  }

  render() {
    const { isPlaying } = this.state;

    return (
      <div className="footer clearfix">
        <div className="ico-footer float-left pointer" onClick={() => this.togglePlayPause()}>
          <img className="ico" src={isPlaying ? "assets/img/ico/ico-pause.svg" : "assets/img/ico/ico-play.svg"} />
        </div>

        <div className="footer-song-info">
          Streetlight Manifesto - Everything Goes Numb
        </div>

        <VolumeControlComponent />

        <DurationComponent />
      </div>
    );
  }
}

import { Component } from 'preact';
import VolumeControlComponent from './volumeControlComponent';
import DurationComponent from './durationComponent';

export default class FooterComponent extends Component {

  constructor() {
    super();
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
      <div class="footer clearfix">
        <div class="ico-footer float-left pointer" onClick={() => this.togglePlayPause()}>
          <img class="ico" src={isPlaying ? "assets/img/ico/ico-pause.svg" : "assets/img/ico/ico-play.svg"} />
        </div>

        <div class="footer-song-info">
          Streetlight Manifesto - Everything Goes Numb
        </div>

        <VolumeControlComponent />

        <DurationComponent />
      </div>
    );
  }
}

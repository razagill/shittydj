import { Component } from 'preact';
import VolumeControl from './volumeControl';

export default class Footer extends Component {

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


        <VolumeControl />

        <div class="duration-time">3:47 / 4:20</div>
        <div class="duration" style="width: 64%;" />
      </div>
    );
  }
}

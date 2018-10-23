import { Component } from 'preact';

export default class VolumeControlComponent extends Component {

  constructor() {
    super();
    this.state = {
      isVisible: false
    };
  }

  toggleIsVisible = () => {
    const { isVisible } = this.state;

    this.setState({
      isVisible: !isVisible
    });
  }

  volumeUp = () => {
    console.log('Volume Up');
  }
  volumeDown = () => {
    console.log('Volume Down');
  }

  render() {
    const { isVisible } = this.state;

    return (
      <div class="ico-footer float-right">
        <div class="ico-volume-wrapper pointer" onClick={() => this.toggleIsVisible()}>
          <img class="ico" src="assets/img/ico/ico-volume.svg" />
        </div>

        <div class={`volume-control ${isVisible ? 'volume-show' : ''}`}>
          <div onClick={() => this.volumeUp()} class="pointer">
            <img class="ico" src="assets/img/ico/ico-volume-up.svg" />
          </div>
          <div onClick={() => this.volumeDown()} class="pointer">
            <img class="ico" src="assets/img/ico/ico-volume-down.svg" />
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';

interface IState {
  isVisible: boolean;
}

export default class VolumeControlComponent extends Component<any, IState> {

  constructor(props: any) {
    super(props);
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
      <div className="ico-footer float-right">
        <div className="ico-volume-wrapper pointer" onClick={() => this.toggleIsVisible()}>
          <img className="ico" src="assets/img/ico/ico-volume.svg" />
        </div>

        <div className={`volume-control ${isVisible ? 'volume-show' : ''}`}>
          <div onClick={() => this.volumeUp()} className="pointer">
            <img className="ico" src="assets/img/ico/ico-volume-up.svg" />
          </div>
          <div onClick={() => this.volumeDown()} className="pointer">
            <img className="ico" src="assets/img/ico/ico-volume-down.svg" />
          </div>
        </div>
      </div>
    );
  }
}

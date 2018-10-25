import React, { Component } from 'react';
import styles from './volume.module.css';
import stylesHelpers from '../../assets/css/helpers.module.css';

import { ReactComponent as IcoVolume } from '../../assets/img/ico/ico-volume.svg';
import { ReactComponent as IcoVolumeUp } from '../../assets/img/ico/ico-volume-up.svg';
import { ReactComponent as IcoVolumeDown } from '../../assets/img/ico/ico-volume-down.svg';

interface IState {
  isVisible: boolean;
}

class VolumeControlComponent extends Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  private toggleIsVisible = () => {
    const { isVisible } = this.state;

    this.setState({
      isVisible: !isVisible
    });
  }

  private volumeUp = () => {
    console.log('Volume Up');
  }
  private volumeDown = () => {
    console.log('Volume Down');
  }

  public render() {
    const { isVisible } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={`${styles.icoVolWrapper} ${stylesHelpers.pointer}`} onClick={this.toggleIsVisible}>
          <IcoVolume className={styles.ico} />
        </div>

        <div className={`${styles.control} ${isVisible ? styles.show : ''}`}>
          <div onClick={this.volumeUp} className={stylesHelpers.pointer}>
            <IcoVolumeUp className={styles.ico} />
          </div>
          <div onClick={this.volumeDown} className={stylesHelpers.pointer}>
            <IcoVolumeDown className={styles.ico} />
          </div>
        </div>
      </div>
    );
  }
}

export default VolumeControlComponent;

import React, { Component } from 'react';
import styles from './queue.module.css';
import stylesHelpers from '../../assets/css/helpers.module.css'
import TestImg from '../../assets/img/test-img.jpg';

class QueueComponent extends Component<any, any> {
  public render() {
    return (
      <ul className={styles.list}>
        <li>
          <div className={stylesHelpers.clearfix}>
            <div className={styles.songImgWrapper}>
              <img src={TestImg} />
            </div>
            <div className={styles.songText}>
              <h3 className={styles.songName}>Relaxing Jazz &amp; Bossa Nova Music Radio - 24/7 Chill Out Piano &amp; Guitar Music Live Stream</h3>
              <p className={styles.songDesc}>SongDescription</p>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}

export default QueueComponent;

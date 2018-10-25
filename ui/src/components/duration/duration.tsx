import React, { Component } from 'react';
import styles from './duration.module.css';

class DurationComponent extends Component {

  public render() {
    return (
      <div>
        <div className={styles.time}>3:47 / 4:20</div>
        <div className={styles.bar} style={{ width: '64%' }} />
      </div>
    );
  }
}

export default DurationComponent;

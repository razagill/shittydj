import React, { Component } from 'react';

export default class DurationComponent extends Component {

  render() {
    return (
      <div>
        <div className="duration-time">3:47 / 4:20</div>
        <div className="duration" style={{ width: '64%' }} />
      </div>
    );
  }
}

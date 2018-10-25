import React, { Component } from 'react';

export default class SongListComponent extends Component {

  render() {
    return (
      <ul className="song-list">
        <li>
          <div className="clearfix">
            <div className="song-img">
              <img src="assets/img/test-img.jpg" />
            </div>
            <div className="song-text">
              <h3>Relaxing Jazz &amp; Bossa Nova Music Radio - 24/7 Chill Out Piano &amp; Guitar Music Live Stream</h3>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}

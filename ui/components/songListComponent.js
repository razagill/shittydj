import { Component } from 'preact';

export default class SongListComponent extends Component {

  render() {
    return (
      <ul class="song-list">
        <li>
          <div class="clearfix">
            <div class="song-img">
              <img src="assets/img/test-img.jpg" />
            </div>
            <div class="song-text">
              <h3>Relaxing Jazz &amp; Bossa Nova Music Radio - 24/7 Chill Out Piano &amp; Guitar Music Live Stream</h3>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}

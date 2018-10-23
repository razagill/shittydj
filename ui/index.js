import './style';
import { Component } from 'preact';
import FooterComponent from './components/footer';

export default class App extends Component {
  render() {
    return (
      <div class="full-height">
        <div class="header">
          <div class="logo text-center">
            SHITTY<img src="assets/img/logo-gray.png" alt="Pie of poo" /><span class="font-700">DJ</span>
          </div>
          <div class="max-width-1000 margin-0-auto">
            <h2 class="clearfix">
              Upcoming
            <img class="ico ico-plus float-right" src="assets/img/ico/ico-plus.svg" />
            </h2>
          </div>
        </div>

        <div class="content max-width-1000 margin-0-auto">
          <ul class="song-list">
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Relaxing Jazz & Bossa Nova Music Radio - 24/7 Chill Out Piano & Guitar Music Live Stream</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
            <li>
              <div class="clearfix">
                <div class="song-img">
                  <img src="assets/img/test-img.jpg" />
                </div>
                <div class="song-text">
                  <h3>Guitar Music Live Stream & Bossa Nova Music Radio - 24/7 Chill Out Piano</h3>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <FooterComponent />
      </div>
    );
  }
}

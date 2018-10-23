import './style';
import { Component } from 'preact';
import FooterComponent from './components/footerComponent';
import AddSongComponent from './components/addSongComponent';
import SongListComponent from './components/songListComponent';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      addSongModalVisible: false
    };
  }

  toggleAddSongModal = () => {
    this.setState({
      addSongModalVisible: !this.state.addSongModalVisible
    });
  }

  render() {
    const { addSongModalVisible } = this.state;

    return (
      <div class="full-height">
        <div class="header">
          <div class="logo text-center">
            SHITTY<img src="assets/img/logo-gray.png" alt="Pie of poo" /><span class="font-700">DJ</span>
          </div>
          <div class="max-width-1000 margin-0-auto">
            <h2 class="clearfix">
              Upcoming
              <img class="ico ico-plus pointer float-right" src="assets/img/ico/ico-plus.svg" onClick={this.toggleAddSongModal}
              />
            </h2>
          </div>
        </div>

        <div class="content max-width-1000 margin-0-auto">
          <SongListComponent />
        </div>

        <FooterComponent />

        <div class={`add-song-modal clearfix ${addSongModalVisible ? 'visible' : ''}`}>
          <AddSongComponent toggleAddSongModal={this.toggleAddSongModal} />
        </div>
      </div>
    );
  }
}

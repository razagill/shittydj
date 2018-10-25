import React, { Component } from 'react';
import SongListComponent from './components/songListComponent';
import FooterComponent from './components/footerComponent';
import AddSongComponent from './components/addSongComponent';
import Header from './components/header/header';

interface IState {
  addSongModalVisible: boolean;
}

class App extends Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      addSongModalVisible: false
    };
  }

  toggleAddSongModal = () => {
    const { addSongModalVisible } = this.state;
    this.setState({
      addSongModalVisible: !addSongModalVisible
    });
  }

  render() {
    const { addSongModalVisible } = this.state;
    return (
      <div className="full-height">
      <Header toggleAddSongModal={this.toggleAddSongModal} />

        <div className="content max-width-1000 margin-0-auto">
          <SongListComponent />
        </div>

        <FooterComponent />

        <div className={`add-song-modal clearfix ${addSongModalVisible ? 'visible' : ''}`}>
          <AddSongComponent toggleAddSongModal={this.toggleAddSongModal} />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import QueueComponent from './components/queue/queue';
import FooterComponent from './components/footer/footer';
import AddSongComponent from './components/addSong/addSong';
import Header from './components/header/header';
import styles from './app.module.css';
import stylesHelpers from './assets/css/helpers.module.css';
import queueStyles from './components/queue/queue.module.css';
import TestImg from './assets/img/test-img.jpg';

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

  public toggleAddSongModal = () => {
    const { addSongModalVisible } = this.state;
    this.setState({
      addSongModalVisible: !addSongModalVisible
    });
  }

  render() {
    const { addSongModalVisible } = this.state;
    return (
      <div className={stylesHelpers.fullHeight}>
        <Header toggleAddSongModal={this.toggleAddSongModal} />

        <div className={`${styles.wrapper} ${stylesHelpers.maxWidth1000} ${stylesHelpers.margin0auto}`}>
          <ul className={queueStyles.list}>
            <QueueComponent
              id="asd"
              title="test title"
              description="Description??"
              img={TestImg}
            />
          </ul>
        </div>

        <FooterComponent />

        <div className={`${styles.addSongModal} ${stylesHelpers.clearfix} ${addSongModalVisible ? styles.visible : ''}`}>
          {addSongModalVisible && <AddSongComponent toggleAddSongModal={this.toggleAddSongModal} />}
        </div>
      </div>
    );
  }
}

export default App;

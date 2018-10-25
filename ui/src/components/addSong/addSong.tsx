import React, { Component } from 'react';
import { ReactComponent as IcoClose } from '../../assets/img/ico/ico-delete.svg';
import PasteLinkComponent from '../pasteLink/pasteLink';
import QueueComponent from '../queue/queue';
import Tabs from '../tabs/tabs';
import TestImg from '../../assets/img/test-img.jpg';
import YoutubeSearchComponent from '../youtubeSearch/youtubeSearch';
import queueStyles from '../queue/queue.module.css';
import styles from './addSong.module.css';
import stylesHelpers from '../../assets/css/helpers.module.css'

interface IProps {
  toggleAddSongModal: () => void;
}

class AddSongComponent extends Component<IProps, any> {

  public render() {
    return (
      <div>
        <h4 className={`${stylesHelpers.clearfix} ${styles.h4}`}>
          Add song to queue
          <IcoClose className={`${stylesHelpers.pointer} ${stylesHelpers.floatRight}`} onClick={this.props.toggleAddSongModal} />
        </h4>

        <Tabs titles={['Paste link', 'Search youtube', 'Choose playlist']}>
          {/* PASTE LINK */}
          <PasteLinkComponent toggleAddSongModal={this.props.toggleAddSongModal} />

          {/* YOUTUBE SEARCH */}
          <YoutubeSearchComponent toggleAddSongModal={this.props.toggleAddSongModal} />

          {/* PLAYLISTS */}
          <ul className={queueStyles.list}>
            <QueueComponent id="aaa" title="Random title" description="Description??" img={TestImg} />
            <QueueComponent id="sss" title="Video title" description="say Whaaaaaat?!" img={TestImg} />
            <QueueComponent id="ddd" title="Sir Titulus" description="Description here" img={TestImg} />
          </ul>
        </Tabs>
      </div >
    );
  }
}

export default AddSongComponent;

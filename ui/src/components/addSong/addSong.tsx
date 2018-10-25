import React, { Component } from 'react';
import { ReactComponent as IcoClose } from '../../assets/img/ico/ico-delete.svg';
import styles from './addSong.module.css';
import queueStyles from '../queue/queue.module.css';
import stylesHelpers from '../../assets/css/helpers.module.css'

interface IState {
  addSongText: string;
  searchRes: ISearchResult[];
}

interface IProps {
  toggleAddSongModal: () => void;
}

interface ISearchResult {
  id: ISearchId;
  snippet: ISearchSnippet;
}

interface ISearchId {
  videoId: string;
}

interface ISearchSnippet {
  description: string;
  thumbnails: ISearchThumbnail;
  title: string;
}

interface ISearchThumbnail {
  medium: ISearchThumbnailDetail
}

interface ISearchThumbnailDetail {
  height: number;
  url: string;
  width: number;
}

class AddSongComponent extends Component<IProps, IState> {

  addSongInput: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      addSongText: 'cats',
      searchRes: []
    };
  }

  public componentDidMount() {
    this.addSongInput.focus();
  }

  private submiForm = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.toggleAddSongModal();
  }

  private showSearchResults = () => {
    const { addSongText } = this.state;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&q=${addSongText}&fields=items(id%2FvideoId%2Csnippet(description%2Cthumbnails%2Fmedium%2Ctitle))&key=AIzaSyA-peAPxzMqXOY5B9lokyP_H91og7pPZXg`)
      .then(response => response.json())
      .then(data => {
        this.setState({ searchRes: data.items });
      });
  }

  public render() {
    const { addSongText, searchRes } = this.state;

    return (
      <div>
        <h4 className={`${stylesHelpers.clearfix} ${styles.h4}`}>
          Add song
          <IcoClose className={`${stylesHelpers.pointer} ${stylesHelpers.floatRight}`} onClick={this.props.toggleAddSongModal} />
        </h4>
        <form onSubmit={this.submiForm} >
          <input
            type="text"
            className={styles.inputBtn}
            value={addSongText}
            onChange={e => this.setState({ addSongText: e.currentTarget.value })}
            placeholder="paste youtube/soundcloud link"
            ref={r => this.addSongInput = r}
          />
          <button
            type="submit"
            className={`${styles.inputBtn} ${styles.btn}`}
            onClick={this.submiForm}
          >
            Add song to queue
          </button>
        </form>

        <div className={styles.hr} />
        <button
          type="submit"
          className={`${styles.inputBtn} ${styles.btn}`}
          onClick={this.showSearchResults}
        >
          Search YouTube
        </button>

        {searchRes && searchRes.length !== 0 && (
          <ul className={queueStyles.list}>
            {searchRes.map(item =>
              <li key={item.id.videoId}>
                <div className={stylesHelpers.clearfix}>
                  <div className={queueStyles.songImgWrapper}>
                    <img src={item.snippet.thumbnails.medium.url} />
                  </div>
                  <div className={queueStyles.songText}>
                    <h3 className={queueStyles.songName}>{item.snippet.title}</h3>
                    <p className={queueStyles.songDesc}>{item.snippet.description}</p>
                  </div>
                </div>
              </li>
            )}
          </ul>)}
        <div className={styles.hr} />
        <h4 className={styles.h4}>Choose playlist</h4>
      </div>
    );
  }
}

export default AddSongComponent;

import React, { Component } from 'react';
import styles from './youtubeSearch.module.css';
import stylesHelpers from '../../assets/css/helpers.module.css'
import QueueComponent from '../queue/queue';
import queueStyles from '../queue/queue.module.css';

interface IState {
  searchText: string;
  searchRes: null | ISearchResult[];
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
  default: ISearchThumbnailDetail
}

interface ISearchThumbnailDetail {
  height: number;
  url: string;
  width: number;
}

class YoutubeSearchComponent extends Component<IProps, IState> {

  searchField: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      searchText: '',
      searchRes: null
    };
  }

  public componentDidMount() {
    this.searchField.focus();
  }

  /*
  private addSongToQueue = (e: React.FormEvent) => {
    // TODO: API CALL FOR ADDING SONG TO QUEUE
    this.props.toggleAddSongModal();
  }
  */

  private submiFormSearchYoutube = (e: React.FormEvent) => {
    e.preventDefault();
    const { searchText } = this.state;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&q=${searchText}&fields=items(id%2FvideoId%2Csnippet(description%2Cthumbnails%2Fdefault%2Ctitle))&key=AIzaSyA-peAPxzMqXOY5B9lokyP_H91og7pPZXg`)
      .then(response => response.json())
      .then(data => {
        // FILTER ONLY RESULTS, WHICH HAS ITEM.ID
        this.setState({
          searchRes: data.items.filter((i: ISearchResult) => (i.id))
        });
      });
  }

  public render() {
    const { searchText, searchRes } = this.state;

    return <React.Fragment>
      <form onSubmit={this.submiFormSearchYoutube} className={stylesHelpers.clearfix}>
        <input
          type="search"
          className={styles.inputBtn}
          value={searchText}
          onChange={e => this.setState({ searchText: e.currentTarget.value })}
          placeholder="youtube search"
          ref={r => this.searchField = r}
        />
        <button
          type="submit"
          className={`${styles.inputBtn} ${styles.btn}`}
          onClick={this.submiFormSearchYoutube}
          disabled={!searchText}
        >
          Search
        </button>
      </form>
      {searchRes && searchRes.length !== 0 &&
        <ul className={queueStyles.list}>
          {searchRes.map((item) =>
            <QueueComponent
              key={item.id.videoId}
              description={item.snippet.description}
              id={item.id.videoId}
              img={item.snippet.thumbnails.default.url}
              title={item.snippet.title}
            />
          )}
        </ul>
      }
      {searchRes && searchRes.length === 0 && <p className={queueStyles.noResults}>No results</p>}
    </React.Fragment>;
  }
}

export default YoutubeSearchComponent;

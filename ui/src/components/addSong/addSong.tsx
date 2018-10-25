import React, { Component } from 'react';
import { ReactComponent as IcoClose } from '../../assets/img/ico/ico-delete.svg';
import styles from './addSong.module.css';
import stylesHelpers from '../../assets/css/helpers.module.css'
import { any } from 'prop-types';

interface IState {
  addSongText: string;
}

interface IProps {
  toggleAddSongModal: () => void;
}

class AddSongComponent extends Component<IProps, IState> {

  addSongInput: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      addSongText: ''
    };
  }

  public componentDidMount() {
    this.addSongInput.focus();
  }

  private submiForm = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.toggleAddSongModal();
  }

  public render() {
    const { addSongText } = this.state;

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
        <h4 className={styles.h4}>Choose playlist</h4>
      </div>
    );
  }
}

export default AddSongComponent;

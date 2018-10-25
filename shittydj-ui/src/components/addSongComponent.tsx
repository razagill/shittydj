import React, { Component } from 'react';

interface IState {
  addSongText: string;
}

interface IProps {
  toggleAddSongModal: () => void;
}

export default class AddSongComponent extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      addSongText: ''
    };
  }

  submiForm = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.toggleAddSongModal();
  }

  render() {
    const { addSongText } = this.state;

    return (
      <div>
        <h4 className="clearfix">
          Add song
          <img src="assets/img/ico/ico-delete.svg" className="ico pointer float-right" onClick={this.props.toggleAddSongModal} />
        </h4>
        <form onSubmit={this.submiForm} >
          <input type="text" value={addSongText} onChange={e => this.setState({ addSongText: e.currentTarget.value })} placeholder="paste youtube/soundcloud link" />
          <button type="submit" onClick={this.submiForm}>Add song to queue</button>
        </form>

        <div className="hr" />
        <h4>Choose playlist</h4>
      </div>
    );
  }
}

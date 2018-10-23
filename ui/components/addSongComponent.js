import { Component } from 'preact';

export default class AddSongComponent extends Component {

  constructor() {
    super();
    this.state = {
      addSongText: ''
    };
  }

  submiForm = (e) => {
    e.preventDefault();
    this.props.toggleAddSongModal();
  }

  render() {
    const { addSongText } = this.state;

    return (
      <div>
        <h4 class="clearfix">
          Add song
            <img src="assets/img/ico/ico-delete.svg" class="ico pointer float-right" onClick={this.props.toggleAddSongModal} />
        </h4>
        <form onSubmit={this.submiForm} >
          <input type="text" value={addSongText} onChange={e => this.setState({ addSongText: e.currentTarget.value })} placeholder="paste youtube/soundcloud link" />
          <button type="submit" onClick={this.submiForm}>Add song to queue</button>
        </form>

        <div class="hr" />
        <h4>Choose playlist</h4>
      </div>
    );
  }
}

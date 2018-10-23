import { Component } from 'preact';

export default class DurationComponent extends Component {

  render() {
    return (
      <div>
        <div class="duration-time">3:47 / 4:20</div>
        <div class="duration" style="width: 64%;" />
      </div>
    );
  }
}

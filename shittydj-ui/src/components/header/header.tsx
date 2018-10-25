import styles from 'components/header/header.css';
import React, { Component } from 'react';
import Logo from '../../assets/img/logo-gray.png';
import { ReactComponent as IcoPlus } from '../../assets/img/ico/ico-plus.svg';

interface IProps {
  toggleAddSongModal: () => void;
}

class Header extends Component<IProps, any> {

  public render() {
    return (
      <div className={styles.header}>
        <div className="logo text-center">
          SHITTY<img src={Logo} alt="Pie of poo" /><span className="font-700">DJ</span>
        </div>
        <div className="max-width-1000 margin-0-auto">
          <h2 className="clearfix">
            Upcoming
              <IcoPlus className="ico ico-plus pointer float-right" onClick={this.props.toggleAddSongModal} />
          </h2>
        </div>
      </div>
    );
  }
}

export default Header;

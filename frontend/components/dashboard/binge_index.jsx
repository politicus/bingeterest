import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import BingeIndexItem from './binge_index_item';
import NavBarContainer from '../nav_bar/nav_bar_container';

class BingeIndex extends React.Component {
  componentDidMount() {
    this.props.fetchBinges();
  }

  render() {
    console.log(this.props.binges)
    return (
      <div>
        <NavBarContainer />
        
        <ul>
          {this.props.binges.map(binge => {
            return <BingeIndexItem binge={binge} key={binge.id} />
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(BingeIndex);
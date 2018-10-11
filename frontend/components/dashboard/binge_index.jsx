import React from 'react';
import { withRouter, Link } from 'react-router-dom';
// import BingeItemShow from '../binge/binge_item_show.jsx';

class BingeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      binges: null,
      renderBinges: null,
      hasMore: true,
      loaded: false,
    };
    const background = document.getElementsByClassName('discover-box')[0];
    this.handleBinging = this.handleBinging.bind(this);
    this.renderBinging = this.renderBinging.bind(this);
    this.renderBinges = this.renderBinges.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    const { fetchBinges } = this.props;
    fetchBinges().then((bingeData) => {
      const binges = Object.values(bingeData.binges);
      const renderBinges = binges.slice(0, 15);
      this.setState({ binges, renderBinges });
    });
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    const { binges, renderBinges, hasMore } = this.state;
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200)
      && binges.length) {
      if (hasMore) {
        this.addBinges();
      }
    }
  }

  handleBinging(e) {
    e.preventDefault();
    debugger;
  }

  addBinges() {
    const { binges, renderBinges } = this.state;
    const { length } = binges;
    const idx = renderBinges.length;
    if (renderBinges.length >= length) {
      this.setState({ hasMore: false });
    } else {
      const newBinges = binges.slice(idx, idx + 15);
      this.setState({
        renderBinges: [...renderBinges, ...newBinges],
      });
    }
  }

  renderBinging() {
    const { currentUser } = this.props;
    const boards = Object.values(currentUser.user_boards);
    const userBoards = boards.map(board => (
      <button key={board.id} type="button" onClick={this.handleBinging}>{board.name}</button>
    ));

    return (
      <div className="binging-buttons">
        <ul>{userBoards}</ul>
        <button type="button" onClick={this.handleBinging}>Binge</button>
      </div>
    );
  }

  renderBinges() {
    const { renderBinges } = this.state;

    if (renderBinges !== null) {
      return (
        renderBinges.map(binge => (
          <div key={binge.id} className="binge-show-wrapper fadeIn">

            <Link to={`/binges/${binge.id}`}>
              <li className="binge">
                <img src={binge.photoUrl} alt="" />
              </li>
            </Link>

            <a href={binge.link_url} target="_blank">
              <button type="button" className="binge-link">
                <img className="a-logo" src={window.images.arrow} alt="" />
                <h2>{binge.url}</h2>
              </button>
            </a>
          </div>
        ))
      );
    }
    return null;
  }

  render() {
    return (
      <div>

        <div className="discover">
          <div className="discover-box">
            <div className="masonry">
              {this.renderBinges()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BingeIndex);

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Modal from '../modal/modal.jsx';

class BingeShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      binge: null,
    };
    this.handleModal = this.handleModal.bind(this);
    this.renderBingeEdit = this.renderBingeEdit.bind(this);
    this.renderBingeDetails = this.renderBingeDetails.bind(this);
  }

  componentDidMount() {
    const { fetchBinge, ownProps } = this.props;
    fetchBinge(ownProps.match.params.bingeId).then((bingeData) => {
      this.setState({ binge: bingeData.binge });
    });
  }

  handleModal(action) {
    const { openModal } = this.props;
    const { binge } = this.state;
    let modal;
    if (action === 'edit') {
      modal = { type: 'editBinge', data: binge };
    }
    if (action === 'binging') {
      modal = { type: 'createBinging', data: binge };
    }
    openModal(modal);
  }

  renderBingeEdit() {
    const { currentUser, openModal } = this.props;
    const { binge } = this.state;

    // show edit button if current user is the author of the binge
    if (binge !== null) {
      if (binge.author_id === currentUser.id) {
        return (
          <button type="button" className="binge-edit" onClick={() => this.handleModal('edit')}>
            <img className="edit-icon" src={window.images.pen} alt="" />
          </button>
        );
      }
    }
    return null;
  }

  renderBingeDetails() {
    const { binge } = this.state;

    if (binge !== null) {
      return (
        <div className="binge-show-box">
          <img className="binge-photo" src={binge.photoUrl} alt="" />

          <div className="binge-details">
            <Link to={`/users/${binge.author_id}`}>
              <div className="author-details">
                <img className="binge-author-photo" src={binge.author_photo} alt="" />
                <div className="author-username">{binge.author_username}</div>
              </div>
            </Link>

            <a href={binge.link_url}>
              <button type="button" className="binge-show-link">
                <img className="a-logo" src={window.images.arrow} alt="" />
                <h2>{binge.url}</h2>
              </button>
            </a>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { openModal } = this.props;

    return (
      <div className="binge-showpage">
        <Modal />

        <div className="binge-showbox">
          <button type="button" className="binge-back" onClick={() => window.history.back()}>
            <img src={window.images.back} alt="" />
            <h3>Back</h3>
          </button>

          <div className="binge-edit-box">
            {this.renderBingeEdit()}
            <button type="button" className="save-binging" onClick={() => this.handleModal('createBinging')}>
              <img src={window.images.binge} alt="" />
              <h3>Binge</h3>
            </button>
          </div>

          {this.renderBingeDetails()}
        </div>

      </div>
    );
  }
}

export default withRouter(BingeShow);

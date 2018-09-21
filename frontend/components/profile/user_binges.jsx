import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import BingeItemShow from '../binge/binge_item_show.jsx';
import Modal from '../modal/modal.jsx';

class UserBinges extends React.Component {
  constructor(props) {
    super(props);

    this.handleModal = this.handleModal.bind(this);
    this.renderUserBinges = this.renderUserBinges.bind(this);
  }

  handleModal(type) {
    return (e) => {
      e.preventDefault();
      this.props.openModal(type);
    };
  }

  renderUserBinges() {
    const { openModal, binges } = this.props;
    if (binges.length > 0) {
      return (
        binges.reverse().map(binge => (
          <BingeItemShow
            binge={binge}
            key={binge.id}
            user={this.props.user}
            edit={() => openModal('editBinge')}
          />
        ))
      );
    }
  }

  render() {
    return (
      <div>
        <Modal />

        <div className="user-binges">
          <div className="user-binges-box">
            <ul className="binge-masonry">
              <li
                className="binge-modal-toggle"
                onClick={this.handleModal('createBinge')}
              >
                <div className="modal-box">
                  <h3>+</h3>
                </div>
                <h3 className="create-title">Create Binge</h3>
              </li>
              {this.renderUserBinges()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserBinges);

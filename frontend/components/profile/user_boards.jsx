import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserBoardItem from './user_board_item.jsx';
import Modal from '../modal/modal.jsx';

class UserBoards extends React.Component {
  constructor(props) {
    super(props);

    this.handleModal = this.handleModal.bind(this);
    this.renderBoards = this.renderBoards.bind(this);
  }

  handleModal() {
    const { openModal } = this.props;
    const modal = { type: 'createBoard' };
    openModal(modal);
  }

  renderBoards() {
    const { boards, openModal } = this.props;

    if (boards.length > 0) {
      return (
        boards.map(board => (
          <UserBoardItem
            board={board}
            key={board.id}
            openModal={openModal}
          />
        ))
      );
    }
  }

  render() {
    return (
      <div>
        <Modal />

        <div className="user-boards">
          <div
            className="modal-toggle"
            onClick={() => this.handleModal()}
          >
            <div className="modal-box">
              <h3>+</h3>
            </div>
            <h3 className="create-title">Create Board</h3>
          </div>
          {this.renderBoards()}
        </div>
      </div>
    );
  }
}

export default withRouter(UserBoards);

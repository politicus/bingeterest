import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchBoard, updateBoard, deleteBoard } from '../../actions/board_actions';
import { removeErrors } from '../../actions/error_actions';
import BoardUpdateForm from './board_update_form';

const mapStateToProps = ({ entities, session, errors }, ownProps, board) => {
  return {
    currentUser: entities.users[session.id],
    board: entities.boards[ownProps.location.pathname.split('/').pop()],
    errors: errors.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBoard: (userId) => dispatch(fetchBoard(userId)),
    updateBoard: (board) => dispatch(updateBoard(board)),
    deleteBoard: (board) => dispatch(deleteBoard(board)),
    removeErrors: () => dispatch(removeErrors())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardUpdateForm));

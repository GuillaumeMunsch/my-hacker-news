import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserScreenView from './UserScreenView';

const mapStateToProps = state => ({
  user: state.userReducer.user,
  status: state.userReducer.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchUser: userName => ({ type: 'FETCH_USER', userName }) }, dispatch);

const UserScreenContainer = connect(mapStateToProps, mapDispatchToProps)(UserScreenView);

export default UserScreenContainer;

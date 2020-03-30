import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserScreenView from './UserScreenView';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const UserScreenContainer = connect(mapStateToProps, mapDispatchToProps)(UserScreenView);

export default UserScreenContainer;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DrawerScreenView from './DrawerScreenView';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const DrawerScreenContainer = connect(mapStateToProps, mapDispatchToProps)(DrawerScreenView);

export default DrawerScreenContainer;

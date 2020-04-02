import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DrawerScreenView from './DrawerScreenView';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setListOptions: dataType => ({
        type: 'SET_LIST_OPTIONS',
        dataType,
      }),
    },
    dispatch
  );

const DrawerScreenContainer = connect(mapStateToProps, mapDispatchToProps)(DrawerScreenView);

export default DrawerScreenContainer;

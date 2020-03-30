import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ShowScreenView from './ShowScreenView';

const mapStateToProps = state => ({
  showList: state.listReducer.elemList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchShow: () => ({
        type: 'FETCH_SHOW_LIST',
        routeParams: state => ({ page: state.listReducer.page }),
      }),
    },
    dispatch
  );

const ShowScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ShowScreenView);

export default ShowScreenContainer;

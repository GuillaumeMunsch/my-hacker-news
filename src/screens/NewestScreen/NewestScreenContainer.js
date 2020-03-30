import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewestScreenView from './NewestScreenView';

const mapStateToProps = state => ({
  newestList: state.listReducer.elemList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNewest: (reset = false) => ({
        type: 'FETCH_NEWEST_LIST',
        routeParams: state => ({ page: state.listReducer.page }),
        reset,
      }),
    },
    dispatch
  );

const NewestScreenContainer = connect(mapStateToProps, mapDispatchToProps)(NewestScreenView);

export default NewestScreenContainer;

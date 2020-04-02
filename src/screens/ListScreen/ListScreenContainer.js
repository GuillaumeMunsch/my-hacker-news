import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ListScreenView from './ListScreenView';

const mapStateToProps = state => ({
  itemList: state.listReducer.itemList,
  status: state.listReducer.status,
  dataType: state.listReducer.dataType,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchList: (reset = false) => ({
        type: 'FETCH_LIST',
        reset,
      }),
    },
    dispatch
  );

const ListScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ListScreenView);

export default ListScreenContainer;

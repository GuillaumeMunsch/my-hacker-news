import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ListScreenView from './ListScreenView';

const mapStateToProps = state => ({
  itemList: state.listReducer.itemList,
  status: state.listReducer.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchList: (listType, reset = false) => ({
        type: 'FETCH_LIST',
        listType,
        reset,
      }),
    },
    dispatch
  );

const ListScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ListScreenView);

export default ListScreenContainer;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ListScreenView from './ListScreenView';

const mapStateToProps = state => ({
  elemList: state.listReducer.elemList,
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

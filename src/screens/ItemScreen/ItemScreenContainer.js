import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemScreenView from './ItemScreenView';

const mapStateToProps = state => ({
  item: state.itemReducer.item,
  status: state.itemReducer.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchItem: itemID => ({ type: 'FETCH_ITEM', itemID }) }, dispatch);

const ItemScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ItemScreenView);

export default ItemScreenContainer;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemScreenView from './ItemScreenView';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const ItemScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ItemScreenView);

export default ItemScreenContainer;

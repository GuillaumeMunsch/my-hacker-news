import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AskScreenView from './AskScreenView';

const mapStateToProps = state => ({
  askList: state.listReducer.elemList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAsk: () => ({
        type: 'FETCH_ASK_LIST',
        routeParams: state => ({ page: state.listReducer.page }),
      }),
    },
    dispatch
  );

const AskScreenContainer = connect(mapStateToProps, mapDispatchToProps)(AskScreenView);

export default AskScreenContainer;

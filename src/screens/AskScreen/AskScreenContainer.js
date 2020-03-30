import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AskScreenView from './AskScreenView';

const mapStateToProps = state => ({
  askList: state.listReducer.elemList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAsk: (reset = false) => ({
        type: 'FETCH_ASK_LIST',
        routeParams: state => ({ page: state.listReducer.page }),
        reset,
      }),
    },
    dispatch
  );

const AskScreenContainer = connect(mapStateToProps, mapDispatchToProps)(AskScreenView);

export default AskScreenContainer;

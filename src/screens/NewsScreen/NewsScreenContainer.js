import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewsScreenView from './NewsScreenView';

const mapStateToProps = state => ({
  newsList: state.listReducer.elemList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNews: (reset = false) => ({
        type: 'FETCH_NEWS_LIST',
        routeParams: state => ({ page: state.listReducer.page }),
        reset,
      }),
    },
    dispatch
  );

const NewsScreenContainer = connect(mapStateToProps, mapDispatchToProps)(NewsScreenView);

export default NewsScreenContainer;

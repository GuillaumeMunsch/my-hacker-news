import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewsScreenView from './NewsScreenView';

const mapStateToProps = state => ({
    state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchNews: () => ({
        type: 'FETCH_NEWS_LIST',
        routeParams: state => ({ page: state.newsReducer.page })
    })
}, dispatch);

const NewsScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsScreenView);

export default NewsScreenContainer;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import JobsScreenView from './JobsScreenView';

const mapStateToProps = state => ({
  jobsList: state.listReducer.elemList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchJobs: (reset = false) => ({
        type: 'FETCH_JOBS_LIST',
        routeParams: state => ({ page: state.listReducer.page }),
        reset,
      }),
    },
    dispatch
  );

const JobsScreenContainer = connect(mapStateToProps, mapDispatchToProps)(JobsScreenView);

export default JobsScreenContainer;

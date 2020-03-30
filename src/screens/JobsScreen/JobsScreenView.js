import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import PropTypes from 'prop-types';
import { MyHeader } from 'src/components';
import {
  Body,
  Button,
  Container,
  Content,
  Icon,
  List,
  ListItem,
  Right,
  Text,
  Title,
} from 'native-base';

class JobsScreenView extends React.Component {
  static propTypes = {
    jobsList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  constructor(props) {
    super(props);
    props.fetchJobs(true);
  }

  renderJobsTeaser = job => {
    return (
      <ListItem key={job.id} thumbnail>
        <Body>
          <Text>{job.title}</Text>
          <Text note numberOfLines={1}>
            {`${job.points} points by ${job.user} ${job.time_ago} | ${job.comments_count} comments`}
          </Text>
        </Body>
        <Right>
          <Button transparent>
            <Icon active name="arrow-forward" />
          </Button>
        </Right>
      </ListItem>
    );
  };

  render() {
    return (
      <Container>
        <MyHeader navigation={this.props.navigation} name={this.props.route.name} />
        <Content>
          <List>{this.props.jobsList.map(job => this.renderJobsTeaser(job))}</List>
        </Content>
      </Container>
    );
  }
}

JobsScreenView.navigationOptions = {
  header: null,
};

export default JobsScreenView;

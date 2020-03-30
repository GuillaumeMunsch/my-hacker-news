import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import PropTypes from 'prop-types';
import { MyHeader } from '../../components';
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

class NewsScreenView extends React.Component {
  static propTypes = {
    showList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  constructor(props) {
    super(props);
    props.fetchShow(true);
  }

  renderNewsTeaser = show => {
    return (
      <ListItem key={show.id} thumbnail>
        <Body>
          <Text>{show.title}</Text>
          <Text note numberOfLines={1}>
            {`${show.points} points by ${show.user} ${show.time_ago} | ${show.comments_count} comments`}
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
          <List>{this.props.showList.map(show => this.renderNewsTeaser(show))}</List>
        </Content>
      </Container>
    );
  }
}

NewsScreenView.navigationOptions = {
  header: null,
};

export default NewsScreenView;

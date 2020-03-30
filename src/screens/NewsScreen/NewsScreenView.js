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

class NewsScreenView extends React.Component {
  static propTypes = {
    newsList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  constructor(props) {
    super(props);
    props.fetchNews(true);
  }

  renderNewsTeaser = news => {
    return (
      <ListItem key={news.id} thumbnail>
        <Body>
          <Text>{news.title}</Text>
          <Text note numberOfLines={1}>
            {`${news.points} points by ${news.user} ${news.time_ago} | ${news.comments_count} comments`}
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
          <List>{this.props.newsList.map(news => this.renderNewsTeaser(news))}</List>
        </Content>
      </Container>
    );
  }
}

NewsScreenView.navigationOptions = {
  header: null,
};

export default NewsScreenView;

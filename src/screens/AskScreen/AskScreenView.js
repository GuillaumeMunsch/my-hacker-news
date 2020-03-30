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

class AskScreenView extends React.Component {
  static propTypes = {
    askList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  constructor(props) {
    super(props);
    props.fetchAsk(true);
  }

  renderAskTeaser = ask => {
    return (
      <ListItem key={ask.id} thumbnail>
        <Body>
          <Text>{ask.title}</Text>
          <Text note numberOfLines={1}>
            {`${ask.points} points by ${ask.user} ${ask.time_ago} | ${ask.comments_count} comments`}
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
          <List>{this.props.askList.map(ask => this.renderAskTeaser(ask))}</List>
        </Content>
      </Container>
    );
  }
}

AskScreenView.navigationOptions = {
  header: null,
};

export default AskScreenView;

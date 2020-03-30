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

class NewestScreenView extends React.Component {
  static propTypes = {
    newestList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  constructor(props) {
    super(props);
    props.fetchNewest(true);
  }

  renderNewestTeaser = newest => {
    return (
      <ListItem key={newest.id} thumbnail>
        <Body>
          <Text>{newest.title}</Text>
          <Text note numberOfLines={1}>
            {`${newest.points} points by ${newest.user} ${newest.time_ago} | ${newest.comments_count} comments`}
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
          <List>{this.props.newestList.map(newest => this.renderNewestTeaser(newest))}</List>
        </Content>
      </Container>
    );
  }
}

NewestScreenView.navigationOptions = {
  header: null,
};

export default NewestScreenView;

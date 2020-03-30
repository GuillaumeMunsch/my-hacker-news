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

class ListScreenView extends React.Component {
  static propTypes = {
    elemList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  constructor(props) {
    super(props);
    console.log('Props', props);
    props.fetchList(props.route.params.type, true);
  }

  renderTeaser = elem => {
    return (
      <ListItem key={elem.id} thumbnail>
        <Body>
          <Text>{elem.title}</Text>
          <Text note numberOfLines={1}>
            {`${elem.points} points by ${elem.user} ${elem.time_ago} | ${elem.comments_count} comments`}
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
          <List>{this.props.elemList.map(elem => this.renderTeaser(elem))}</List>
        </Content>
      </Container>
    );
  }
}

ListScreenView.navigationOptions = {
  header: null,
};

export default ListScreenView;

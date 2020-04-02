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
  Spinner,
  Text,
  Title,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

class ListScreenView extends React.Component {
  static propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    status: PropTypes.string.isRequired,
  };

  componentWillMount() {
    this.props.fetchList(this.props.dataType, true);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (this.props.dataType !== nextProps.dataType) nextProps.fetchList(nextProps.dataType, true);
  }

  renderTeaser = elem => {
    return (
      <ListItem onPress={() => Actions.contentItem({ itemID: elem.id })} key={elem.id} thumbnail>
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
        <MyHeader
          name={this.props.dataType.toUpperCase().charAt(0) + this.props.dataType.slice(1)}
        />
        <Content>
          {this.props.status === 'requesting' && this.props.itemList.length === 0 && (
            <Spinner color="blue" />
          )}
          {this.props.status === 'success' && (
            <List>{this.props.itemList.map(elem => this.renderTeaser(elem))}</List>
          )}
        </Content>
      </Container>
    );
  }
}

ListScreenView.navigationOptions = {
  header: null,
};

export default ListScreenView;

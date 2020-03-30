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

class ItemScreenView extends React.Component {
  static propTypes = {
    item: PropTypes.shape().isRequired,
    status: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    props.fetchItem(props.route.params.itemID);
  }

  render() {
    console.log('Props item', this.props);
    return (
      <Container>
        <MyHeader navigation={this.props.navigation} name={this.props.route.name} back />
        <Content>
          {this.props.status === 'requesting' && <Spinner color="blue" />}
          {this.props.status === 'success' && <Text>Item</Text>}
        </Content>
      </Container>
    );
  }
}

ItemScreenView.navigationOptions = {
  header: null,
};

export default ItemScreenView;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Body,
  Button,
  Container,
  Content,
  Icon,
  List,
  ListItem,
  Right,
  Header,
  Text,
  Title,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

class DrawerScreenView extends PureComponent {
  static propTypes = {
    setListOptions: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Container>
        <Header transparent />
        <List>
          <ListItem
            onPress={() => {
              this.props.navigation.closeDrawer();
              this.props.setListOptions('news');
            }}
          >
            <Text>News</Text>
          </ListItem>
          <ListItem
            onPress={() => {
              this.props.navigation.closeDrawer();
              this.props.setListOptions('newest');
            }}
          >
            <Text>Newest</Text>
          </ListItem>
          <ListItem
            onPress={() => {
              this.props.navigation.closeDrawer();
              this.props.setListOptions('ask');
            }}
          >
            <Text>Ask</Text>
          </ListItem>
          <ListItem
            onPress={() => {
              this.props.navigation.closeDrawer();
              this.props.setListOptions('jobs');
            }}
          >
            <Text>Jobs</Text>
          </ListItem>
          <ListItem
            onPress={() => {
              this.props.navigation.closeDrawer();
              this.props.setListOptions('show');
            }}
          >
            <Text>Show</Text>
          </ListItem>
        </List>
      </Container>
    );
  }
}

export default DrawerScreenView;

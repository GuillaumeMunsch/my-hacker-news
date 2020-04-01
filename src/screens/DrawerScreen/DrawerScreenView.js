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
  static propTypes = {};

  render() {
    return (
      <Container>
        <Header transparent />
        <List>
          <ListItem
            onPress={() => {
              this.props.navigation.closeDrawer();
              Actions.news({ refresh: true });
            }}
          >
            <Text>News</Text>
          </ListItem>
          <ListItem
            onPress={() => {
              this.props.navigation.closeDrawer();
              Actions.newest({ refresh: true });
            }}
          >
            <Text>Newest</Text>
          </ListItem>
          <ListItem
            onPress={() => {
              this.props.navigation.closeDrawer();
              Actions.ask({ refresh: true });
            }}
          >
            <Text>Ask</Text>
          </ListItem>
          <ListItem
            onPress={() => {
              this.props.navigation.closeDrawer();
              Actions.jobs({ refresh: true });
            }}
          >
            <Text>Jobs</Text>
          </ListItem>
          <ListItem
            onPress={() => {
              this.props.navigation.closeDrawer();
              Actions.show({ refresh: true });
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

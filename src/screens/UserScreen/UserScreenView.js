import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Linking, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';
import { MyHeader } from 'src/components';
import {
  Badge,
  Body,
  Button,
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  Card,
  CardItem,
  Text,
  Title,
  View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

class UserScreenView extends React.Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    status: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    fetchUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchUser(this.props.userName);
  }

  render() {
    const { user } = this.props;
    return (
      <Container>
        <MyHeader name="User" back />
        <Content padder>
          {this.props.status === 'requesting' && <Spinner color="blue" />}
          {this.props.status === 'success' && (
            <>
              <Card>
                <CardItem button header bordered>
                  <Text>{user.id}</Text>
                </CardItem>
                {user.about && (
                  <CardItem>
                    <Body>
                      <HTML html={user.about} imagesMaxWidth={Dimensions.get('window').width} />
                    </Body>
                  </CardItem>
                )}
                <CardItem bordered>
                  <Body>
                    <Text>Karma</Text>
                  </Body>
                  <Right>
                    <Badge primary>
                      <Text>{user.karma}</Text>
                    </Badge>
                  </Right>
                </CardItem>
                <CardItem bordered>
                  <Icon active type="MaterialIcons" name="access-time" />
                  <Text>{`created ${user.created}`}</Text>
                </CardItem>
              </Card>
            </>
          )}
        </Content>
      </Container>
    );
  }
}

export default UserScreenView;

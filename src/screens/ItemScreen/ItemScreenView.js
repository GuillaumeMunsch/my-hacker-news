import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Linking } from 'react-native';
import HTML from 'react-native-render-html';
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
  Card,
  CardItem,
  Text,
  Title,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

class ItemScreenView extends React.Component {
  static propTypes = {
    item: PropTypes.shape().isRequired,
    status: PropTypes.string.isRequired,
    itemID: PropTypes.number.isRequired,
  };

  componentWillMount() {
    this.props.fetchItem(this.props.itemID);
  }

  render() {
    const { item } = this.props;
    console.log('Props item', this.props);
    return (
      <Container>
        <MyHeader name="Item" back />
        <Content padder>
          {this.props.status === 'requesting' && <Spinner color="blue" />}
          {this.props.status === 'success' && (
            <Card>
              <CardItem
                button
                onPress={() => {
                  if (!item.url?.startsWith('item')) Linking.openURL(item.url);
                }}
                header
                bordered
              >
                <Text>{item.title}</Text>
              </CardItem>
              {item.content.length > 0 && (
                <CardItem>
                  <Body>
                    <HTML html={item.content} imagesMaxWidth={Dimensions.get('window').width} />
                  </Body>
                </CardItem>
              )}
              <CardItem
                bordered
                footer
                button
                onPress={() => Actions.contentItem({ user: item.user })}
              >
                <Text>{`${item.points} points by ${item.user} ${item.time_ago} | ${item.comments_count} comments`}</Text>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}

export default ItemScreenView;

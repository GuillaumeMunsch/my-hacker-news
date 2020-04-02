import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Linking, StyleSheet } from 'react-native';
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
  View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';

class ItemScreenView extends React.Component {
  static propTypes = {
    item: PropTypes.shape().isRequired,
    status: PropTypes.string.isRequired,
    itemID: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.gapWidth = 8;
  }

  componentWillMount() {
    this.props.fetchItem(this.props.itemID);
  }

  getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  renderComment = (comment, level = 0) => {
    return (
      <View style={{ flexDirection: 'row' }} key={comment.id}>
        {level > 0 && (
          <View
            style={{
              width: this.gapWidth,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 2 }} />
            <View style={{ flex: 1, backgroundColor: 'grey', width: 2 }} />
            <View style={{ flex: 5 }} />
          </View>
        )}
        <View>
          <View>
            <Text>{`${comment.user} ${comment.time_ago}`}</Text>
          </View>
          <HTMLView value={comment.content} />

          {/* <HTML
            containerStyle={{
              padding: 8,
              width: Dimensions.get('window').width - 16 - level * this.gapWidth,
            }}
            html={comment.content}
          /> */}
          {/* <View
            style={{
              width: Dimensions.get('window').width - 16 - level * this.gapWidth - 32,
              backgroundColor: 'grey',
              height: StyleSheet.hairlineWidth,
            }}
          /> */}
          <List>{comment.comments.map(c => this.renderComment(c, level + 1))}</List>
        </View>
      </View>
    );
  };

  render() {
    const { item } = this.props;
    console.log('Props item', this.props);
    return (
      <Container>
        <MyHeader name="Item" back />
        <Content padder>
          {this.props.status === 'requesting' && <Spinner color="blue" />}
          {this.props.status === 'success' && (
            <>
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
                      <HTMLView value={item.content} />
                      {/* <HTML html={item.content} imagesMaxWidth={Dimensions.get('window').width} /> */}
                    </Body>
                  </CardItem>
                )}
                <CardItem
                  bordered
                  footer
                  button
                  onPress={() => Actions.contentItem({ user: item.user })}
                >
                  <Text
                    style={{ color: 'black' }}
                  >{`${item.points} points by ${item.user} ${item.time_ago} | ${item.comments_count} comments`}</Text>
                </CardItem>
                <CardItem>
                  <List>{item.comments.map(comment => this.renderComment(comment))}</List>
                </CardItem>
              </Card>
            </>
          )}
        </Content>
      </Container>
    );
  }
}

export default ItemScreenView;

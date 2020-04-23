import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html';
import { MyHeader } from 'src/components';
import {
  Body,
  Button,
  Container,
  Content,
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

class ItemScreenView extends React.Component {
  static propTypes = {
    item: PropTypes.shape().isRequired,
    status: PropTypes.string.isRequired,
    itemID: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.gapWidth = 8;
    this.commentsReduce = (acc, curr) => {
      return [
        ...acc,
        ...[
          curr,
          ...(curr.comments
            ? curr.comments
                .map(c => ({ ...c, level: curr.level ? curr.level + 1 : 1 }))
                .reduce(this.commentsReduce, [])
            : []),
        ],
      ];
    };
  }

  componentWillMount() {
    this.props.fetchItem(this.props.itemID);
  }

  renderComment = (comment, level = 0) => {
    return (
      <View style={{ marginVertical: 4 }} key={comment.id}>
        <TouchableOpacity onPress={() => Actions.user({ userName: comment.user })}>
          <Text>
            <Text style={{ textDecorationLine: 'underline' }}>{comment.user}</Text>
            {` ${comment.time_ago}`}
          </Text>
        </TouchableOpacity>
        <View>
          <View
            style={{
              marginRight: 4,
              marginLeft: 4 + 10 * comment.level,
              borderLeftColor: '#999999',
              borderLeftWidth: 1,
              paddingLeft: 4,
            }}
          >
            <HTML html={comment.content} imagesMaxWidth={Dimensions.get('window').width} />
          </View>
          <View
            style={{
              flex: 1,
              height: 1,
              flexDirection: 'row',
              marginVertical: 4,
            }}
          >
            <View style={{ height: 1, flex: 1 }} />
            <View style={{ backgroundColor: '#B5B5B5', height: 1, flex: 1 }} />
            <View style={{ height: 1, flex: 1 }} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { item } = this.props;
    const comments = item.comments?.reduce(this.commentsReduce, []);
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
                      <HTML html={item.content} imagesMaxWidth={Dimensions.get('window').width} />
                    </Body>
                  </CardItem>
                )}
                <CardItem
                  bordered
                  footer
                  button
                  onPress={() => Actions.user({ userName: item.user })}
                >
                  <Text style={{ color: 'black' }}>
                    {`${item.points} points by `}
                    <Text style={{ textDecorationLine: 'underline' }}>{item.user}</Text>
                    {`${item.time_ago} | ${item.comments_count} comments`}
                  </Text>
                </CardItem>
                <CardItem>
                  <List>{comments.map(comment => this.renderComment(comment))}</List>
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

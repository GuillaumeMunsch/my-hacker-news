import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Body, Button, Icon, Left, Header, Right, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';

class MyHeader extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Header>
        <Left>
          {this.props.back ? (
            <Button onPress={Actions.pop} transparent>
              <Icon name="ios-arrow-back" type="Ionicons" style={{ color: '#333333' }} />
            </Button>
          ) : (
            <Button onPress={Actions.drawerOpen} transparent>
              <Icon name="menu" type="Entypo" style={{ color: '#333333' }} />
            </Button>
          )}
        </Left>
        <Body>
          <Title>{this.props.name}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

export default MyHeader;

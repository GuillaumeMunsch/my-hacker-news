import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Body, Button, Icon, Left, Header, Right, Title } from 'native-base';

class MyHeader extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      openDrawer: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <Header>
        <Left>
          {this.props.back ? (
            <Button onPress={this.props.navigation.goBack} transparent>
              <Icon name="ios-arrow-back" type="Ionicons" style={{ color: '#333333' }} />
            </Button>
          ) : (
            <Button onPress={this.props.navigation.openDrawer} transparent>
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

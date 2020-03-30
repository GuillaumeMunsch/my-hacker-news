import React from 'react';
import { Platform } from 'react-native';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NewsScreen, NewestScreen, AskScreen, ShowScreen, JobsScreen } from '../screens';

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Ask">
        <Drawer.Screen name="News" component={NewsScreen} />
        <Drawer.Screen name="Newest" component={NewestScreen} />
        <Drawer.Screen name="Ask" component={AskScreen} />
        <Drawer.Screen name="Show" component={ShowScreen} />
        <Drawer.Screen name="Jobs" component={JobsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

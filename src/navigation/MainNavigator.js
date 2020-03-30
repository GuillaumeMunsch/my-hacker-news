import React from 'react';
import { Platform } from 'react-native';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  ListScreen,
  NewsScreen,
  NewestScreen,
  AskScreen,
  ShowScreen,
  JobsScreen,
} from '../screens';

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
      <Drawer.Navigator>
        <Drawer.Screen name="List" component={ListScreen} initialParams={{ type: 'news' }} />
        {/* <Drawer.Screen name="News" component={NewsScreen} initialParams={{ type: 'news' }} />
        <Drawer.Screen name="Newest" component={NewestScreen} initialParams={{ type: 'newest' }} />
        <Drawer.Screen name="Ask" component={AskScreen} initialParams={{ type: 'ask' }} />
        <Drawer.Screen name="Show" component={ShowScreen} initialParams={{ type: 'show' }} />
        <Drawer.Screen name="Jobs" component={JobsScreen} initialParams={{ type: 'jobs' }} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

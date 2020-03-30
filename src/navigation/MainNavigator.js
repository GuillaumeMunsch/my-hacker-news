import React from 'react';
import { Platform } from 'react-native';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ListScreen, ItemScreen, UserScreen } from '../screens';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="News" component={ListScreen} initialParams={{ type: 'news' }} />
        <Drawer.Screen name="Newest" component={ListScreen} initialParams={{ type: 'newest' }} />
        <Drawer.Screen name="Ask" component={ListScreen} initialParams={{ type: 'ask' }} />
        <Drawer.Screen name="Jobs" component={ListScreen} initialParams={{ type: 'jobs' }} />
        <Drawer.Screen name="Show" component={ListScreen} initialParams={{ type: 'show' }} />
        <Drawer.Screen name="Item" component={ItemScreen} />
        <Drawer.Screen name="User" component={UserScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

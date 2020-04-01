import React from 'react';
import { Platform } from 'react-native';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ListScreen, ItemScreen, UserScreen } from '../screens';

const Stack = createStackNavigator();

const Type = type => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name={type.toUpperCase().charAt(0) + type.slice(1)}
      component={ListScreen}
      initialParams={{ type }}
    />
    <Stack.Screen name="Item" component={ItemScreen} />
    <Stack.Screen name="User" component={UserScreen} />
  </Stack.Navigator>
);

const News = () => Type('news');
const Newest = () => Type('newest');
const Ask = () => Type('ask');
const Jobs = () => Type('jobs');
const Show = () => Type('show');

const Drawer = createDrawerNavigator();

// console.log('TYOE', Type('news'));
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="News" component={News} />
        <Drawer.Screen name="Newest" component={Newest} />
        <Drawer.Screen name="Ask" component={Ask} />
        <Drawer.Screen name="Jobs" component={Jobs} />
        <Drawer.Screen name="Show" component={Show} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

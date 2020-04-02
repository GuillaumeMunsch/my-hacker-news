import React from 'react';
import { Platform } from 'react-native';
import { View, Text } from 'react-native';
import { Drawer, Router, Stack, Scene } from 'react-native-router-flux';
import { ListScreen, DrawerScreen, ItemScreen, UserScreen } from '../screens';

const MainNavigator = () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Drawer hideNavBar contentComponent={DrawerScreen} hideNavBar>
        <Stack key="mainStack" hideNavBar>
          <Scene hideNavBar key="list" component={ListScreen} title="List" />
          <Scene hideNavBar key="contentItem" component={ItemScreen} title="Item" />
          <Scene hideNavBar key="user" component={UserScreen} title="User" />
        </Stack>
      </Drawer>
    </Stack>
  </Router>
);

export default MainNavigator;

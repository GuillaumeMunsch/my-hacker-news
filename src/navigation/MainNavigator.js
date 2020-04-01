import React from 'react';
import { Platform } from 'react-native';
import { View, Text } from 'react-native';
import { Drawer, Router, Stack, Scene } from 'react-native-router-flux';
import { DrawerScreen, ListScreen, ItemScreen, UserScreen } from '../screens';

const News = () => <ListScreen dataType="news" />;
const Newest = () => <ListScreen dataType="newest" />;
const Ask = () => <ListScreen dataType="ask" />;
const Jobs = () => <ListScreen dataType="jobs" />;
const Show = () => <ListScreen dataType="show" />;

const MainNavigator = () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Drawer hideNavBar contentComponent={DrawerScreen} hideNavBar>
        <Scene hideNavBar key="news" component={News} title="News" />
        <Scene hideNavBar key="newest" component={Newest} title="Newest" />
        <Scene hideNavBar key="ask" component={Ask} title="Ask" />
        <Scene hideNavBar key="jobs" component={Jobs} title="Jobs" />
        <Scene hideNavBar key="show" component={Show} title="Show" />
        <Scene hideNavBar key="item" component={ItemScreen} title="Post" />
        <Scene hideNavBar key="user" component={UserScreen} title="User" />
      </Drawer>
    </Stack>
  </Router>
);

export default MainNavigator;

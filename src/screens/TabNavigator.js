import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Iconic from 'react-native-vector-icons/MaterialIcons';

const BottomTabs = createBottomTabNavigator();

import Chat from './Chat';
import Setting from './Setting';

const TabNavigator = () => {
  return(
    <BottomTabs.Navigator
      tabBarOptions={{
        activeTintColor: '#1e90ff',
        inactiveTintColor: 'gray',
      }}
    >
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Iconic name="chat-bubble-outline" color={color} size={size} color="grey"/>
          ),
        }}
        name="Chat"
        component={Chat}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Iconic name="settings" color={color} size={size} color="grey"/>
          ),
        }}
        name="Setting"
        component={Setting}
      />
    </BottomTabs.Navigator>
  )
}

export default TabNavigator
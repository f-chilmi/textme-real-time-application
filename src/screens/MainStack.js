import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Chat from './Chat';
import ChatRoom from './ChatRoom';
import ContactInfo from './ContactInfo';

const MainStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        options={{headerShown: false}}
        name="Chat"
        component={Chat}
      />
      <Stack.Screen 
        options={{headerShown: false}}
        name="ChatRoom"
        component={ChatRoom}
      />
      <Stack.Screen 
        options={{headerShown: false}}
        name="ContactInfo"
        component={ContactInfo}
      />
    </Stack.Navigator>
  )
}

export default MainStack
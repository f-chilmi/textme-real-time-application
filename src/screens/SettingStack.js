import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Setting from './Setting';
import ProfileUser from './ProfileUser';

const SettingStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Setting"
        component={Setting}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ProfileUser"
        component={ProfileUser}
      />
    </Stack.Navigator>
  )
}

export default SettingStack
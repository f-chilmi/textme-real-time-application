import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Setting from './Setting';

const SettingStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Setting"
        component={Setting}
      />
      
    </Stack.Navigator>
  )
}

export default SettingStack
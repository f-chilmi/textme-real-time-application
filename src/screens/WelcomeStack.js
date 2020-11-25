import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Register from './Register';
import Verification from './Verification';

const WelcomeStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        options={{headerShown: false}}
        name="Register"
        component={Register}
      />
      <Stack.Screen 
        options={{headerShown: false}}
        name="Verification"
        component={Verification}
      />
    </Stack.Navigator>
  )
}

export default WelcomeStack